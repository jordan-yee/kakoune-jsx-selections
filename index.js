#!/usr/bin/env node

// Acorn Core
import { Parser } from "acorn";
import jsx from "acorn-jsx";

// Acorn Walk
import { findNodeAround, findNodeAfter, base } from "acorn-walk";
import { extend } from "acorn-jsx-walk";

// File System
import fs from "fs";

// Argument Handling
import yargs from "yargs";

// -----------------------------------------------------------------------------
// Data

// This is needed up front in order to validate arguments to the program before
// wasting time parsing things.
// An object is used instead of an Array so that we can assign the appropriate
// functions to each valid argument later on, without having to keep a duplicate
// list of strings in sync.
const validTargets = {
  currentJsxElement: "currentJsxElement",
  nextJsxElement: "nextJsxElement",
  currentFunction: "currentFunction",
  nextFunction: "nextFunction",
};

// -----------------------------------------------------------------------------
// Parse Program Args

// Get added args
const parsedArgs = yargs(process.argv.slice(2)).argv;
console.error("parsedArgs", parsedArgs);

// ARG 1:
// Kakoune val: kak_cursor_byte_offset
const targetOffset = parsedArgs.targetOffset;

// ARG 2:
// Kakoune val: kak_buffile
const filePath = parsedArgs.filePath;

// ARG 3:
// Target the specified node if valid, else use a default target.
const targetNodeArg = parsedArgs.targetNode;
const targetNode = validTargets.hasOwnProperty(targetNodeArg)
  ? targetNodeArg
  : validTargets.currentJsxElement;

// -----------------------------------------------------------------------------
// Read File

let fileContents;
try {
  fileContents = fs.readFileSync(filePath, "utf8");
} catch (err) {
  console.error(err);
}

// -----------------------------------------------------------------------------
// Parse File Into AST

// Extend Parser
const jsxParser = Parser.extend(jsx());
const parsedFile = jsxParser.parse(fileContents, {
  ecmaVersion: "latest",
  sourceType: "module",
  locations: true,
  ranges: true,
});

// -----------------------------------------------------------------------------
// Walk Parsed AST

// Extend Base Walker
extend(base);

/**
 * Find a JSX node at the given offset in the parsed file.
 *
 * @param {string} nodeType - the specific type of node to find
 */
function findNodeAtOffset(nodeType) {
  const node = findNodeAround(parsedFile, targetOffset, nodeType);
  return node;
}

/**
 * Find a JSX node after the node at the given offset in the parsed file.
 *
 * @param {string} nodeType - the specific type of node to find
 */
function findNodeAfterOffset(nodeType) {
  const node = findNodeAfter(parsedFile, targetOffset, nodeType);
  return node;
}

// -----------------------------------------------------------------------------
// Program Output

const targetQueries = {
  [validTargets.currentJsxElement]: () => findNodeAtOffset("JSXElement"),
  [validTargets.nextJsxElement]: () => findNodeAfterOffset("JSXElement"),
  [validTargets.currentFunction]: () => findNodeAtOffset("Function"),
  [validTargets.nextFunction]: () => findNodeAfterOffset("Function"),
};

/**
 * Build a string representing the Kakoune command for selecting the given node.
 *
 * @param {object} foundNode An object implementing the Found interface from the
 * acorn-walk library. The `foundNode.node` property provides data on the found
 * node.
 * @returns {string} The Kakoune command to select the given node.
 */
function getKakSelectionCommand(foundNode) {
  const anchorLine = foundNode.node.loc.start.line;
  const anchorColumn = foundNode.node.loc.start.column + 1;

  const cursorLine = foundNode.node.loc.end.line;
  const cursorColumn = foundNode.node.loc.end.column;

  return `select ${anchorLine}.${anchorColumn},${cursorLine}.${cursorColumn}`;
}

const foundNode = targetQueries[targetNode]();

if (foundNode) {
  console.log(getKakSelectionCommand(foundNode));
} else {
  console.error("JSX Node not found at target position.");
}

#!/usr/bin/env node

import { extend } from "acorn-jsx-walk";
import { findNodeAround, findNodeAfter, base } from "acorn-walk";
import jsx from "acorn-jsx";

import fs from "fs";
import { Parser } from "acorn";

// -----------------------------------------------------------------------------
// Parse Program Args

const args = process.argv.slice(2);

// Kakoune val: kak_cursor_byte_offset
const targetOffset = parseInt(args[0]);
// Kakoune val: kak_buffile
const filePath = args[1];

// By default target the current node
// If specified target the subsequent node
const targetNode = args[2] === "after" ? args[2] : "current";

// -----------------------------------------------------------------------------
// Apply JSX Acorn Extensions

// Extend Parser
const jsxParser = Parser.extend(jsx());
// Extend Walker Base
extend(base);

// -----------------------------------------------------------------------------
// Parse File Into AST

let fileContents;
try {
  fileContents = fs.readFileSync(filePath, "utf8");
} catch (err) {
  console.error(err);
}

const parsedFile = jsxParser.parse(fileContents, {
  ecmaVersion: "latest",
  sourceType: "module",
  locations: true,
  ranges: true,
});

// -----------------------------------------------------------------------------
// Walk Parsed AST

/**
 * Find the JSX Node at a offset in the parsed file.
 */
function getJsxNodeAtOffset() {
  const node = findNodeAround(parsedFile, targetOffset, "JSXElement");
  return node;
}

/**
 * Find a JSX node after the node at the given offset in the parsed file.
 */
function getJsxNodeAfterOffset() {
  const node = findNodeAfter(parsedFile, targetOffset, "JSXElement");
  return node;
}

// -----------------------------------------------------------------------------
// Program Output

/**
 * Build a string representing the Kakoune command for selecting the given node.
 *
 * @param {object} An object implementing the Found interface from the
 * acorn-walk library. The `foundNode.node` property provides data on the found
 * node.
 * @returns {string} The Kakound command to select the given node.
 */
function getKakSelectionCommand(foundNode) {
  const anchorLine = foundNode.node.loc.start.line;
  const anchorColumn = foundNode.node.loc.start.column + 1;

  const cursorLine = foundNode.node.loc.end.line;
  const cursorColumn = foundNode.node.loc.end.column;

  return `select ${anchorLine}.${anchorColumn},${cursorLine}.${cursorColumn}`;
}

const foundNode =
  targetNode === "current" ? getJsxNodeAtOffset() : getJsxNodeAfterOffset();

if (foundNode) {
  console.log(getKakSelectionCommand(foundNode));
} else {
  console.error("JSX Node not found at target position.");
}

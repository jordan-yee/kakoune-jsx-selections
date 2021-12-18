# Kakoune JSX Selections
A Kakoune plugin providing custom selections for JSX code.

> NOTE: Currently, this plugin should be considered alpha and is subject to breaking changes.

## Background
When using Kakoune to work on a ReactJS-based project, I've found manipulating the React elements / DOM tags embedded in JSX files to be one of the biggest pain-points.
This plugin initially aimed to improve that experience specifically, but because it is based on a proper AST parser it made sense to support other syntactic objects as well.

## Scope
This plugin is focused solely on providing useful selections for JavaScript/JSX code (and should work for TypeScript as well).
Because Kakoune uses the subject-verb model, the provided selections can naturally be followed up with any desired actions.

Including only selections also makes the plugin quite safe and robust.
If a selection fails or is incorrect due to a bug, no code was changed, and the user can manually correct the selection and continue working without disruption.

## Dependencies
This plugin requires the following applications to be installed on your system.
- node
- npm

## Installing & Configuring

### Using plug.kak
1. Add this to your kakrc:
```
plug 'jordan-yee/kakoune-jsx-selections' do %{
    npm install
    npm link
} config %{
    declare-user-mode jsx-selections
    map global jsx-selections c ': jsx-select-current-element<ret>' -docstring 'select the element at the cursor'
    map global jsx-selections n ': jsx-select-next-element<ret>' -docstring 'select next element after the cursor'
    map global jsx-selections f ': jsx-select-current-function<ret>' -docstring 'select the function at the cursor'
    map global jsx-selections j ': jsx-select-next-function<ret>' -docstring 'select next function after the cursor'

    map global user x ': enter-user-mode jsx-selections<ret>' -docstring 'jsx-selections mode'
    map global user X ': enter-user-mode -lock jsx-selections<ret>' -docstring 'jsx-selections mode'
}
```

2. Restart Kakoune then run the install command:
```
:plug-install
```

## Uninstalling
The included NodeJS program is installed using `npm link`, which creates a global symbolic link, which enables the command to be run from anywhere.

To uninstall this, run `npm rm --global kakoune-jsx-selections`.

## Commands
Here is a reference of the provided commands:

| Command                     | Description                           |
| --------------------------- | ------------------------------------- |
| jsx-select-current-element  | select the element at the cursor      |
| jsx-select-next-element     | select next element after the cursor  |
| jsx-select-current-function | select the function at the cursor     |
| jsx-select-next-function    | select next function after the cursor |

## Developer Notes
This plugin is based on the Acorn JavaScript parser, which is used to parse a JavaScript or JSX file into an AST that in turn can be used to reliably find the structures we want to select.

### TODOs
Here is a brain dump of updates I have in mind.

Features:
- [ ] select-previous-* commands
- [ ] select-parent-element
- [ ] select-first-child-element
- [ ] select-*-expression commands
- [ ] auto-generate selection commands from all AST node types

Design Improvements:
- [ ] provide command that automatically applies suggested mappings
- [ ] improve ergonomics of suggested mappings

Technical Improvements:
- [ ] wrap all provided commands in a module
- [ ] only define commands for JavaScript filetype
- [ ] investigate trade-offs between `npm link` vs published npm package strategies
- [ ] review plugin standards and update or refactor as needed
- [ ] implement versioning w/ changelog

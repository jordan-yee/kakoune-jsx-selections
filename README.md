# Kakoune JSX Selections
A Kakoune plugin providing custom selections for JSX code.

> NOTE: Currently, this plugin should be considered proof-of-concept.

## Background
When using Kakoune to work on a ReactJS-based project, I've found manipulating the React elements / DOM tags embedded in JSX files to be one of the biggest pain-points. This plugin aims to improve that experience.

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
    map global jsx-selections n ': jsx-select-next-element<ret>' -docstring 'select the element at the cursor'

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

## Provided Commands
Here is a reference of the provided commands:

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| jsx-select-current-element | select the element at the cursor     |
| jsx-select-next-element    | select next element after the cursor |

## Developer Notes
This plugin is based on the Acorn JavaScript parser, which is used to parse a JavaScript or JSX file into an AST that in turn can be used to reliably find the structures we want to select.

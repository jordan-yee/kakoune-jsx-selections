# Kakoune JSX Selections
A Kakoune plugin providing custom selections for JSX code.

> NOTE: Currently, this plugin should be considered proof-of-concept.

## Background
When using Kakoune to work on a ReactJS-based project, I've found manipulating the React elements / DOM tags embedded in JSX files to be one of the biggest pain-points. This plugin aims to improve that experience.

## Dependencies
- NodeJS
- npm

## Installing & Configuring

### Using plug.kak
1. Add this to your kakrc:
```
plug 'jordan-yee/kakoune-jsx-selections' %{
    map global user n ': jsx-next-tag<ret>' -docstring 'select next JSX tag'
}
```

2. Restart Kakoune then run the install command:
```
:plug-install
```

## Provided Commands
Here is a reference of the provided commands:

| Command | Description |
| ------- | ----------- |

## Developer Notes
This plugin is based on the Acorn JavaScript parser, which is used to parse a JavaScript or JSX file into an AST that in turn can be used to reliably find the structures we want to select.

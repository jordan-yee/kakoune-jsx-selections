# This plugin provides custom selections for JSX code.

# NOTE: This command is using the kakoune-jsx-selections command, which is a custom NodeJS
# program.
define-command jsx-select-current-tag \
-docstring 'select the tag at the cursor' \
%{
    evaluate-commands %sh{
        kakoune-jsx-selections $kak_cursor_byte_offset $kak_buffile
    }
}

# NOTE: This command is using the kakoune-jsx-selections command, which is a custom NodeJS
# program.
define-command jsx-select-next-tag \
-docstring 'select next tag after the cursor' \
%{
    evaluate-commands %sh{
        kakoune-jsx-selections $kak_cursor_byte_offset $kak_buffile after
    }
}

# ------------------------------------------------------------------------------
# javascript User Mode

declare-user-mode jsx-selections
map global jsx-selections c ': jsx-select-current-tag<ret>' -docstring 'select the tag at the cursor'
map global jsx-selections n ': jsx-select-next-tag<ret>' -docstring 'select the tag at the cursor'

map global user x ': enter-user-mode jsx-selections<ret>' -docstring 'jsx-selections mode'
map global user X ': enter-user-mode -lock jsx-selections<ret>' -docstring 'jsx-selections mode'

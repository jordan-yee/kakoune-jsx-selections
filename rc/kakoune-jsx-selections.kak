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

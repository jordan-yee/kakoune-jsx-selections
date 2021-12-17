# This plugin provides custom selections for JSX code.

define-command jsx-select-current-element \
-docstring 'select the element at the cursor' \
%{
    evaluate-commands %sh{
        kakoune-jsx-selections $kak_cursor_byte_offset $kak_buffile currentJsxElement
    }
}

define-command jsx-select-next-element \
-docstring 'select next element after the cursor' \
%{
    evaluate-commands %sh{
        kakoune-jsx-selections $kak_cursor_byte_offset $kak_buffile nextJsxElement
    }
}

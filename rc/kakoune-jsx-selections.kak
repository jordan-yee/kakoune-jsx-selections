# This plugin provides custom selections for JSX code.

define-command -hidden -params 1 jsx-select-node \
-docstring 'jsx-select-node <targetNode>: executes a select command for the specified <targetNode>' \
%{
    evaluate-commands %sh{
        kakoune-jsx-selections \
            --targetOffset $kak_cursor_byte_offset \
            --filePath $kak_buffile \
            --targetNode $1
    }
}

define-command jsx-select-current-element \
-docstring 'select the element at the cursor' \
%{
    jsx-select-node 'currentJsxElement'
}

define-command jsx-select-next-element \
-docstring 'select next element after the cursor' \
%{
    jsx-select-node 'nextJsxElement'
}

define-command jsx-select-current-function \
-docstring 'select the function at the cursor' \
%{
    jsx-select-node 'currentFunction'
}

define-command jsx-select-next-function \
-docstring 'select next function after the cursor' \
%{
    jsx-select-node 'nextFunction'
}

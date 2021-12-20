import React, { useState } from 'react'

import "./CodeEditor.css"

var isHidden = false;

function CodeEditor({ placeHolder, onChange, onKeyDown }) {

    const [hidden, setHidden] = useState(isHidden);

    return (
        <>
            <button onClick={() => setHidden(!hidden)}>Edit Code</button>
            <textarea
                className="nodrag codeEditor"
                placeholder={placeHolder}
                onChange={onChange}
                style={{ display: hidden ? 'block' : 'none' }}
            ></textarea>
        </>
    );
};

export default CodeEditor
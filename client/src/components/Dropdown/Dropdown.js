import React, { useState } from "react"

const hidden = false;

function Dropdown({title, list, elements, setElements}) {

    const [isHidden, setIsHidden] = useState(hidden);

    const onDragStart = (event, nodeType, nodeData) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow/data', JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <button onClick={() => setIsHidden(!isHidden)}>
                {title}
            </button>
            {isHidden && <div style={{ backgroundColor: "white" }}>
                <ul style={{listStyle: "none", margin: "0", padding: "0"}}>
                    {list.map((item, index) => {
                        return (
                            <li key={index} style={{padding: "8px 12px"}} onDragStart={(event) => onDragStart(event, item.type, item.data)} draggable>
                                {item.title}
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </>
    )
}

export default Dropdown
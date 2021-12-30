import React, { useState } from "react"

const hidden = false;

function Dropdown({title, list, elements, setElements}) {

    const [isHidden, setIsHidden] = useState(hidden);

    return (
        <>
            <button onClick={() => setIsHidden(!isHidden)}>
                {title}
            </button>
            {isHidden && <div style={{ backgroundColor: "white" }}>
                <ul style={{listStyle: "none", margin: "0", padding: "0"}}>
                    {list.map((item, index) => {
                        return (
                            <li key={index} style={{padding: "8px 12px"}} onClick={() => item.onClick(elements, setElements)}>
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
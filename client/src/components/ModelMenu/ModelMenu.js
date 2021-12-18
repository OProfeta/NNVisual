import React, { Component } from 'react'
import { ModelMenuItems } from "./ModelMenuItems"
import './ModelMenu.css'

function ModelMenu({elements, setElements}) {
    return(
        <nav className="NavbarModelMenuItems">
            <h1>
                Modeling Tool
            </h1>
            <ul>
                {ModelMenuItems.map((item, index) => {
                    return (
                        <li key={index} style={{ display: "inline" }}>
                            <button className={item.cName} onClick={() => item.onClick(elements, setElements)}>
                                {item.title}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default ModelMenu
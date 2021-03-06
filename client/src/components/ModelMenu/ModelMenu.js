import React, { Component } from 'react'
import { ModelMenuItems } from "./ModelMenuItems"
import './ModelMenu.css'
import Dropdown from './../Dropdown/Dropdown'

function ModelMenu({elements, setElements}) {
    return(
        <nav className="NavbarModelMenuItems">
            <h1>
                Modeling Tool
            </h1>
            <ul style={{ display: "flex" }}>
                {ModelMenuItems.map((item, index) => {
                    return (
                        <li key={index} style={{ position: "relative", display: "inline-block" }}>
                            <Dropdown
                                title={item.title}
                                list={item.list}
                                elements={elements}
                                setElements={setElements}
                            />
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default ModelMenu
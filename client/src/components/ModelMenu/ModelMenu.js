import React, { Component } from 'react'
import { ModelMenuItems } from "./ModelMenuItems"
import './ModelMenu.css'

class ModelMenu extends Component {
    render() {
        return(
            <nav className="NavbarModelMenuItems">
                <h1>
                    Modeling Tool
                </h1>
                <ul>
                    {ModelMenuItems.map((item, index) => {
                        return (
                            <li key={index} style={{ display: "inline" }}>
                                <button className={item.cName}>
                                    {item.title}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default ModelMenu
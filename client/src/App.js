import React, { useState, useEffect } from 'react'
import ReactFlow from 'react-flow-renderer'
import './App.css'
import ModelMenu from './components/ModelMenu/ModelMenu';
import CodeBlock from './components/CodeBlock/CodeBlock';

const initBgColor = '#1A192B';

const nodeTypes = {
    codeNode: CodeBlock,
};

const elements = [];

function App() {

    const [data, setData] = useState(elements);


    // Example of communication with the backend
    // useEffect(() => {
    //     fetch("/members").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData(data)
    //             console.log(data)
    //         }
    //     )
    // }, [])

    return (
        <div style={{ height: "100%" }}>
            <ModelMenu elements={data} setElements={setData} />
            <ReactFlow
                elements={data}
                nodeTypes={nodeTypes}
            />
        </div>
    )
}

export default App
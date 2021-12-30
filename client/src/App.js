import React, { useState, useEffect, useCallback } from 'react'
import ReactFlow, { addEdge, Background } from 'react-flow-renderer'
import './App.css'
import ModelMenu from './components/ModelMenu/ModelMenu';
import CodeBlock from './components/CodeBlock/CodeBlock';
import ReshapeBlock from './components/ReshapeBlock/ReshapeBlock';

const nodeTypes = {
    codeNode: CodeBlock,
    reshapeNode: ReshapeBlock,
};

const initialElements = [];

function App() {

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

    const [elements, setElements] = useState(initialElements);

    const onConnect = useCallback(
        (params) => 
            setElements((els) =>
                addEdge({...params}, els)
            ),
        [],
    )

    return (
        <div style={{ height: "100%", backgroundColor: "#32252a"  }}>
            <ModelMenu elements={elements} setElements={setElements} />
            <ReactFlow
                elements={elements}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
            />
        </div>
    )
}

export default App
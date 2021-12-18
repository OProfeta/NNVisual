import React, { useState, useEffect } from 'react'
import ReactFlow from 'react-flow-renderer'
import './App.css'
import ModelMenu from './components/ModelMenu/ModelMenu';
import CodeBlock from './components/CodeBlock/CodeBlock';

const initBgColor = '#1A192B';

const nodeTypes = {
    codeNode: CodeBlock,
};

// const onClick() {

// };

const elements = [
    // {
    //     id: '1',
    //     type: 'input', // input node
    //     data: { label: 'Input Noe' },
    //     position: { x: 250, y: 25 },
    // },
    // // default node
    // {
    //     id: '2',
    //     // you can also pass a React component as a label
    //     data: { label: <div>Default Node</div> },
    //     position: { x: 100, y: 125 },
    // },
    // {
    //     id: '3',
    //     type: 'output',
    //     data: { label: 'Output Node' },
    //     position: { x: 250, y: 250 }
    // },
    // {
    //     id: '4',
    //     type: 'codeNode',
    //     data: { color: initBgColor },
    //     style: { border: '1px solid #777', padding: 10 },
    //     position: { x : 251, y: 251}
    // },
    // // animated edge
    // { id: 'e1-2', source: '1', target: '2', animated: true },
    // { id: 'e2-3', source: '2', target: '3' }
];

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
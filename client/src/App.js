import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactFlow, { 
    ReactFlowProvider,
    addEdge,
} from 'react-flow-renderer'

import './App.css'
import ModelMenu from './components/ModelMenu/ModelMenu';
import CodeBlock from './components/CodeBlock/CodeBlock';
import ReshapeBlock from './components/ReshapeBlock/ReshapeBlock';
import GrayscaleBlock from './components/GrayscaleBlock/GrayscaleBlock';
import OneHotBlock from './components/OneHotBlock/OneHotBlock';
import RescaleBlock from './components/RescaleBlock/RescaleBlock';
import DenseBlock from './components/DenseBlock/DenseBlock';
import ConvolutionBlock from './components/ConvolutionBlock/ConvolutionBlock';
import RecurrentBlock from './components/RecurrentBlock/RecurrentBlock';
import ArgmaxBlock from './components/ArgmaxBlock/ArgmaxBlock';

const nodeTypes = {
    codeNode: CodeBlock,
    reshapeNode: ReshapeBlock,
    grayscaleNode: GrayscaleBlock,
    oneHotNode: OneHotBlock,
    rescaleNode: RescaleBlock,
    denseNode: DenseBlock,
    convolutionNode: ConvolutionBlock,
    recurrentNode: RecurrentBlock,
    argmaxNode: ArgmaxBlock
};

const initialElements = [];
let id = 0;
const getId = () => `${id++}`;

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

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const onConnect = (params) => setElements((els) => addEdge(params, els));

    const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const data = JSON.parse(event.dataTransfer.getData('application/reactflow/data'));
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: getId(),
            type,
            position,
            data: data,
            style: { border: '1px solid #777', padding: 10, background: "white" },
        };
        newNode.data.id = newNode.id;
        setElements((es) => es.concat(newNode));
    }
    
    return (
        <div style={{ height: "100%", backgroundColor: "#32252a" }}>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
                    <ModelMenu elements={elements} setElements={setElements} />
                    <ReactFlow
                        elements={elements}
                        nodeTypes={nodeTypes}
                        onConnect={onConnect}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    />
                </div>
            </ReactFlowProvider>
        </div>
    )
}

export default App
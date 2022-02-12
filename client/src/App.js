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
import MergeBlock from './components/MergeBlock/MergeBlock';
import InputBlock from './components/InputBlock/InputBlock';
import TargetBlock from './components/TargetBlock/TargetBlock';

const nodeTypes = {
    codeNode: CodeBlock,
    reshapeNode: ReshapeBlock,
    grayscaleNode: GrayscaleBlock,
    oneHotNode: OneHotBlock,
    rescaleNode: RescaleBlock,
    denseNode: DenseBlock,
    convolutionNode: ConvolutionBlock,
    recurrentNode: RecurrentBlock,
    argmaxNode: ArgmaxBlock,
    mergeNode: MergeBlock,
    inputNode: InputBlock,
    targetNode: TargetBlock
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

    const postElements = () => {
        // elements.push(datasetLocation);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application:json' },
            body: JSON.stringify(elements)
        }
        fetch("/elements", requestOptions)
            .then((res) => {
                return res.json();
            });
    }

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const [datasetLocation, setDatasetLocation] = useState("");
    const [datasetResponse, setDatasetResponse] = useState(null);
    const onConnect = (params) => setElements((els) => addEdge(params, els));

    const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

    const loadDataset = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application:json' },
            body: JSON.stringify(datasetLocation)
        }
        fetch("/load_dataset", requestOptions)
            .then(res => res.json())
            .then(data => setDatasetResponse(data))
        ;
    }

    useEffect(() => {
        if (datasetResponse){
            // colocoar blocos de input e target na tela
            const {inputs, target} = datasetResponse;
            // console.log(inputs, target);
            inputs.map((item, index) => {
                const type = 'inputNode';
                const data = {
                    name: item
                };
                const position = {
                    x: 20,
                    y: 20 + 60 * index
                };
                const newNode = {
                    id: getId(),
                    type,
                    position,
                    data: data,
                    style: { border: '1px solid #777', padding: 10, background: "white" },
                };
                newNode.data.id = newNode.id;
                setElements((es) => es.concat(newNode));
            });
            
            const type = 'targetNode';
            const data = {
                name: target
            };
            const position = {
                x: 500,
                y: 20
            };
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
    }, [datasetResponse]);

    const renderInputAndTargetNodes = (response) => {
        console.log(response);
    }

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
                    <button onClick={() => postElements()}>POST ELEMENTS</button>
                    <button onClick={() => loadDataset()}>LOAD DATASET</button>
                    <input id='dataset-location' name='dataset-location' type='text' onChange={(e) => setDatasetLocation(e.target.value)} />
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
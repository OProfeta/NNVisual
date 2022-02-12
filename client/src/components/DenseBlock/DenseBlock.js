import React, { memo, useState, useEffect } from "react";

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {

    const actFun = "sigmoid";
    const drop = "no";
    const batchNormal = "no";

    const [activationFunction, setActivationFunction] = useState(actFun);
    const [dropout, setDropout] = useState(drop);
    const [batchNormalization, setBatchNormalization] = useState(batchNormal);

    var onActivationFunctionValueChange = (event) => {
        setActivationFunction(event.target.value);
    }
    var onDropoutValueChange = (event) => {
        setDropout(event.target.value);
    }
    var onBatchNormalizationValueChange = (event) => {
        setBatchNormalization(event.target.value);
    }

    useEffect(() => {
        data.activationFunction = activationFunction;
    }, [activationFunction]);

    useEffect(() => {
        data.dropOut = dropout;
    }, [dropout]);

    useEffect(() => {
        data.batchNormalization = batchNormalization;
    }, [batchNormalization]);

    return (
        <>
            <Handle 
                type="target"
                position="left"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div>
                Dense Node: {data.id}
            </div>
            <label htmlFor={"input_neurons_"+data.id}>Neurons: </label>
            <input 
                type="number" 
                id={"input_neurons_"+data.id}
                name={"input_neurons_"+data.id}
                defaultValue={data.neurons}
                onChange={(e) => data.neurons = parseInt(e.target.value)}
            />
            <br />
            <div>
                <label>Activation function: </label>
                <br />
                <input 
                    type="radio"
                    id={"input_none_"+data.id}
                    name={"input_none_"+data.id}
                    value="none"
                    onChange={onActivationFunctionValueChange}
                    checked={activationFunction === "none"}
                />None
                <br />
                <input 
                    type="radio" 
                    id={"input_sigmoid_"+data.id}
                    name={"input_sigmoid_"+data.id}
                    value="sigmoid" 
                    onChange={onActivationFunctionValueChange}
                    checked={activationFunction === "sigmoid"}
                />Sigmoid
                <br />
                <input 
                    type="radio" 
                    id={"input_relu_"+data.id}
                    name={"input_relu_"+data.id}
                    value="relu" 
                    onChange={onActivationFunctionValueChange}
                    checked={activationFunction === "relu"}
                />ReLU
                <br />
                <input 
                    type="radio" 
                    id={"input_tanh_"+data.id}
                    name={"input_tanh_"+data.id}
                    value="tanh" 
                    onChange={onActivationFunctionValueChange}
                    checked={activationFunction === "tanh"}
                />Tanh
                <br />
                <input 
                    type="radio" 
                    id={"input_softmax_"+data.id}
                    name={"input_softmax_"+data.id}
                    value="softmax" 
                    onChange={onActivationFunctionValueChange}
                    checked={activationFunction === "softmax"}
                />Softmax
                <br />
                <input 
                    type="radio" 
                    id={"input_leakyrelu_"+data.id}
                    name={"input_leakyrelu_"+data.id}
                    value="leakyrelu" 
                    onChange={onActivationFunctionValueChange}
                    checked={activationFunction === "leakyrelu"}
                />LeakyReLU
            </div>
            <div>
                <label>Dropout: </label>
                <br />
                <input 
                    type="radio" 
                    id={"input_dropoutYes_"+data.id}
                    name={"input_dropoutYes_"+data.id}
                    value="yes"
                    onChange={onDropoutValueChange}
                    checked={dropout === "yes"}
                />Yes
                <br />
                <input 
                    type="radio" 
                    id={"input_dropoutNo_"+data.id}
                    name={"input_dropoutNo_"+data.id}
                    value="no"
                    onChange={onDropoutValueChange}
                    checked={dropout === "no"}
                />No
            </div>
            <div>
                <label>Batch Normalization: </label>
                <br />
                <input 
                    type="radio" 
                    id={"input_batchnormalizationYes_"+data.id}
                    name={"input_batchnormalizationYes_"+data.id}
                    value="yes"
                    onChange={onBatchNormalizationValueChange}
                    checked={batchNormalization === "yes"}
                />Yes
                <br />
                <input 
                    type="radio" 
                    id={"input_batchnormalizationNo_"+data.id}
                    name={"input_batchnormalizationNo_"+data.id}
                    value="no"
                    onChange={onBatchNormalizationValueChange}
                    checked={batchNormalization === "no"}
                />No
            </div>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    )
});
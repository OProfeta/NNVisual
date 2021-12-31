import React, { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {

    const actFun = "sigmoid";
    const recuAlt = "lstm";
    const retSeq = "no";
    const drop = "no";

    const [activationFunction, setActivationFunction] = useState(actFun);
    const [recurrentAlternative, setRecurrentAlternative] = useState(recuAlt);
    const [returnSequence, setReturnSequence] = useState(retSeq);
    const [dropout, setDropout] = useState(drop);

    var onActivationFunctionValueChange = (event) => {
        setActivationFunction(event.target.value);
    }
    var onRecurrentAlternativeValueChange = (event) => {
        setRecurrentAlternative(event.target.value);
    }
    var onReturnSequenceValueChange = (event) => {
        setReturnSequence(event.target.value);
    }
    var onDropoutValueChange = (event) => {
        setDropout(event.target.value);
    }

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
                Recurrent Node: {data.id}
            </div>

            <label htmlFor={"input_neurons_"+data.id}>Neurons: </label>
            <input 
                type="number" 
                id={"input_neurons_"+data.id}
                name={"input_neurons_"+data.id}
                defaultValue={data.neurons}
            />

            <br />
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
            <label>Recurrent alternative: </label>
            <br />
            <input 
                type="radio"
                id={"input_lstm_"+data.id}
                name={"input_lstm_"+data.id}
                value="lstm"
                onChange={onRecurrentAlternativeValueChange}
                checked={recurrentAlternative === "lstm"}
            />LSTM
            <br />
            <input 
                type="radio"
                id={"input_gru_"+data.id}
                name={"input_gru_"+data.id}
                value="gru"
                onChange={onRecurrentAlternativeValueChange}
                checked={recurrentAlternative === "gru"}
            />GRU
            <br />
            <input 
                type="radio"
                id={"input_rnn_"+data.id}
                name={"input_rnn_"+data.id}
                value="rnn"
                onChange={onRecurrentAlternativeValueChange}
                checked={recurrentAlternative === "rnn"}
            />RNN

            <br />
            <label>Return sequence: </label>
            <br />
            <input 
                type="radio"
                id={"input_returnYes_"+data.id}
                name={"input_returnYes_"+data.id}
                value="yes"
                onChange={onReturnSequenceValueChange}
                checked={returnSequence === "yes"}
            />Yes
            <br />
            <input 
                type="radio"
                id={"input_returnNo_"+data.id}
                name={"input_returnNo_"+data.id}
                value="no"
                onChange={onReturnSequenceValueChange}
                checked={returnSequence === "no"}
            />No

            <br />
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

            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    )
})
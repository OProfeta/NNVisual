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
    const [isCollapsed, setIsCollapsed] = useState(false);

    var onActivationFunctionValueChange = (event) => {
        data.activation_function = event.target.value;
        setActivationFunction(event.target.value);
    }
    var onRecurrentAlternativeValueChange = (event) => {
        data.recurrent_alternative = event.target.value;
        setRecurrentAlternative(event.target.value);
    }
    var onReturnSequenceValueChange = (event) => {
        data.return_sequence = event.target.value;
        setReturnSequence(event.target.value);
    }
    var onDropoutValueChange = (event) => {
        data.dropout = event.target.value;
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

            <button onClick={() => setIsCollapsed(!isCollapsed)}>Show</button>
            <br />

            {!isCollapsed &&
                <>
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
                    <br />

                    {dropout === "yes" &&
                        <>
                            <label htmlFor={"input_dropout_probability_"+data.id}>Keep probability: </label>
                            <input 
                                type="number" 
                                id={"input_dropout_probability_"+data.id}
                                name={"input_dropout_probability_"+data.id}
                                defaultValue={data.dropout_probability}
                                onChange={(e) => data.dropout_probability = parseInt(e.target.value)}
                            />
                            <br />
                        </>
                    }
                </>
            }

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
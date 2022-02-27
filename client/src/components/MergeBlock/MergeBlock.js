import React, { memo, useState, useEffect } from "react";

import { Handle, useUpdateNodeInternals } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {

    const op = "addition";

    const [operation, setOperation] = useState(op);
    const [isCollapsed, setIsCollapsed] = useState(false);

    var onOperationValueChange = (event) => {
        data.operation = event.target.value;
        setOperation(event.target.value);
    }

    const h = [];
    const [handles, setHandles] = useState(h);

    
    var onInputsValueChange = (event) => {
        let han = [];
        let maxInputs = 10;
        let numInputs = event.target.value > maxInputs ? 10 : event.target.value;
        for (let i = 0; i < numInputs; i++) {
            han.push(<Handle
                key={i} 
                type="target"
                position="left"
                id={i}
                style={{ background: '#555', top: 10 + (10 * i) }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />);
        }
        setHandles(han);
    }
    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
        updateNodeInternals(data.id);
    }, [handles])
        
    return (
        <>
            <div>
                Merge Node: {data.id}
            </div>
            <label htmlFor={"input_inputs_"+data.id}>Number of inputs: </label>
            <input 
                type="number" 
                id={"input_inputs_"+data.id}
                name={"input_inputs_"+data.id}
                defaultValue={data.inputs}
                onChange={onInputsValueChange}
            />
            <label>(Max inputs: 10)</label>

            {handles}

            <br />
            <button onClick={() => setIsCollapsed(!isCollapsed)}>Show</button>
            <br />

            {!isCollapsed &&
                <>
                    <div>
                        <label>Operation: </label>
                        <br />
                        <input 
                            type="radio"
                            id={"input_concatenate_"+data.id}
                            name={"input_concatenate_"+data.id}
                            value="concatenate"
                            onChange={onOperationValueChange}
                            checked={operation === "concatenate"}
                        />Concatenate
                        <br />
                        <input 
                            type="radio"
                            id={"input_subtraction_"+data.id}
                            name={"input_subtraction_"+data.id}
                            value="subtraction"
                            onChange={onOperationValueChange}
                            checked={operation === "subtraction"}
                        />Subtraction
                        <br />
                        <input 
                            type="radio"
                            id={"input_addition_"+data.id}
                            name={"input_addition_"+data.id}
                            value="addition"
                            onChange={onOperationValueChange}
                            checked={operation === "addition"}
                        />Addition
                        <br />
                        <input 
                            type="radio"
                            id={"input_multiplication_"+data.id}
                            name={"input_multiplication_"+data.id}
                            value="multiplication"
                            onChange={onOperationValueChange}
                            checked={operation === "multiplication"}
                        />Multiplication
                        <br />
                        <input 
                            type="radio"
                            id={"input_division_"+data.id}
                            name={"input_division_"+data.id}
                            value="division"
                            onChange={onOperationValueChange}
                            checked={operation === "division"}
                        />Division
                    </div>
                    <br />

                    {operation === "concatenate" &&
                        <>
                            <label htmlFor={"input_dimension_"+data.id}>Dimension: </label>
                            <input 
                                type="number" 
                                id={"input_dimension_"+data.id} 
                                name={"input_dimension_"+data.id} 
                                defaultValue={data.merge_dimension}
                                onChange={(e) => data.merge_dimension = parseInt(e.target.value)}
                            />
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
});
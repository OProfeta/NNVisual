import React, { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

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
                Argmax Node: {data.id}
            </div>

            <button onClick={() => setIsCollapsed(!isCollapsed)}>Show</button>
            <br />

            {!isCollapsed && 
                <>
                    <label htmlFor={"input_dimension_"+data.id}>Dimension: </label>
                    <input 
                        type="number" 
                        id={"input_dimension_"+data.id}
                        name={"input_dimension_"+data.id}
                        defaultValue={data.dimension}
                    />
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
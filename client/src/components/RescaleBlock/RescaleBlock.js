import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
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
                Rescale Node: {data.id}
            </div>
            <label htmlFor={"input_width_"+data.id}>Width: </label>
            <input 
                type="number" 
                id={"input_width_"+data.id} 
                name={"input_width_"+data.id} 
                defaultValue={data.width}
            />
            <br />
            <label htmlFor={"input_height_"+data.id}>Height: </label>
            <input 
                type="number" 
                id={"input_height_"+data.id} 
                name={"input_height_"+data.id} 
                defaultValue={data.height}
            />
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
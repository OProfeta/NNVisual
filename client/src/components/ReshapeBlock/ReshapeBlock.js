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
                Reshape Node: {data.id}
            </div>
            <label htmlFor={"input_X_"+data.id}>X: </label>
            <input 
                type="number" 
                id={"input_X_"+data.id} 
                name={"input_X_"+data.id}
                defaultValue={data.X}
            />
            <br/>

            <label htmlFor={"input_Y_"+data.id}>Y: </label>
            <input 
                type="number" 
                id={"input_Y_"+data.id} 
                name={"input_Y_"+data.id} 
                defaultValue={data.Y}
            />
            <br/>

            <label htmlFor={"input_Z_"+data.id}>Z: </label>
            <input 
                type="number" 
                id={"input_Z_"+data.id} 
                name={"input_Z_"+data.id} 
                defaultValue={data.Z}
            />
            <br/>

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
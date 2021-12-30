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
            <label htmlFor="input_X">X: </label>
            <input type="number" id="input_X" name="input_X" defaultValue={data.X}/>
            <br/>

            <label htmlFor="input_Y">Y: </label>
            <input type="number" id="input_Y" name="input_Y" defaultValue={data.Y}/>
            <br/>

            <label htmlFor="input_Z">Z: </label>
            <input type="number" id="input_Z" name="input_Z" defaultValue={data.Z}/>
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
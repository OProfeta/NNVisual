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
            <label htmlFor="input_width">Width: </label>
            <input type="number" id="input_width" name="input_width" defaultValue={data.width}/>
            <br />
            <label htmlFor="input_height">Height: </label>
            <input type="number" id="input_height" name="input_height" defaultValue={data.height}/>
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
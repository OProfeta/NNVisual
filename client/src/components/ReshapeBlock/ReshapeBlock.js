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
                Reshape Node: {data.id}
            </div>

            <button onClick={() => setIsCollapsed(!isCollapsed)}>Show</button>
            <br />

            {!isCollapsed &&
                <>
                    <label htmlFor={"input_X_"+data.id}>X: </label>
                    <input 
                        type="number" 
                        id={"input_X_"+data.id} 
                        name={"input_X_"+data.id}
                        defaultValue={data.X}
                        onChange={(e) => data.X = parseInt(e.target.value)}
                    />
                    <br/>

                    <label htmlFor={"input_Y_"+data.id}>Y: </label>
                    <input 
                        type="number" 
                        id={"input_Y_"+data.id} 
                        name={"input_Y_"+data.id} 
                        defaultValue={data.Y}
                        onChange={(e) => data.Y = parseInt(e.target.value)}
                    />
                    <br/>

                    <label htmlFor={"input_Z_"+data.id}>Z: </label>
                    <input 
                        type="number" 
                        id={"input_Z_"+data.id} 
                        name={"input_Z_"+data.id} 
                        defaultValue={data.Z}
                        onChange={(e) => data.Z = parseInt(e.target.value)}
                    />
                    <br/>
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
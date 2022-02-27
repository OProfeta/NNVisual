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
                OneHot Node: {data.id}
            </div>

            <button onClick={() => setIsCollapsed(!isCollapsed)}>Show</button>
            <br />

            {!isCollapsed &&
                <>
                    <label htmlFor={"input_classes_"+data.id}>Number of Classes: </label>
                    <input 
                        type="number" 
                        id={"input_classes_"+data.id} 
                        name={"input_classes_"+data.id} 
                        defaultValue={data.classes}
                        onChange={(e) => data.classes = parseInt(e.target.value)}
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
});
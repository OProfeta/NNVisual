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
                OneHot Node: {data.id}
            </div>
            <label htmlFor={"input_classes_"+data.id}>Number of Classes: </label>
            <input 
                type="number" 
                id={"input_classes_"+data.id} 
                name={"input_classes_"+data.id} 
                defaultValue={data.classes}
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
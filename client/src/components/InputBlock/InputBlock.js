import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
    return (
        <>
            <div>
                Input Node: {data.id}
            </div>
            
            <div>
                {data.name}
            </div>

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
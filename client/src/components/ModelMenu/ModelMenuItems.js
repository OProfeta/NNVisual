export const ModelMenuItems = [
    {
        title: "Processing",
        cName: "code-block-selector",
        onClick: (elements, setElements) => {
            setElements((elements) => {
                return [
                    ...elements, 
                    {
                        id: elements.length.toString(),
                        type: 'codeNode',
                        data: { 
                            id: elements.length.toString(), 
                            color: '#333' ,
                            placeHolder: 'Code goes here'
                        },
                        style: { border: '1px solid #777', padding: 10 },
                        position: { x : 251, y: 251}
                    }
                ]
            });
        },
    },
    {
        title: "Deep Learning",
        cName: "code-block-selector",
        onClick: (elements, setElements) => {
            setElements((elements) => {
                return [
                    ...elements,
                    {
                        id: elements.length.toString(),
                        type: 'codeNode',
                        data: { 
                            id: elements.length.toString(), 
                            color: '#333' ,
                            placeHolder: 'Code goes here'
                        },
                        style: { border: '1px solid #777', padding: 10 },
                        position: { x : 251, y: 251}
                    }
                ]
            });
        },
    },
    {
        title: "Operations",
        cName: "code-block-selector",
        onClick: (elements, setElements) => {
            setElements((elements) => {
                return [
                    ...elements,
                    {
                        id: elements.length.toString(),
                        type: 'codeNode',
                        data: { 
                            id: elements.length.toString(), 
                            color: '#333' ,
                            placeHolder: 'Code goes here'
                        },
                        style: { border: '1px solid #777', padding: 10 },
                        position: { x : 251, y: 251}
                    }
                ]
            });
        },
    },
    {
        title: "Custom",
        cName: "code-block-selector",
        onClick: (elements, setElements) => {
            setElements((elements) => {
                return [
                    ...elements,
                    {
                        id: elements.length.toString(),
                        type: 'codeNode',
                        data: { 
                            id: elements.length.toString(), 
                            color: '#333' ,
                            placeHolder: 'Code goes here'
                        },
                        style: { border: '1px solid #777', padding: 10 },
                        position: { x : 251, y: 251}
                    }
                ]
            });
        },
    }
]
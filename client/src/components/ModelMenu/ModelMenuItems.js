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
                        data: { color: '#333' },
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
        onClick: (elements, setElements) => {},
    },
    {
        title: "Operations",
        cName: "code-block-selector",
        onClick: (elements, setElements) => {},
    },
    {
        title: "Custom",
        cName: "code-block-selector",
        onClick: (elements, setElements) => {},
    }
]
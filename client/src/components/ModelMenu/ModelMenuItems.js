export const ModelMenuItems = [
    {
        id: 0,
        title: "Processing",
        selected: false,
        key: "processing",
        list: [
            {
                title: "Reshape",
                onClick: (elements, setElements) => {
                    setElements((elements) => {
                        return [
                            ...elements,
                            {
                                id: elements.length.toString(),
                                type: 'reshapeNode',
                                data: {
                                    id: elements.length.toString(),
                                    X: 0,
                                    Y: 0,
                                    Z: 0
                                },
                                style: { border: '1px solid #777', padding: 10, background: "white" },
                                position: { x: 251, y: 251 }
                            }
                        ]
                    })
                }
            },
            {
                title: "Grayscale"
            },
            {
                title: "OneHot"
            },
            {
                title: "Rescale"
            },
        ]
    },
    {
        id: 1,
        title: "Deep Learning",
        selected: false,
        key: "deepLearning",
        list: [
            {
                title: "Dense"
            },
            {
                title: "Convolution"
            },
            {
                title: "Recurrent"
            },
        ]
    },
    {
        id: 2,
        title: "Operations",
        selected: false,
        key: "operations",
        list: [
            {
                title: "Argmax"
            },
            {
                title: "Merge"
            },
        ]
    },
    {
        id: 3,
        title: "Custom",
        selected: false,
        key: "custom",
        list: [
            {
                title: "Custom",
                onClick: (elements, setElements) => {
                    setElements((elements) => {
                        return [
                            ...elements,
                            {
                                id: elements.length.toString(),
                                type: 'codeNode',
                                data: {
                                    id: elements.length.toString(),
                                    placeHolder: "Code goes here"
                                },
                                style: { border: '1px solid #777', padding: 10, background: "white" },
                                position: { x: 251, y: 251 }
                            }
                        ]
                    })
                }
            },
        ]
    },
]

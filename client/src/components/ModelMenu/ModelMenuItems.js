export const ModelMenuItems = [
    {
        id: 0,
        title: "Processing",
        selected: false,
        key: "processing",
        list: [
            {
                title: "Reshape",
                type: "reshapeNode",
                data: {
                    X: 0,
                    Y: 0,
                    Z: 0
                },
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
                title: "Grayscale",
                type: "",
            },
            {
                title: "OneHot",
                type: "",
            },
            {
                title: "Rescale",
                type: "",
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
                title: "Dense",
                type: "",
            },
            {
                title: "Convolution",
                type: "",
            },
            {
                title: "Recurrent",
                type: "",
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
                title: "Argmax",
                type: "",
            },
            {
                title: "Merge",
                type: "",
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
                type: "codeNode",
                data: {
                    placeHolder: "Code goes here"
                },
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

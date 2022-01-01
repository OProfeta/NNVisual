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
            },
            {
                title: "Grayscale",
                type: "grayscaleNode",
                data: {
                    
                }
            },
            {
                title: "OneHot",
                type: "oneHotNode",
                data: {
                    classes: 0
                }
            },
            {
                title: "Rescale",
                type: "rescaleNode",
                data: {
                    width: 0,
                    height: 0
                }
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
                type: "denseNode",
                data: {
                    
                }
            },
            {
                title: "Convolution",
                type: "convolutionNode",
                data: {
                    patch: 0,
                    stride: 0,
                    feature: 0
                }
            },
            {
                title: "Recurrent",
                type: "recurrentNode",
                data: {
                    neurons: 0,
                }
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
                type: "argmaxNode",
                data: {
                    dimension: 0,
                }
            },
            {
                title: "Merge",
                type: "mergeNode",
                data: {
                    inputs: 0,
                }
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
            },
        ]
    },
]

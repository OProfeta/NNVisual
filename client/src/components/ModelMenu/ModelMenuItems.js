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
            },
        ]
    },
]

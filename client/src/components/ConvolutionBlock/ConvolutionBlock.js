import React, { memo, useState } from "react";
import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {

    const convType = "conv";
    const dim = "2d";
    const zPad = "same";
    const actFun = "sigmoid";
    const drop = "no";
    const batchNormal = "no";
    const pool = "no";
    const poolType = "max_pooling";
    const collapsed = false;
    const poolZero = "same";

    const [convolutionType, setConvolutionType] = useState(convType);
    const [dimension, setDimension] = useState(dim);
    const [zeroPadding, setZeroPadding] = useState(zPad);
    const [activationFunction, setActivationFunction] = useState(actFun);
    const [dropout, setDropout] = useState(drop);
    const [batchNormalization, setBatchNormalization] = useState(batchNormal);
    const [pooling, setPooling] = useState(pool);
    const [poolingType, setPoolingType] = useState(poolType);
    const [poolingZeroPadding, setPoolingZeroPadding] = useState(poolZero);
    const [isCollapsed, setIsCollapsed] = useState(collapsed);


    var onConvolutionTypeValueChange = (event) => {
        data.convolutionType = event.target.value;
        setConvolutionType(event.target.value);
    }
    var onDimensionValueChange = (event) => {
        data.dimension = event.target.value;
        setDimension(event.target.value);
    }
    var onZeroPaddingValueChange = (event) => {
        data.zeroPadding = event.target.value;
        setZeroPadding(event.target.value);
    }
    var onActivationFunctionValueChange = (event) => {
        data.activationFunction = event.target.value;
        setActivationFunction(event.target.value);
    }
    var onDropoutValueChange = (event) => {
        data.dropout = event.target.value;
        setDropout(event.target.value);
    }
    var onBatchNormalizationValueChange = (event) => {
        data.batchNormalization = event.target.value;
        setBatchNormalization(event.target.value);
    }
    var onPoolingValueChange = (event) => {
        data.pooling = event.target.value;
        setPooling(event.target.value);
    }
    var onPoolingTypeValueChange = (event) => {
        data.pooling_type = event.target.value;
        setPoolingType(event.target.value);
    }
    var onPoolingZeroPaddingValueChange = (event) => {
        data.pooling_zero_padding = event.target.value;
        setPoolingZeroPadding(event.target.value);
    }

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
                Convolution Node: {data.id}
            </div>

            <button onClick={() => setIsCollapsed(!isCollapsed)}>Show</button>
            <br />

            {!isCollapsed && 
                <>
                    <label>Convolution type: </label>
                    <br />
                    <input 
                        type="radio"
                        id={"input_conv_"+data.id}
                        name={"input_conv_"+data.id}
                        value="conv"
                        onChange={onConvolutionTypeValueChange}
                        checked={convolutionType === "conv"}
                    />Conv
                    <br />
                    <input 
                        type="radio"
                        id={"input_transpose_"+data.id}
                        name={"input_transpose_"+data.id}
                        value="transpose"
                        onChange={onConvolutionTypeValueChange}
                        checked={convolutionType === "transpose"}
                    />Transpose
                    <br />
                    <input 
                        type="radio"
                        id={"input_separable_"+data.id}
                        name={"input_separable_"+data.id}
                        value="separable"
                        onChange={onConvolutionTypeValueChange}
                        checked={convolutionType === "separable"}
                    />Separable
                    <br />
                    <input 
                        type="radio"
                        id={"input_depthwise_"+data.id}
                        name={"input_depthwise_"+data.id}
                        value="depthwise"
                        onChange={onConvolutionTypeValueChange}
                        checked={convolutionType === "depthwise"}
                    />Depthwise

                    <br />
                    <label>Dimension: </label>
                    {convolutionType === "conv" &&
                        <>
                            <br />
                            <input 
                                type="radio"
                                id={"input_1d_"+data.id}
                                name={"input_1d_"+data.id}
                                value="1d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "1d"}
                            />1D
                            <br />
                            <input 
                                type="radio"
                                id={"input_2d_"+data.id}
                                name={"input_2d_"+data.id}
                                value="2d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "2d"}
                            />2D
                            <br />
                            <input 
                                type="radio"
                                id={"input_3d_"+data.id}
                                name={"input_3d_"+data.id}
                                value="3d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "3d"}
                            />3D
                        </>
                    }
                    {convolutionType === "transpose" &&
                        <>
                            <br />
                            <input 
                                type="radio"
                                id={"input_2d_"+data.id}
                                name={"input_2d_"+data.id}
                                value="2d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "2d"}
                            />2D
                            <br />
                            <input 
                                type="radio"
                                id={"input_3d_"+data.id}
                                name={"input_3d_"+data.id}
                                value="3d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "3d"}
                            />3D
                        </>
                    }
                    {convolutionType === "separable" &&
                        <>
                            <br />
                            <input 
                                type="radio"
                                id={"input_1d_"+data.id}
                                name={"input_1d_"+data.id}
                                value="1d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "1d"}
                            />1D
                            <br />
                            <input 
                                type="radio"
                                id={"input_2d_"+data.id}
                                name={"input_2d_"+data.id}
                                value="2d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "2d"}
                            />2D
                        </>
                    }
                    {convolutionType === "depthwise" &&
                        <>
                            <br />
                            <input 
                                type="radio"
                                id={"input_2d_"+data.id}
                                name={"input_2d_"+data.id}
                                value="2d"
                                onChange={onDimensionValueChange}
                                checked={dimension === "2d"}
                            />2D
                        </>
                    }

                    <br />
                    <label htmlFor={"input_patch_"+data.id}>Patch size: </label>
                    <input 
                        type="number" 
                        id={"input_patch_"+data.id}
                        name={"input_patch_"+data.id}
                        defaultValue={data.patch}
                        onChange={(e) => data.patch = parseInt(e.target.value)}
                    />

                    <br />
                    <label htmlFor={"input_stride_"+data.id}>Stride: </label>
                    <input 
                        type="number" 
                        id={"input_stride_"+data.id}
                        name={"input_stride_"+data.id}
                        defaultValue={data.stride}
                        onChange={(e) => data.stride = parseInt(e.target.value)}
                    />

                    <br />
                    <label htmlFor={"input_feature_"+data.id}>Feature maps: </label>
                    <input 
                        type="number" 
                        id={"input_feature_"+data.id}
                        name={"input_feature_"+data.id}
                        defaultValue={data.feature}
                        onChange={(e) => data.feature = parseInt(e.target.value)}
                    />
                    <br />

                    <label>Zero-padding: </label>
                    <br />
                    <input 
                        type="radio"
                        id={"input_same_"+data.id}
                        name={"input_same_"+data.id}
                        value="same"
                        onChange={onZeroPaddingValueChange}
                        checked={zeroPadding === "same"}
                    />Same
                    <br />
                    <input 
                        type="radio"
                        id={"input_valid_"+data.id}
                        name={"input_valid_"+data.id}
                        value="valid"
                        onChange={onZeroPaddingValueChange}
                        checked={zeroPadding === "valid"}
                    />Valid
                    <br />

                    <label>Activation function: </label>
                    <br />
                    <input 
                        type="radio"
                        id={"input_none_"+data.id}
                        name={"input_none_"+data.id}
                        value="none"
                        onChange={onActivationFunctionValueChange}
                        checked={activationFunction === "none"}
                    />None
                    <br />
                    <input 
                        type="radio"
                        id={"input_sigmoid_"+data.id}
                        name={"input_sigmoid_"+data.id}
                        value="sigmoid"
                        onChange={onActivationFunctionValueChange}
                        checked={activationFunction === "sigmoid"}
                    />Sigmoid
                    <br />
                    <input 
                        type="radio"
                        id={"input_relu_"+data.id}
                        name={"input_relu_"+data.id}
                        value="relu"
                        onChange={onActivationFunctionValueChange}
                        checked={activationFunction === "relu"}
                    />ReLU
                    <br />
                    <input 
                        type="radio"
                        id={"input_tanh_"+data.id}
                        name={"input_tanh_"+data.id}
                        value="tanh"
                        onChange={onActivationFunctionValueChange}
                        checked={activationFunction === "tanh"}
                    />Tanh
                    <br />

                    <label>Dropout: </label>
                    <br />
                    <input 
                        type="radio"
                        id={"input_dropoutYes_"+data.id}
                        name={"input_dropoutYes_"+data.id}
                        value="yes"
                        onChange={onDropoutValueChange}
                        checked={dropout === "yes"}
                    />Yes
                    <br />
                    <input 
                        type="radio"
                        id={"input_dropoutNo_"+data.id}
                        name={"input_dropoutNo_"+data.id}
                        value="no"
                        onChange={onDropoutValueChange}
                        checked={dropout === "no"}
                    />No
                    <br />

                    {dropout === "yes" &&
                        <>
                            <label htmlFor={"input_dropout_probability_"+data.id}>Keep probability: </label>
                            <input 
                                type="number" 
                                id={"input_dropout_probability_"+data.id}
                                name={"input_dropout_probability_"+data.id}
                                defaultValue={data.dropout_probability}
                                onChange={(e) => data.dropout_probability = parseInt(e.target.value)}
                            />
                            <br />
                        </>
                    }

                    <label>Batch Normalization: </label>
                    <br />
                    <input 
                        type="radio"
                        id={"input_batchNormalizationYes_"+data.id}
                        name={"input_batchNormalizationYes_"+data.id}
                        value="yes"
                        onChange={onBatchNormalizationValueChange}
                        checked={batchNormalization === "yes"}
                    />Yes
                    <br />
                    <input 
                        type="radio"
                        id={"input_batchNormalizationNo_"+data.id}
                        name={"input_batchNormalizationNo_"+data.id}
                        value="no"
                        onChange={onBatchNormalizationValueChange}
                        checked={batchNormalization === "no"}
                    />No
                    <br />

                    <label>Pooling: </label>
                    <br />
                    <input 
                        type="radio"
                        id={"input_poolingYes_"+data.id}
                        name={"input_poolingYes_"+data.id}
                        value="yes"
                        onChange={onPoolingValueChange}
                        checked={pooling === "yes"}
                    />Yes
                    <br />
                    <input 
                        type="radio"
                        id={"input_poolingNo_"+data.id}
                        name={"input_poolingNo_"+data.id}
                        value="no"
                        onChange={onPoolingValueChange}
                        checked={pooling === "no"}
                    />No

                    {pooling === "yes" &&
                        <>
                            <br />
                            <label>Pooling type: </label>
                            <br />
                            <input 
                                type="radio"
                                id={"input_pooling_type_"+data.id}
                                name={"input_pooling_type_"+data.id}
                                value="max_pooling"
                                onChange={onPoolingTypeValueChange}
                                checked={poolingType === "max_pooling"}
                            />Max pooling
                            <br />
                            <input 
                                type="radio"
                                id={"input_pooling_type_"+data.id}
                                name={"input_pooling_type_"+data.id}
                                value="mean_pooling"
                                onChange={onPoolingTypeValueChange}
                                checked={poolingType === "mean_pooling"}
                            />Mean pooling
                            <br />

                            <label htmlFor={"input_pooling_area_"+data.id}>Pooling area: </label>
                            <input 
                                type="number" 
                                id={"input_pooling_area_"+data.id}
                                name={"input_pooling_area_"+data.id}
                                defaultValue={data.pooling_area}
                                onChange={(e) => data.pooling_area = parseInt(e.target.value)}
                            />
                            <br />

                            <label htmlFor={"input_pooling_area_"+data.id}>Pooling stride: </label>
                            <input 
                                type="number" 
                                id={"input_pooling_stride_"+data.id}
                                name={"input_pooling_stride_"+data.id}
                                defaultValue={data.pooling_stride}
                                onChange={(e) => data.pooling_stride = parseInt(e.target.value)}
                            />
                            <br />

                            <label>Zero-padding for pooling: </label>
                            <br />
                            <input 
                                type="radio"
                                id={"input_pooling_same_"+data.id}
                                name={"input_pooling_same_"+data.id}
                                value="same"
                                onChange={onPoolingZeroPaddingValueChange}
                                checked={poolingZeroPadding === "same"}
                            />Same
                            <br />
                            <input 
                                type="radio"
                                id={"input_pooling_valid_"+data.id}
                                name={"input_pooling_valid_"+data.id}
                                value="valid"
                                onChange={onPoolingZeroPaddingValueChange}
                                checked={poolingZeroPadding === "valid"}
                            />Valid
                            <br />
                        </>
                    }
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
})
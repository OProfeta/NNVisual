import tensorflow as tf
import numpy as np
import csv


class InputNodeLayer(tf.keras.layers.Layer):
    def __init__(self):
        super(InputNodeLayer, self).__init__()

    def build(self, input_shape):
        # self.input_layer = tf.keras.layers.InputLayer(shape=(None,))
        self.input_layer = tf.keras.Input(shape=(28, 28, 3,))

    def call(self, inputs):
        output = self.input_layer(inputs)
        print(f"INPUTS = {inputs}")
        print(f"OUTPUT = {output}")
        return output

    def get_config(self):
        config = super(InputNodeLayer, self).get_config()
        return config


class ReshapeNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(ReshapeNodeLayer, self).__init__()
        target_shape = (data['X'], data['Y'], data['Z'])
        self.target_shape = target_shape
        self.layer_reshape = None

    def build(self, input_shape):
        self.layer_reshape = tf.keras.layers.Reshape(target_shape=self.target_shape)

    def call(self, inputs):
        output = self.layer_reshape(inputs)
        return output

    def get_config(self):
        config = super(ReshapeNodeLayer, self).get_config()
        return config


class DenseNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(DenseNodeLayer, self).__init__()
        self.units = data['neurons']
        self.activation = None if data['activationFunction'] == 'none' else data['activationFunction']
        self.layer_flatten = None
        self.layer_dense = None

    def build(self, input_shape):
        self.layer_flatten = tf.keras.layers.Flatten()
        self.layer_dense = tf.keras.layers.Dense(
            units=self.units,
            activation=self.activation
        )

    def call(self, inputs):
        flatten = self.layer_flatten(inputs)
        dense = self.layer_dense(flatten)
        return dense

    def get_config(self):
        config = super(DenseNodeLayer, self).get_config()
        return config


class MergeNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(MergeNodeLayer, self).__init__()
        self.num_inputs = data['inputs']
        self.operation = data['operation']

    def build(self, input_shape):
        pass

    def call(self, inputs):
        # -1 == dimension ?
        # dimension 1 as temporary default
        # output = tf.concat([inputs[f'input{i+1}'] for i in range(self.num_inputs)], 1)
        output = tf.keras.layers.concatenate([inputs[f'input{i+1}'] for i in range(self.num_inputs)], axis=1)

        return output

    def get_config(self):
        config = super(MergeNodeLayer, self).get_config()
        return config


class ConvolutionNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(ConvolutionNodeLayer, self).__init__()
        self.convolution_type = data['convolutionType']
        self.dimension = data['dimension']
        self.patch_size = data['patch']
        self.stride = data['stride']
        self.feature_maps = data['feature']
        self.zero_padding = data['zeroPadding']
        self.activation_function = data['activationFunction']
        self.dropout = data['dropout']
        self.batch_normalization = data['batchNormalization']
        self.pooling = data['pooling']

    def build(self, input_shape):
        self.conv_layer = None
        if self.convolution_type == "conv":
            if self.dimension == "1d":
                self.conv_layer = tf.keras.layers.Conv1D()
            elif self.dimension == "2d":
                self.conv_layer = tf.keras.layers.Conv2D(
                    filters=self.feature_maps,
                    kernel_size=self.patch_size,
                    strides=(self.stride, self.stride),
                    padding=self.zero_padding,
                    activation=self.activation_function
                )
            elif self.dimension == "3d":
                self.conv_layer = tf.keras.layers.Conv3D()
        elif self.convolution_type == "transpose":
            if self.dimension == "2d":
                self.conv_layer = tf.keras.layers.Conv2DTranspose()
            elif self.dimension == "3d":
                self.conv_layer = tf.keras.layers.Conv3DTranspose()
        elif self.convolution_type == "separable":
            if self.dimension == "1d":
                self.conv_layer = tf.keras.layers.SeparableConv1D()
            elif self.dimentos == "2d":
                self.conv_layer = tf.keras.layers.SeparableConv2D()
        elif self.convolution_type == "depthwise":
            self.conv_layer = tf.keras.layers.DepthwiseConv2D()
        else:
            raise("deu ruim no ConvolutionNodeLayer")

    def call(self, inputs):
        return self.conv_layer(inputs)

    def get_config(self):
        config = super(ConvolutionNodeLayer, self).get_config()
        return config


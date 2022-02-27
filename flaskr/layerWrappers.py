import tensorflow as tf
import numpy as np
import csv


# nao sendo usado ainda
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


# Processing Nodes

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


class GrayscaleNodeLayer(tf.keras.layers.Layer):
    def __init__(self):
        super(GrayscaleNodeLayer, self).__init__()

    def build(self, input_shape):
        pass

    def call(self, inputs):
        channels = inputs.get_shape().as_list()[-1]

        # rgb to grayscale
        if channels == 3:
            output = tf.image.rgb_to_grayscale(inputs)
        else:
            output = inputs

        return output

    def get_config(self):
        config = super(GrayscaleNodeLayer, self).get_config()
        return config


class OneHotNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(OneHotNodeLayer, self).__init__()
        self.num_classes = data['classes']

    def build(self, input_shape):
        pass

    def call(self, inputs):
        output = tf.one_hot(tf.cast(inputs, dtype=tf.int32), self.num_classes)
        return output

    def get_config(self):
        config = super(OneHotNodeLayer, self).get_config()
        return config


class RescaleNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(RescaleNodeLayer, self).__init__()
        self.width = data['width']
        self.height = data['height']

    def build(self, input_shape):
        pass

    def call(self, inputs):
        output = tf.image.resize(inputs, [self.height, self.width])
        return output

    def get_config(self):
        config = super(RescaleNodeLayer, self).get_config()
        return config


# Deep Learning Nodes


class DenseNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(DenseNodeLayer, self).__init__()
        self.units = data['neurons']
        self.activation = None if data['activationFunction'] == 'none' else data['activationFunction']
        self.dropout = data['dropout']
        self.dropout_probability = data['dropout_probability']
        self.batch_normalization = data['batch_normalization']

        self.layer_flatten = None
        self.layer_dense = None
        self.batch_norm_layer = None
        self.drop_layer = None

    def build(self, input_shape):
        self.layer_flatten = tf.keras.layers.Flatten()
        self.layer_dense = tf.keras.layers.Dense(
            units=self.units,
            activation=self.activation
        )

        if self.batch_normalization == 'yes':
            self.batch_norm_layer = tf.keras.layers.BatchNormalization()
        if self.dropout == 'yes':
            self.drop_layer = tf.keras.layers.Dropout(rate=1-self.dropout_probability)

    def call(self, inputs):
        flatten = self.layer_flatten(inputs)
        dense = self.layer_dense(flatten)

        if self.batch_normalization == 'yes':
            dense = self.batch_norm_layer(dense)

        if self.dropout == 'yes':
            dense = self.drop_layer(dense)

        return dense

    def get_config(self):
        config = super(DenseNodeLayer, self).get_config()
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
        self.activation_function = None if data['activationFunction'] == 'none' else data['activationFunction']
        self.dropout = data['dropout']
        self.dropout_probability = data['dropout_probability']
        self.batch_normalization = data['batchNormalization']
        self.pooling = data['pooling']
        self.pooling_type = data['pooling_type']
        self.pooling_area = data['pooling_area']
        self.pooling_stride = data['pooling_stride']
        self.pooling_zero_padding = data['pooling_zero_padding']

        self.conv_layer = None
        self.drop_layer = None
        self.batch_norm_layer = None
        self.pooling_layer = None

    def __get_dimension__(self) -> int:
        dimensions = {
            '1d': 1,
            '2d': 2,
            '3d': 3,
        }
        if self.dimension.lower() in dimensions.keys():
            return dimensions[self.dimension.lower()]
        raise 'Dimension not found'

    def __get_input_with_dimension__(self, _input: int) -> Union[int, tuple]:
        dimension = self.__get_dimension__()

        if dimension == 1:
            return _input
        elif dimension > 1:
            return (_input,) * dimension

    def __get_conv_type__(self, layer):
        # conv (1D 2D 3D)
        # transpose (2D 3D)
        # depthwise (2D)
        # separable (1D 2D)
        layers = {
            'conv': ['ConvXD', [1, 2, 3]],
            'transpose': ['ConvXDTranspose', [2, 3]],
            'depthwise': ['DepthwiseConvXD', [2]],
            'separable': ['SeparableConvXD', [1, 2]],
        }
        package = tf.keras.layers
        layer = layer.lower()
        dimension = self.__get_dimension__()
        if layer in layers.keys() and dimension in layers[layer][1]:
            layer_with_dimension = layers[layer][0].replace("X", f"{self.__get_dimension__()}")
            conv = getattr(package, layer_with_dimension)
            return conv
        else:
            raise f'Non-existent layer or dimension in ConvolutionNodeLayer'

    def __get_pooling_type__(self, layer):
        # max_pooling (1D 2D 3D)
        # mean_pooling (1D 2D 3D)
        layers = {
            'max_pooling': ['MaxPoolingXD', [1, 2, 3]],
            'mean_pooling': ['AveragePoolingXD', [1, 2, 3]],
        }
        package = tf.keras.layers
        layer = layer.lower()
        dimension = self.__get_dimension__()
        if layer in layers.keys() and dimension in layers[layer][1]:
            layer_with_dimension = layer[layer][0].replace("X", f"{dimension}")
            pooling = getattr(package, layer_with_dimension)
            return pooling
        else:
            raise f"Non-existent pooling layer or dimension in ConvolutionNodeLayer"

    def build(self, input_shape):
        conv_strides = self.__get_input_with_dimension__(self.stride)
        pool_strides = self.__get_input_with_dimension__(self.pooling_stride)
        pool_size = self.__get_input_with_dimension__(self.pooling_area)

        conv = self.__get_conv_type__(self.convolution_type)

        self.conv_layer = conv(
                filters=self.feature_maps,
                kernel_size=self.patch_size,
                strides=conv_strides,
                padding=self.zero_padding,
                activation=self.activation_function
        )

        if self.batch_normalization == 'yes':
            self.batch_norm_layer = tf.keras.layers.BatchNormalization()

        if self.dropout == 'yes':
            self.drop_layer = tf.keras.layers.Dropout(rate=1-self.dropout_probability)

        if self.pooling == 'yes':
            pooling_layer = self.__get_pooling_type__()

            self.pooling_layer = pooling_layer(
                pool_size=pool_size,
                strides=pool_strides,
                padding=self.pooling_zero_padding
            )

    def call(self, inputs):
        output = self.conv_layer(inputs)
        if self.batch_normalization == 'yes':
            output = self.batch_norm_layer(output)
        if self.dropout == 'yes':
            output = self.drop_layer(output)
        if self.pooling == 'yes':
            output = self.pooling_layer(output)

        return output

    def get_config(self):
        config = super(ConvolutionNodeLayer, self).get_config()
        return config


class RecurrentNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        self.neurons = data['neurons']
        self.activation_function = data['activation_function']
        self.recurrent_alternative = data['recurrent_alternative']
        self.return_sequence = data['return_sequence']
        self.dropout = data['dropout']
        self.dropout_probability = data['dropout_probability']

        self.dropout_layer = None
        self.recurrent_layer = None

    def build(self, input_shape):

        return_sequences = self.return_sequence == 'yes'

        if self.dropout == 'yes':
            self.dropout_layer = tf.keras.layers.Dropout(rate=1-self.dropout_probability)

        if self.recurrent_alternative == 'LSTM':
            self.recurrent_layer = tf.keras.layers.LSTM(
                units=self.neurons,
                activation=self.activation_function,
                return_sequences=return_sequences
            )
        elif self.recurrent_alternative == 'GRU':
            self.recurrent_layer = tf.keras.layers.GRU(
                units=self.neurons,
                activation=self.activation_function,
                return_sequences=return_sequences
            )
        elif self.recurrent_alternative == 'RNN':
            self.recurrent_layer = tf.keras.layers.RNN(
                units=self.neurons,
                actvation=self.activation_function,
                return_sequences=return_sequences
            )
        else:
            raise f'Non-existent recurrent alternative in RecurrentNodeLayer'

    def call(self, inputs):
        output = self.recurrent_layer(inputs)
        if self.dropout == 'yes':
            output = self.dropout_layer(output)
        return output

    def get_config(self):
        config = super(RecurrentNodeLayer, self).get_config()
        return config

# Operation Nodes


class MergeNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        super(MergeNodeLayer, self).__init__()
        self.num_inputs = data['inputs']
        self.operation = data['operation']
        self.merge_dimension = data['merge_dimension']

        self.merge_layer = None

    def build(self, input_shape):
        if self.operation == 'concatenate':
            self.merge_layer = tf.keras.layers.concatenate

    def call(self, inputs):
        # -1 == dimension ?
        # dimension 1 as temporary default (WORKS AS INTENDED)
        # changing to self.merge_dimension (-1 as default), make sure it works
        # output = tf.keras.layers.concatenate([inputs[f'input{i+1}'] for i in range(self.num_inputs)], axis=1)
        if self.operation == 'concatenate':
            output = self.merge_layer(
                [inputs[f'input{i + 1}'] for i in range(self.num_inputs)], axis=self.merge_dimension
            )
        # nao sei se eh exatamente assim
        elif self.operation == 'subtraction':
            output = inputs['input1']
            for i in range(2, self.num_inputs+1):
                output = output - inputs[f'input{i}']
        elif self.operation == 'addition':
            output = inputs['input1']
            for i in range(2, self.num_inputs+1):
                output = output + inputs[f'input{i}']
        elif self.operation == 'multiplication':
            output = inputs['input1']
            for i in range(2, self.num_inputs + 1):
                output = output * inputs[f'input{i}']
        elif self.operation == 'division':
            output = inputs['input1']
            for i in range(2, self.num_inputs + 1):
                output = output / inputs[f'input{i}']

        return output

    def get_config(self):
        config = super(MergeNodeLayer, self).get_config()
        return config


class ArgmaxNodeLayer(tf.keras.layers.Layer):
    def __init__(self, data):
        self.dimension = data['dimension']

    def build(self, input_shape):
        pass

    def call(self, inputs):
        output = tf.math.argmax(inputs, axis=self.dimension)
        return output

    def get_config(self):
        config = super(ArgmaxNodeLayer, self).get_config()
        return config


# Custom Node (in the future maybe)

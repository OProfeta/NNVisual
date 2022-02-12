import tensorflow as tf
import numpy as np
import csv


dataset_location = ""
inputs = []
target = ""


class ReshapeNodeLayer(tf.keras.layers.Layer):

    def __init__(self, target_shape):
        super(ReshapeNodeLayer, self).__init__()
        self.target_shape = target_shape

    def build(self, input_shape):
        self.layer_reshape = tf.keras.layers.Reshape(target_shape=self.target_shape)

    def call(self, inputs):
        output = self.layer_reshape(inputs)

        return output

    def get_config(self):
        config = super(ReshapeNodeLayer, self).get_config()
        return config


class DenseNodeLayer(tf.keras.layers.Layer):

    def __init__(self, units, activation):
        super(DenseNodeLayer, self).__init__()
        self.units = units
        self.activation = activation

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

    def __init__(self, num_inputs, operation):
        super(MergeNodeLayer, self).__init__()
        self.num_inputs = num_inputs
        self.operation = operation

    def build(self):
        pass

    def call(self, inputs):
        # -1 == dimension ?
        output = tf.concat([inputs[f'input{i+1}'] for i in range(self.num_inputs)], -1)

        return output

    def get_config(self):
        config = super(MergeNodeLayer, self).get_config()
        return config


class ConvolutionNodeLayer(tf.keras.layers.Layer):

    def __init__(self,
                 convolution_type,
                 dimension,
                 patch_size,
                 stride,
                 feature_maps,
                 zero_padding,
                 activation_function,
                 dropout,
                 batch_normalization,
                 pooling):
        super(ConvolutionNodeLayer, self).__init__()
        self.convolution_type = convolution_type
        self.dimension = dimension
        self.patch_size = patch_size
        self.stride = stride
        self.feature_maps = feature_maps
        self.zero_padding = zero_padding
        self.activation_function = activation_function
        self.dropout = dropout
        self.batch_normalization = batch_normalization
        self.pooling = pooling

    def build(self):
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

    def call(self):

        return self.conv_layer

    def get_config(self):
        config = super(ConvolutionNodeLayer, self).get_config()
        return config


def separate_nodes_and_edges(elements):
    edges = []
    nodes = []
    for element in elements:
        if "reactflow__edge" in element['id']:
            edges.append(element)
        else:
            nodes.append(element)

    return nodes, edges


def create_model(elements_json):

    # inputs = tf.keras.Input(shape=(28, 28))
    # rn = ReshapeNodeLayer(target_shape=(784, 1, 1))
    # dn = DenseNodeLayer(units=128, activation='relu')
    # dn2 = DenseNodeLayer(units=10, activation='softmax')
    #
    # x = rn(inputs)
    # x = dn(x)
    # outputs = dn2(x)
    # model = tf.keras.Model(inputs=inputs, outputs=outputs, name="modeloProfeta")

    nodes, node_connections = separate_nodes_and_edges(elements_json)

    has_merge_node = False
    for node in nodes:
        if node['type'] == 'mergeNode':
            has_merge_node = True

    # se houver um mergeNode, usar stack para montar o modelo
    if has_merge_node:
        target_node = next(item for item in nodes if item['type'] == 'targetNode')

    # caso contrario, montar normalmente a partir do input
    else:
        pass

    # inputs = tf.keras.Input(shape=(28, 28))
    outputs = None
    nodes_length = len(nodes)
    for index, node in enumerate(nodes):
        if node['type'] == 'reshapeNode':
            shape = (node['data']['X'], node['data']['Y'], node['data']['Z'])
            layer = ReshapeNodeLayer(target_shape=shape)
        elif node['type'] == 'denseNode':
            neurons = node['data']['neurons']
            activation_function = node['data']['activationFunction']
            layer = DenseNodeLayer(units=neurons, activation=activation_function)
        elif node['type'] == 'convolutionNode':
            convolution_type = node['data']['convolutionType']
            dimension = node['data']['dimension']
            patch = node['data']['patch']
            stride = node['data']['stride']
            feature = node['data']['feature']
            zero_padding = node['data']['zeroPadding']
            activation_function = node['data']['activationFunction']
            dropout = node['data']['dropOut']
            batch_normalization = node['data']['batchNormalization']
            pooling = node['data']['pooling']
            layer = ConvolutionNodeLayer(
                convolution_type=convolution_type,
                dimension=dimension,
                patch_size=patch,
                stride=stride,
                feature_maps=feature,
                zero_padding=zero_padding,
                activation_function=activation_function,
                dropout=dropout,
                batch_normalization=batch_normalization,
                pooling=pooling
            )
        elif node['type'] == 'mergeNode':
            number_of_inputs = node['data']['inputs']
            operation = node['data']['operation']
            layer = MergeNodeLayer(num_inputs=number_of_inputs, operation=operation)
        if index == 0:
            x = layer(inputs)
        elif index == nodes_length - 1:
            outputs = layer(x)
        else:
            x = layer(x)

    model = tf.keras.Model(inputs=inputs, outputs=outputs, name="modeloProfeta")
    model.summary()

    x_train, y_train, x_test, y_test = load_mnist()
    x_train, x_test = x_train / 255.0, x_test / 255.0

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=5)

    model.evaluate(x_test, y_test, verbose=2)


def load_dataset(dataset_loc):

    with open(dataset_loc, newline='') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        header = csv_reader.__next__()
        inputs = header[0:-1]
        target = header[-1]

    return inputs, target


def load_mnist():
    f = open("G:\\ProjetoTCCDatasets\\train-images.idx3-ubyte", "rb")
    f.read(16)
    num_images = 60_000
    image_size = 28
    buf = f.read(image_size * image_size * num_images)
    x_train = np.frombuffer(buf, dtype=np.uint8).astype(np.float32)
    x_train = x_train.reshape(num_images, image_size, image_size, 1)

    f = open("G:\\ProjetoTCCDatasets\\train-labels.idx1-ubyte", "rb")
    f.read(8)
    buf = f.read(num_images)
    y_train = np.frombuffer(buf, dtype=np.uint8).astype(np.int64)

    f = open("G:\\ProjetoTCCDatasets\\t10k-images.idx3-ubyte", "rb")
    f.read(16)
    num_images_test = 10_000
    image_size_test = 28
    buf = f.read(image_size_test * image_size_test * num_images_test)
    x_test = np.frombuffer(buf, dtype=np.uint8).astype(np.float32)
    x_test = x_test.reshape(num_images_test, image_size_test, image_size_test, 1)

    f = open("G:\\ProjetoTCCDatasets\\t10k-labels.idx1-ubyte", "rb")
    f.read(8)
    buf = f.read(num_images_test)
    y_test = np.frombuffer(buf, dtype=np.uint8).astype(np.int64)

    return x_train, y_train, x_test, y_test


def teste():
    x_train, y_train, x_test, y_test = load_mnist()

    x_train, x_test = x_train / 255.0, x_test / 255.0

    # cada camada DENSE precisa de uma camada FLATTEN antes,
    # pra ter certeza que o input shape vai entrar e sair corretamente

    model = tf.keras.models.Sequential([
        tf.keras.layers.Reshape(target_shape=(784, 1, 1), input_shape=(28, 28)),
        tf.keras.layers.Flatten(input_shape=(784, 1, 1)),
        tf.keras.layers.Dense(128, activation='relu'),
        # Sem dropout por enquanto?
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Flatten(input_shape=(128,)),
        tf.keras.layers.Dense(10, activation='softmax')
    ])

    # tentativas anteriores pra me lembrar de meus fracassos
    # model = tf.keras.models.Sequential([
    #     # tf.keras.layers.Flatten(input_shape=(28, 28)),
    #     tf.keras.layers.Reshape(target_shape=(784, 1, 1), input_shape=(28, 28)),
    #     tf.keras.layers.Dense(128, activation='relu'),
    #     tf.keras.layers.Dropout(0.2),
    #     tf.keras.layers.Dense(10, activation='softmax')
    # ])

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=5)

    model.evaluate(x_test, y_test, verbose=2)


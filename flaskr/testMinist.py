import tensorflow as tf
import numpy as np
import csv

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


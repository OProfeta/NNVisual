import numpy as np
import tensorflow as tf
import pandas as pd
import os


class CustomGenerator(tf.keras.utils.Sequence):

    def __init__(self, dataset_location: str, dataframe: pd.DataFrame, ordered_inputs: list, target: str, batch_size: int = 32):
        """
        Initializes a generator from the given dataframe.

        :param dataset_location: a string with the absolute path of the csv file
        :param dataframe: dataframe created from a csv file with pandas.read_csv()
        :param ordered_inputs: a list of names of inputs from the model, ordered so that each batch input goes into the right named model input
        :param target: a string stating the layer name of the output. in future updates it may function similar to the ordered_inputs, if multiple outputs are implemented
        :param batch_size: the number of elements that will be returned in a batch
        """
        self.dataset_location = dataset_location
        self.dataframe = dataframe.copy()
        self.ordered_inputs = ordered_inputs
        self.target = target
        self.batch_size = batch_size

        self.dataframe_length = len(dataframe)

    def __image_from_path(self, relative_path):
        absolute_path = os.path.join(self.dataset_location, '..', relative_path)
        image = tf.io.read_file(absolute_path)
        image = tf.image.decode_image(image, expand_animations=False)
        return tf.cast(image, tf.float32) / 255.0

    def __get_data(self, batches):

        X = []
        y = None

        # ensures that the inputs are in order inside the tuple for the model
        for inp in self.ordered_inputs:
            if pd.api.types.is_numeric_dtype(batches[inp]):
                X.append(batches[inp].to_numpy())
            else:
                # if the content of the column is not a numeric type, then its a string
                # and for now, string means a relative path to an image
                X.append(np.asarray([self.__image_from_path(path) for path in batches[inp]]))

        y = batches[self.target].to_numpy()

        return tuple(X), y

    def __getitem__(self, index):

        batches = self.dataframe[index * self.batch_size:(index + 1) * self.batch_size]
        X, y = self.__get_data(batches)

        # print("y = ", y)
        return X, y

    def __len__(self):
        return self.dataframe_length // self.batch_size

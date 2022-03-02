import json
import networkx as nx
import pandas as pd
import os
import tensorflow as tf
import numpy as np
import csv

import tensorflow.python.framework.ops

from layerWrappers import *
from testMinist import *
from CustomGenerator import CustomGenerator


dataset_location = ""
inputs = []
name_inputs = []
index = 0
target = ""
layers_criadas = dict()
dataset_dataframe = pd.DataFrame()
df_train = pd.DataFrame()
df_test = pd.DataFrame()


def create_graph(elements_json: str) -> nx.DiGraph:
    def separate_nodes_and_edges(elements: list[dict]) -> (list[str], list[str]):
        _edges = []
        _nodes = []
        for element in elements:
            if "reactflow__edge" in element["id"]:
                _edges.append(element)
            else:
                _nodes.append(element)
        return _nodes, _edges

    nodes, edges = separate_nodes_and_edges(elements_json)
    print([(int(e["source"]), int(e["target"])) for e in edges])
    graph = nx.DiGraph()
    graph.add_nodes_from([(int(n["id"]), {"type": n["type"], "data": n["data"]}) for n in nodes])
    graph.add_edges_from([(int(e["source"]), int(e["target"])) for e in edges])
    return graph


"""
Checar se já criou a camada antes de criar de novo
Porque se tiver dois inputs a rede vai ser duplicada
"""
def apply_on_nodes_recursive(graph: nx.DiGraph, node_id):
    if node_id in layers_criadas:
        return layers_criadas[node_id]

    print(f'ID: {graph.nodes[node_id]["data"]["id"]} \t Type: {graph.nodes[node_id]["type"]}')
    layer = create_layer(graph.nodes[node_id])
    antecessores = list()
    for antecessor in graph.predecessors(node_id):
        antecessores.append(apply_on_nodes_recursive(graph, antecessor))

    qntd_predecessors = len(list(graph.predecessors(node_id)))
    if qntd_predecessors > 1:
        """Aqui é onde fica o concatenate"""
        # mudar pra nossa própria camada (MergeNodeLayer)
        # pq pode ter outras operacoes (concatenacao, adicao, multiplicacao, divisao, subtracao)
        layer = tf.keras.layers.concatenate(antecessores)
    elif qntd_predecessors == 0:
        global index
        """Aqui é o input"""
        # O None significa que o shape do input nao é conhecido no momento da criacao da camada
        # O shape PRECISA ser definido no momento de criacao da camada input
        inputs.append(layer)
        name_inputs.append(f"input{index}")
        index = index + 1
    else:
        """Aqui é o resto"""
        if layer is None:
            """
            layer == None quer dizer que chegamos no target
            nao ha camada a ser adicionada no modelo
            renomeia a camada 
            """
            antecessores[0]._name = target
            return antecessores[0]
        print(f"layer = {layer}")
        print(f"antecessores[0] = {antecessores[0]}")
        layer = layer(antecessores[0])
    layers_criadas[node_id] = layer
    return layer


def create_layer(node: dict):
    """
    Mudar essa função pra não ter que pegar todos os valores na mão, mas sim só passar o dict pro init da classe
    (ou algo mais bonitinho/modular assim)
    """
    global dataset_dataframe
    if node['type'] == 'inputNode':
        # se o tipo de dado na coluna for object, entao sera um caminho para imagem
        data_type = dataset_dataframe[node['data']['name']].dtype
        if data_type == 'object':
            # se for um caminho para imagem, o shape da primeira imagem sera pego e usado para as outras imagens
            path_to_image = os.path.join(dataset_location, '..', dataset_dataframe[node['data']['name']][0])
            image = tf.io.read_file(path_to_image)
            image = tf.image.decode_image(image, expand_animations=False)
            layer = tf.keras.Input(shape=image.shape, name=node['data']['name'])
        else:
            # se nao for imagem
            layer = tf.keras.Input(shape=(1,), name=node['data']['name'])
    elif node['type'] == 'reshapeNode':
        layer = ReshapeNodeLayer(data=node['data'])
    elif node['type'] == 'denseNode':
        layer = DenseNodeLayer(data=node['data'])
    elif node['type'] == 'convolutionNode':
        layer = ConvolutionNodeLayer(data=node['data'])
    elif node['type'] == 'mergeNode':
        layer = MergeNodeLayer(data=node['data'])
    elif node['type'] == 'targetNode':
        layer = None
    else:
        raise "deu ruim em create_layer"
    return layer


def create_model(elements: str):
    graph = create_graph(elements)
    # graph.degree(x[0]) certifica de que o nodo esta conectado no grafo
    final_nodes = (x for x in graph.out_degree if x[1] == 0 and graph.degree(x[0]) != 0)
    for final_id, _ in final_nodes:
        output = apply_on_nodes_recursive(graph, final_id)

    model = tf.keras.Model(inputs=inputs, outputs=output, name="modeloProfeta")
    model.summary()

    model.compile(optimizer='adam',
                  # loss='sparse_categorical_crossentropy',
                  loss='mean_absolute_error',
                  # metrics=['accuracy']
                  metrics=['mse']
                  )

    custom_train_generator = CustomGenerator(dataset_location,
                                             df_train,
                                             [camada.name for camada in model.inputs],
                                             model.outputs[0].name
                                             )

    custom_test_generator = CustomGenerator(dataset_location,
                                            df_test,
                                            [camada.name for camada in model.inputs],
                                            model.outputs[0].name
                                            )
    model.fit(x=custom_train_generator, epochs=5)

    model.evaluate(custom_test_generator, verbose=2)


def image_from_path(path):
    path = path.numpy().decode('utf-8')
    path = os.path.join(dataset_location, '..', path)
    image = tf.io.read_file(path)
    image = tf.image.decode_image(image, expand_animations=False)
    return image


def load_dataset(dataset_loc):
    global dataset_location
    global target
    global df_train
    global df_test
    dataset_location = dataset_loc
    with open(dataset_loc, newline='') as csv_file:
        global dataset_dataframe
        csv_reader = csv.reader(csv_file, delimiter=',')
        header = csv_reader.__next__()
        inputs = header[0:-1]
        target = header[-1]

        # caractere '_' dando problema (provavelmente algo a ver com utf-8) (TEM que ser utf-8)

        dataset_dataframe = pd.read_csv(dataset_loc, sep=',')

        df_train = dataset_dataframe.sample(frac=0.8, random_state=200)
        df_test = dataset_dataframe.drop(df_train.index)

    return inputs, target

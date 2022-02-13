import json
import networkx as nx
import tensorflow as tf
import numpy as np
import csv
from layerWrappers import *
from testMinist import *


dataset_location = ""
inputs = []
target = ""
layers_criadas = dict()


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

    nodes, edges = separate_nodes_and_edges(json.loads(elements_json))
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

    qntd_predecessors = len(graph.predecessors(node_id))
    if qntd_predecessors > 1:
        """Aqui é onde fica o concatenate"""
        # mudar pra nossa própria camada (MergeNodeLayer)
        # pq pode ter outras operacoes (concatenacao, adicao, multiplicacao, divisao, subtracao)
        layer = tf.keras.layers.concatenate(antecessores)
    elif qntd_predecessors == 0:
        """Aqui é o input"""
        # O None significa que o shape do input nao é conhecido no momento da criacao da camada
        inputs.append(tf.keras.layers.Input(None,))
    else:
        """Aqui é o resto"""
        layer = layer(antecessores[0])
    layers_criadas[node_id] = layer
    return layer


"""
Mudar essa função pra não ter que pegar todos os valores na mão, mas sim só passar o dict pro init da classe
(ou algo mais bonitinho/modular assim)
"""
def create_layer(node: dict):
    if node['type'] == 'reshapeNode':
        layer = ReshapeNodeLayer(data=node['data'])
    elif node['type'] == 'denseNode':
        layer = DenseNodeLayer(data=node['data'])
    elif node['type'] == 'convolutionNode':
        layer = ConvolutionNodeLayer(data=node['data'])
    elif node['type'] == 'mergeNode':
        layer = MergeNodeLayer(data=node['data'])
    else: raise("deu ruim")
    return layer


def create_model(elements: str):
    graph = create_graph(elements)
    final_nodes = (x for x in graph.out_degree if x[1] == 0)
    for final_id, _ in final_nodes:
        output = apply_on_nodes_recursive(graph, final_id)

    model = tf.keras.Model(inputs=inputs, outputs=output, name="modeloProfeta")
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

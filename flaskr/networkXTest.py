import networkx as nx
import json


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


def create_node(graph: nx.DiGraph, node_id):
    print(f'ID: {graph.nodes[node_id]["data"]["id"]} \t Type: {graph.nodes[node_id]["type"]}')
    filhos = list()
    for filho in graph.predecessors(node_id):
        filhos.append(create_node(graph, filho))


with open('input.json') as json_file:
    data = json_file.read()

graph = create_graph(data)
print(graph.out_degree(8))
final_nodes = list([x for x in graph.out_degree if x[1] == 0])
for i, _ in final_nodes:
    create_node(graph, i)

#nodes, edges = separate_nodes_and_edges(data)
#
#print("Nó: ", nodes[0])
#print("Edge: ", edges[0])
#
#graph = nx.DiGraph()
#graph.add_nodes_from([(int(n["id"]), {"type": n["type"], "data": n["data"]}) for n in nodes])
#graph.add_edges_from([(int(e["source"]), int(e["target"])) for e in edges])
#print(list(graph.nodes))
#print(list(graph.edges))
#print(graph.in_degree)
#print(graph.out_degree)

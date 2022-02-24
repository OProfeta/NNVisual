import os
import json
import modelBuilder

from flask import Flask
from flask import request


# def create_app(test_config=None):
#     # cria e configura o app
#     app = Flask(__name__, instance_relative_config=True)
#     app.config.from_mapping(
#         SECRET_KEY='dev',
#         DATABASE=os.path.join(app.instance_path, 'flask.sqlite'),
#     )
#
#     if test_config is None:
#         # Carrega a intancia da configuracao, se existir, quando nao testando
#         app.config.from_pyfile('config.py', silent=True)
#     else:
#         # carrega a configuracao teste se passado
#         app.config.from_mapping(test_config)
#
#     # certifica que a pasta da instancia existe
#     try:
#         os.makedirs(app.instance_path)
#     except OSError:
#         pass
#
#     # uma pagina simples que diz Hello, World!
#     @app.route('/hello')
#     def hello():
#         return 'Hello, World!'
#
#     @app.route('/members')
#     def members():
#         return {"members": ["Member1", "Member2", "Member3"]}
#
#     @app.route('/elements', methods=['POST'])
#     def elements():
#         cwd = os.getcwd()
#         print(cwd)
#         elements_json = json.loads(request.data)
#         # modelBuilder.teste()
#         modelBuilder.create_model(elements_json)
#         return 'hm'
#
#     @app.route('/load_dataset', methods=['POST'])
#     def load_dataset():
#         dataset_location = json.loads(request.data)
#         inputs, target = modelBuilder.load_dataset(dataset_location)
#         response = {
#             'inputs': inputs,
#             'target': target
#         }
#         return response
#
#     return app

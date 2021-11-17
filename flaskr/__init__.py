import os

from flask import Flask


def create_app(test_config=None):
    # cria e configura o app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flask.sqlite'),
    )

    if test_config is None:
        # Carrega a intancia da configuracao, se existir, quando nao testando
        app.config.from_pyfile('config.py', silent=True)
    else:
        # carrega a configuracao teste se passado
        app.config.from_mapping(test_config)

    # certifica que a pasta da instancia existe
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # uma pagina simples que diz Hello, World!
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/members')
    def members():
        return {"members": ["Member1", "Member2", "Member3"]}

    return app

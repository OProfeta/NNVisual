import __init__


if __name__ == "__main__":
    app = __init__.create_app()
    app.run(debug=True)
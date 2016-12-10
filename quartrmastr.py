"""QuartrMastr - The Finest Epic Battle Fantasy 4 Equipment Analyzer"""

import flask
import json
import db.loaders as loaders


app = flask.Flask(__name__)
api_root = "localhost:5000/api/v1/"


# Api routes
@app.route('/api/v1/characters/', methods=['GET'])
def get_characters():
    return json.dumps(loaders.load_characters())


@app.route('/api/v1/equips/', methods=['GET'])
def get_equips():
    return json.dumps(loaders.load_equips())


@app.route('/api/v1/materials/', methods=['GET'])
def get_materials():
    return json.dumps(loaders.load_materials())


# App routes
@app.route('/', methods=['GET'])
def index():
    return flask.render_template('index.html')


@app.route('/characters/', methods=['GET'])
def characters_view():
    return flask.render_template('characters.html')


@app.route('/equips/', methods=['GET'])
def equips_view():
    return flask.render_template('equips.html')


@app.route('/materials/', methods=['GET'])
def materials_view():
    return flask.render_template('materials.html')


if __name__ == '__main__':
    app.run(debug=True)

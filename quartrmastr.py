"""QuartrMastr - The Finest Epic Battle Fantasy 4 Equipment Analyzer"""

import flask
import json
from db.loaders import characters, equips, materials


app = flask.Flask(__name__)
api_root = "localhost:5000/api/v1/"


# Api routes
@app.route('/api/v1/characters/', methods=['GET'])
def get_characters():
    return json.dumps(characters.load())


@app.route('/api/v1/equips/', methods=['GET'])
def get_equips():
    return json.dumps(equips.load())


@app.route('/api/v1/materials/', methods=['GET'])
def get_materials():
    return json.dumps(materials.load())


# Image server
@app.route('/images', methods=['GET'])
def get_image():
    image = flask.request.args.get('image')
    if not image:
        return flask.make_response(
            'Request to /images must include image argument', 404)
    if not image[-4:] == '.png':
        return flask.make_response(
            '/images only provides files of type(s): .png', 404)
    return flask.send_from_directory('static/img/', image)


# App routes
@app.route('/', methods=['GET'])
def index():
    # return flask.render_template('index.html')
    return flask.render_template('equips.html')


# @app.route('/characters/', methods=['GET'])
# def characters_view():
#     return flask.render_template('characters.html')


# @app.route('/equips/', methods=['GET'])
# def equips_view():
#     return flask.render_template('equips.html')


# @app.route('/materials/', methods=['GET'])
# def materials_view():
#     return flask.render_template('materials.html')


if __name__ == '__main__':
    app.run(debug=True, threaded=True)

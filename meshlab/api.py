import flask
import os
from flask import request, send_file, make_response, jsonify
from meshlab import Meshlab, delete_output_file, get_output_file_path, get_file_names

app = flask.Flask(__name__)
UPLOAD_FOLDER = 'tmp/uploads'
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/process",  methods=["POST"])
def process():
    mesh = None
    filter = None
    for key in request.files:
        file = request.files[key]
        print(file)
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        filename = file.filename
        path = os.path.join(app.config['UPLOAD_FOLDER'] + "/" + key + "/", filename)
        print(path)
        file.save(path)

        if key == "template":
            filter = path
        else:
            mesh = path

    ml = Meshlab(mesh, filter)
    output_file = ml.process()
    return (output_file, 200)

@app.route("/files/<file_id>", methods=['GET'])
def get_file(file_id):
    return (send_file(get_output_file_path(file_id)), 200)

@app.route("/files/", methods=['GET'])
def get_files():
    return (jsonify(get_file_names()), 200)

@app.route("/files/<file_id>", methods=['DELETE'])
def delete_file(file_id):
    delete_output_file(file_id)
    return ('', 200)


@app.route("/", methods=["GET"])
def home():
    return "<h1>MeshLab Container</h1>"


app.run(port=5000, host="0.0.0.0")

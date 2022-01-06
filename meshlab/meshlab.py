import pymeshlab as ml
import uuid
import os
import pathlib
import datetime
from file import File

file_directory = 'tmp/'

class Meshlab:

    def __init__(self, input, filter):
        self.ms = ml.MeshSet()
        self.ms.load_new_mesh(input)
        self.ms.load_filter_script(filter)
        self.ms.set_versbosity(True)
        self.ms.print_filter_script()

    def process(self):
        self.ms.apply_filter_script()
        file_name = '{0}.stl'.format(str(uuid.uuid4()))
        self.ms.save_current_mesh(file_directory + file_name, binary=False)
        return file_name

def delete_output_file(file_name):
    if os.path.exists(file_directory + file_name):
          os.remove(file_directory + file_name)

def get_output_file_path(file_name):
    return file_directory + file_name

def get_file_names():
    path = file_directory
    files = []
    for filename in os.listdir(path):
        if filename == "uploads":
            continue
        file = type('', (), {})()
        name = filename

        fname = pathlib.Path(path + filename)
        ctime = datetime.datetime.fromtimestamp(fname.stat().st_ctime)
        date = ctime

        files.append(File(name, date).serialize())
    return files

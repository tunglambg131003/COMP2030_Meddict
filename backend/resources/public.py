from flask_restful import Resource
from flask import request, jsonify, send_file
import resources
import glob

class Search(Resource):
    '''
    /search api 
    '''
    def get(self):
        result = []
        word = request.args.get("word")
        lang = request.args.get("lang")

        if word == "" and lang == "":
            return jsonify([])

        pattern = f".*{word}.*"
        query = {f"{lang}": {"$regex": pattern}}

        # do not return idx and _id
        projection = {"_id": 0}
        result = resources.dictionary_collection.find(query, projection)
        return jsonify(list(result))

class GetImage(Resource):
    '''
    /image api
    '''
    def get(self):
        id = request.args.get("id")
        # open image file at "/var/www/images/{id}.*"
        # * is the extension of the image file, send it to frontend
        image_files = glob.glob(f"/var/www/images/{id}.*")

        if image_files:
            return send_file(image_files[0], mimetype='image/jpeg')
        else:
            return jsonify({"error": "image not found"})

class HelloWorld(Resource):
    '''
    / api
    '''
    def get(self):
        return {'hello': 'world'}
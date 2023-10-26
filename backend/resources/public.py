from flask_restful import Resource
from flask import request, jsonify
import resources

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
        projection = {"idx": 0, "_id": 0}
        result = resources.dictionary_collection.find(query, projection)
        return jsonify(list(result))
    

class HelloWorld(Resource):
    '''
    / api
    '''
    def get(self):
        return {'hello': 'world'}
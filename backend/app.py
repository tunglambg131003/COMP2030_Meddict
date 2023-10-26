import os
from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS 
from resources.public import Search, HelloWorld

# Initialize

# Configuration
application = Flask(__name__)
CORS(application)

# Create API
api = Api(application)
api.add_resource(Search, '/search')
api.add_resource(HelloWorld, '/')

if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", False)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)

import os
from flask import Flask
from flask_restful import Api
from pymongo import MongoClient

# Initialize

# Constant
MONGODB_USERNAME = os.environ['MONGODB_USERNAME']
MONGODB_PASSWORD = os.environ['MONGODB_PASSWORD']
MONGODB_HOSTNAME = os.environ['MONGODB_HOSTNAME']
MONGODB_DATABASE = os.environ['MONGODB_DATABASE']
MONGODB_PORT = 27017

# Configuration
application = Flask(__name__)
application.config.from_mapping(
    DATABASE_CONNECTION_URI=f"mongodb://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_HOSTNAME}:{MONGODB_PORT}/{MONGODB_DATABASE}",
)

# Database 
client = MongoClient(application.config['DATABASE_CONNECTION_URI'])
db = client[MONGODB_DATABASE]

# API
# api = Api(application)

if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", False)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)

import os
from pymongo import MongoClient

# debug code. import the env variables from .env file
# from dotenv import load_dotenv

# load_dotenv("/home/bibi/College/COMP2030/COMP2030_Meddict/.env")
# Constant
MONGODB_USERNAME = os.environ['MONGODB_USERNAME']
MONGODB_PASSWORD = os.environ['MONGODB_PASSWORD']
MONGODB_HOSTNAME = os.environ['MONGODB_HOSTNAME']
MONGODB_DATABASE = os.environ['MONGODB_DATABASE']
MONGODB_PORT = 27017


DATABASE_CONNECTION_URI=f"mongodb://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_HOSTNAME}:{MONGODB_PORT}/{MONGODB_DATABASE}"
print(DATABASE_CONNECTION_URI)
# Database 
client = MongoClient(DATABASE_CONNECTION_URI)
db = client[MONGODB_DATABASE]
dictionary_collection = db['dictionary']

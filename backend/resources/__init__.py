import os
import motor.motor_asyncio
from typing import List
 
# debug code. import the env variables from .env file
# from dotenv import load_dotenv

# load_dotenv("/home/bibi/College/COMP2030/test/fastapi_google_sso/.env")
# Constant
MONGODB_USERNAME = os.environ['MONGODB_USERNAME']
MONGODB_PASSWORD = os.environ['MONGODB_PASSWORD']
MONGODB_HOSTNAME = os.environ['MONGODB_HOSTNAME']
MONGODB_DATABASE = os.environ['MONGODB_DATABASE']
MONGODB_PORT = 27017

DATABASE_CONNECTION_URI=f"mongodb://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_HOSTNAME}:{MONGODB_PORT}/{MONGODB_DATABASE}"

# Database 
client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_CONNECTION_URI, uuidRepresentation="standard"
)

db = client[MONGODB_DATABASE]
dictionary_collection = db['dictionary']
suggestions_collection = db['suggestions']
users_collection = db['users']
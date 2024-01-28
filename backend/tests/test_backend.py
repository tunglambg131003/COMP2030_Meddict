# Testing the backend APIs
import pymongo
# load env variables
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv("../.env")

ENVIRONMENT = os.environ['PRODUCTION']
MONGODB_USERNAME = os.environ['MONGODB_USERNAME']
MONGODB_PASSWORD = os.environ['MONGODB_PASSWORD']
MONGODB_HOSTNAME = os.environ['MONGODB_HOSTNAME']
MONGODB_DATABASE = os.environ['MONGODB_DATABASE']
MONGODB_PORT = 27017
DATABASE_CONNECTION_URI=f"mongodb://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_HOSTNAME}:{MONGODB_PORT}/{MONGODB_DATABASE}"

if ENVIRONMENT == "development":
    URI = "http://api.meddict.com"

if ENVIRONMENT == "production":
    URI = "https://api.meddict-vinuni.com"

def test_database_connection():
    client = pymongo.MongoClient(DATABASE_CONNECTION_URI)
    db = client[MONGODB_DATABASE]
    dictionary_collection = db['dictionary']
    suggestions_collection = db['suggestions']
    users_collection = db['users']
    assert dictionary_collection != None
    assert suggestions_collection != None
    assert users_collection != None
    client.close()

def test_search_english_word():
    "GET /words?lang=en&pattern=abdomen"
    # test search word
    en_word = "abdomen"
    url = f"{URI}/words?lang=en&pattern={en_word}"
    response = requests.get(url)
    result = response.json()
    for r in result:
        assert r != None
        # "abdomen" is in the result    
        assert en_word in r['en']

def test_search_vietnamese_word():
    "GET /words?lang=vn&pattern=bụng"
    # test search word
    vn_word = "bụng"
    url = f"{URI}/words?lang=vn&pattern={vn_word}"
    response = requests.get(url)
    result = response.json()
    for r in result:
        assert r != None
        # "bụng" is in the result    
        assert vn_word in r['vn']


def test_search_english_word_with_no_result():
    "GET /words?lang=en&pattern=abdomen123"
    # test search word
    en_word = "abdomen123"
    url = f"{URI}/words?lang=en&pattern={en_word}"
    response = requests.get(url)
    result = response.json()
    assert result == []

def test_search_word_ignore_case():
    "GET /words?lang=en&pattern=Abdomen"
    # test search word
    en_word = "Abdomen"
    url = f"{URI}/words?lang=en&pattern={en_word}"
    response = requests.get(url)
    result = response.json()
    for r in result:
        assert r != None
        # "abdomen" is in the result    
        assert en_word.lower() in r['en']

def test_get_sound():
    "GET /words/sound/en/id; GET /words/sound/vn/id"
    # test search word
    en_word = "abdomen"
    url = f"{URI}/words?lang=en&pattern={en_word}"
    response = requests.get(url)
    result = response.json()
    result_check = result[0]
    id = result_check['id']
    sound_en_url = f"{URI}/words/sound/en/{id}"
    response_sound = requests.get(sound_en_url)
    # check if the response is a sound file
    assert response_sound.headers['Content-Type'] == 'audio/mpeg'
    # check length of the sound file
    assert response_sound.headers['Content-Length'] != None

    sound_vn_url = f"{URI}/words/sound/vn/{id}"
    print(sound_vn_url)
    response_sound = requests.get(sound_vn_url)
    # check if the response is a sound file
    assert response_sound.headers['Content-Type'] == 'audio/mpeg'
    # check length of the sound file
    assert response_sound.headers['Content-Length'] != None


def test_get_illustration():
    "GET /words/illustration/{id}"
    # test search word
    en_word = "abdomen"
    url = f"{URI}/words?lang=en&pattern={en_word}"
    response = requests.get(url)
    result = response.json()
    result_check = result[0]
    id = result_check['id']
    illustration_url = f"{URI}/words/illustration/{id}"
    response_illustration = requests.get(illustration_url)
    # check if the response is a image file
    assert response_illustration.headers['Content-Type'] == 'image/png' or response_illustration.headers['Content-Type'] == 'image/jpeg'

def test_add_suggestion():
    "POST /words/suggestions"
    url = f"{URI}/words/suggestions"
    request_body = {
        "suggestion": "abc1",
        "lang": "vn"
    }
    response = requests.post(url, data=json.dumps(request_body))
    assert response.status_code == 200

def test_get_suggestion_without_creds():
    url = f"{URI}/words/suggestions"
    response = requests.get(url)
    api_key = os.environ["API_KEY"]
    # check if 401 Unauthorized
    response = requests.get(url)
    assert response.status_code == 401

def test_get_suggestion_with_creds():
    "GET /words/suggestions"
    url = f"{URI}/words/suggestions"
    response = requests.get(url)
    api_key = os.environ["API_KEY"]
    # check if 200 OK 
    header = {"Authorization": "Bearer " + api_key}
    response = requests.get(url, headers=header)
    assert response.status_code == 200


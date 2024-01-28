from fastapi import APIRouter, Query, status, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer
import gtts
from os import path, environ
import glob
from bson import ObjectId
from json import loads

from resources import dictionary_collection, users_collection, suggestions_collection
from resources.schema import WordSuggestion, WordList

from resources.utils import if_exists_image, download_image

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def api_key_auth(api_key: str = Depends(oauth2_scheme)):
    if api_key != environ["API_KEY"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid api key")

def schema(id: ObjectId, en: str, vn: str, en_type: str, vn_type: str):
    '''
    Schema for words
    '''
    return {
        "id": str(id),
        "en": en,
        "vn": vn,
        "en_type": en_type,
        "vn_type": vn_type
    }

router = APIRouter()

@router.get("/words", tags=["words"], status_code=200)
async def get_words(lang: str, pattern: str | None = Query(default=None, max_length=100, min_length=1)):
    '''
    /words API, use for searching words from the dictionary. (Frontend)
    This API will not return queries that have null values.
    '''
    pattern = pattern.replace("(", "\(")
    pattern = pattern.replace(")", "\)")
    if lang != "en" and lang != "vn":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="lang must be either 'en' or 'vn'") 
    results = []
    pat = f".*{pattern}.*"
    # entries = resources.dictionary_collection.find(query, limit=10).sort([(f"{lang}", 1)])
    # replace _id -> id for frontend
    entries = dictionary_collection.aggregate([
        {"$match": {f"{lang}": {"$regex": pat, "$options": "i"}}},
        {"$project": {"_id": 0, "id": "$_id", "en": 1, "vn": 1, "en_type": 1, "vn_type": 1}},
        {"$sort": {f"{lang}": 1}},
        {"$limit": 10}
    ])
    entries = await entries.to_list(length=10)
    for entry in entries:
        if lang == "en":
            if entry["vn"] != "":
                results.append(schema(entry["id"], entry["en"], entry["vn"], entry["en_type"], entry["vn_type"]))
        if lang == "vn":
            if entry["en"] != None:
                results.append(schema(entry["id"], entry["en"], entry["vn"], entry["en_type"], entry["vn_type"]))
    return results

@router.get("/words/illustration/{id}", tags=["words"], status_code=200)
async def get_illustration_from_id(id: str):
    '''
    /words/illustraion/{id} API, use for searching illustration from the dictionary. (Frontend)
    ''' 
    try:
        # get the file name at /var/www/images/ which has the pattern {id}.*
        file_name = glob.glob(f"/var/www/images/{id}.*")[0]
        file_response = FileResponse(file_name)
    except: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="image not found")
    return file_response

@router.get("/words/sound/{lang}/{id}", tags=["words"], status_code=200)
async def get_sound_from_id(lang: str, id: str):
    '''
    /words/sound/{lang}/{id} API, use for searching sound from the dictionary. (Frontend)
    ''' 
    if lang != "en" and lang != "vn":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="lang must be either 'en' or 'vn'")
    query = {"_id": ObjectId(id)}
    entries = dictionary_collection.find(query, limit=1)
    entries = await entries.to_list(length=1)
    try:
        entry = entries[0]
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="id not found")
    if lang == "en":
        # check if entry[_id]_en.mp3 exists
        file_path = f"/var/www/sounds/{entry['_id']}_en.mp3"
        if not path.exists(file_path):
            tts = gtts.gTTS(entry["en"], lang="en", slow=True)
            tts.save(file_path)
        file_response = FileResponse(file_path)
    if lang == "vn":
        # check if entry[_id]_vn.mp3 exists
        file_path = f"/var/www/sounds/{entry['_id']}_vn.mp3"
        if not path.exists(file_path):
            tts = gtts.gTTS(entry["vn"], lang="vi", slow=True)
            tts.save(file_path)
        file_response = FileResponse(file_path)
    return file_response

@router.post("/words/suggestions", tags=["words"], status_code=200)
async def add_suggestion(suggestion: WordSuggestion):
    '''
    /words/suggestions API, use for adding suggestion to the dictionary. (Frontend)
    '''
    # check if suggestion is already in the database/suggestions
    query = {"suggestion": suggestion.suggestion}
    entries = suggestions_collection.find(query, limit=1)
    entries = await entries.to_list(length=1)
    if len(entries) != 0:
        raise HTTPException(status_code=status.HTTP_200_OK, detail="suggestion already exists")
    
    query = {f"{suggestion.lang}": suggestion.suggestion}
    entries = dictionary_collection.find(query, limit=1)
    entries = await entries.to_list(length=1)
    if len(entries) != 0:
        raise HTTPException(status_code=status.HTTP_200_OK, detail="suggestion already exists")
    
    # add suggestion to the database/suggestions
    suggestion = loads(suggestion.model_dump_json())
    # print(suggestion)
    suggestions_collection.insert_one(suggestion)
    return {"message": "suggestion added"}

@router.get("/words/suggestions", tags=["words"], status_code=200, dependencies=[Depends(api_key_auth)])
async def get_suggestions():
    '''
    /words/suggestions API, use for getting suggestions from the dictionary. (Backend)
    '''
    results = []
    entries = suggestions_collection.find()
    entries = await entries.to_list(length=None)
    for entry in entries:
        results.append({"suggestion": entry["suggestion"], "lang": entry["lang"]})
    suggestions_collection.delete_many({})
    return results

@router.post("/words/update", tags=["words"], status_code=200, dependencies=[Depends(api_key_auth)])
async def update_words(word_list: WordList):
    '''
    /words/update API, use for updating/adding words to the dictionary. (Backend)
    Please refer the schema at the documentation.
    '''
    entries = word_list.words
    try:
        for entry in entries:
            # update word to the database/dictionary
            query = {"$or": [{"en": entry.en}, {"vn": entry.vn}]}
            entries = dictionary_collection.find(query, limit=1)
            entries = await entries.to_list(length=1)
            _id = ""
            if len(entries) == 0:
                payload = {"en": entry.en, "vn": entry.vn, "en_type": entry.en_type, "vn_type": entry.vn_type}
                resobj = await dictionary_collection.insert_one(payload)
                _id = str(resobj.inserted_id)
                print("inserted", _id)
            else:
                _id = entries[0]["_id"]
                print("found", _id)
                new_values = {"$set": entry.dict()}
                dictionary_collection.update_one(query, new_values, upsert=True)
            if entry.illustration != "":
                await download_image(_id, entry.illustration)
    except:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="invalid request")
    return HTTPException(status_code=status.HTTP_200_OK, detail="words updated")
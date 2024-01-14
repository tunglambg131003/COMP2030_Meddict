from fastapi import APIRouter, Query, status, HTTPException
from fastapi.responses import FileResponse
import glob
import resources
import gtts
from os import path

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
    query = {f"{lang}": {"$regex": pat, "$options": "i"}}
    entries = resources.dictionary_collection.find(query, {"_id": 0})
    for entry in entries:
        if lang == "en":
            if entry["vn"] != None:
                results.append(entry)
        if lang == "vn":
            if entry["en"] != None:
                results.append(entry)
    return results

@router.get("/words/illustration/{id}", tags=["words"], status_code=200)
async def get_illustration_from_id(id: str):
    '''
    /words/illustraion/{id} API, use for searching illustration from the dictionary. (Frontend)
    ''' 
    try:
        # get the file name at /var/www/images/ which has the pattern {id}.*
        file_name = glob.glob(f"/var/www/images/{id}.*")[0]
        print(file_name)
        file_response = FileResponse(file_name)
    except: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="image not found")
    return file_response

@router.get("/words/sound/{lang}/{id}", tags=["words"], status_code=200)
async def get_sound_from_id(lang: str, id: int):
    '''
    /words/sound/{lang}/{id} API, use for searching sound from the dictionary. (Frontend)
    ''' 
    if lang != "en" and lang != "vn":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="lang must be either 'en' or 'vn'")
    query = {"id": id}
    print(query, lang)
    entries = resources.dictionary_collection.find(query, limit=1)
    # for entry in entries: 
    #     print(entry["en"])
    # if entry.itcount() == 0:
    # return {"id": id, "lang": lang}
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
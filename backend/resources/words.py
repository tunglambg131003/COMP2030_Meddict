from fastapi import APIRouter, Query, status, HTTPException
from fastapi.responses import FileResponse
import glob
import resources

router = APIRouter()

@router.get("/words", tags=["words"], status_code=200)
def get_words(lang: str, pattern: str | None = Query(default=None, max_length=50)):
    '''
    /words API, use for searching words from the dictionary. (Frontend)
    This API will not return queries that have null values.
    '''
    if lang != "en" and lang != "vn":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="lang must be either 'en' or 'vn'") 
    results = []
    pat = f".*{pattern}.*"
    query = {f"{lang}": {"$regex": pat}}
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
def get_illustration_from_id(id: str):
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


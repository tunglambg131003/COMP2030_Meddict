from fastapi import APIRouter, status, HTTPException
import resources

router = APIRouter()

@router.get("/pages/{letter}", tags = ["pages"], status_code=200)
def get_pages(letter: str, page: int = 0):
    if len(letter) != 1 or letter not in "ABCDEFGHIJKLMNOPQRSTUVWXYZ": 
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="letter must be a single UPPERCASE character")

    results = []
    pat = f"{letter}.*"
    query = {"en": {"$regex": pat}}
    entries = resources.dictionary_collection.find(query, {"_id": 0})
    for entry in entries: 
        results.append(entry)
    data = {
        "total": len(results),
        "data": results[(page - 1) * 10: page * 10],
    }
    return data
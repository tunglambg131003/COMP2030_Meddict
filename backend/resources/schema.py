from pydantic import BaseModel 

class WordSuggestion(BaseModel):
    suggestion: str
    lang: str

class Word(BaseModel):
    en: str
    vn: str
    en_type: str
    vn_type: str

class WordList(BaseModel):
    words: list[Word]
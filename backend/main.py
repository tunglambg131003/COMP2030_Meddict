from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os 
from resources import words, pages

# switch origin based on environment
if os.environ.get('PRODUCTION') == 'development':
    origins = [
        "http://localhost:3000",
        "http://meddict.com",
        "http://api.meddict.com",
    ]

if os.environ.get('PRODUCTION') == 'production':
    origins = [
        "https://meddict-vinuni.com",
        "https://www.meddict-vinuni.com",
        "https://api.meddict-vinuni.com",
        "https://www.api.meddict-vinuni.com"
    ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(words.router)
app.include_router(pages.router)
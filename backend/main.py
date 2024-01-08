from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from resources import words, pages

origins = [
    "http://localhost:3000",
    "http://meddict.com",
    "https://meddict.com"
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
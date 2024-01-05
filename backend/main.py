from fastapi import FastAPI

from resources import words, pages

app = FastAPI()

app.include_router(words.router)
app.include_router(pages.router)
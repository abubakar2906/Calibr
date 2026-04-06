from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resumes, cover_letters
import os

app = FastAPI()

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resumes.router, prefix="/resumes")
app.include_router(cover_letters.router, prefix="/cover-letters")

@app.get("/")
def root():
    return { "message": "Calibr API running" }

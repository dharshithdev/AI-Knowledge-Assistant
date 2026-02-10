# main.py
from fastapi import FastAPI
from pydantic import BaseModel
import os
from query import ask_ai 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-knowledge-assistant-nine.vercel.app", 
        "http://localhost:5173"                          
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel): 
    question: str

@app.post("/ask")
async def chat_endpoint(request: ChatRequest):
    answer = ask_ai(request.question) 
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
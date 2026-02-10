# main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import os
import shutil
from query import ask_ai 
from ingest import run_ingestion;
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
@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        num_chunks = run_ingestion(temp_path)

        return {"message": f"Successfully trained on {file.filename} ({num_chunks} chunks)."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.post("/ask")
async def chat_endpoint(request: ChatRequest):
    answer = ask_ai(request.question) 
    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
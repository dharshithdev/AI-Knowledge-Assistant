import os
import re
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient


def run_ingestion(filePath):
    load_dotenv()
    loader = PyPDFLoader(filePath)
    raw_docs = loader.load()

    full_text_sample = ""
    for doc in raw_docs:
        # Removes spaces between single letters but keeps spaces between words
        cleaned = re.sub(r'(?<=[a-zA-Z]) (?=[a-zA-Z])', '', doc.page_content)
        cleaned = re.sub(r'\s+', ' ', cleaned)
        doc.page_content = cleaned.strip()
        full_text_sample += doc.page_content + " "


    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = text_splitter.split_documents(raw_docs)

    client = MongoClient(os.getenv("MONGODB_URI"))
    collection = client[os.getenv("DB_NAME")]["pdf_chunks"]
    
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_version="v1",
        output_dimensionality=768 
    )

    print(f"📤 Uploading {len(chunks)} cleaned chunks to MongoDB...")
    MongoDBAtlasVectorSearch.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection=collection,
        index_name="vector_index"
    )

    return len(chunks)
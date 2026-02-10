import os
from pymongo import MongoClient
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_groq import ChatGroq  # New Import
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

def ask_ai(question):
    # 1. Setup MongoDB Client (Bypassing SSL for local dev)
    try:
        client = MongoClient(
            os.getenv("MONGODB_URI"), 
            serverSelectionTimeoutMS=5000,
            tls=True,
            tlsAllowInvalidCertificates=True 
        )
        db = client[os.getenv("DB_NAME")]
        collection = db["pdf_chunks"]
        client.admin.command('ping')
    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        return

    # 2. Setup Librarian (Google Embeddings) - Must match ingest.py
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        output_dimensionality=768
    )
    
    # 3. Setup Vector Store
    vector_store = MongoDBAtlasVectorSearch(
        collection=collection, 
        embedding=embeddings, 
        index_name="vector_index"
    )
    retriever = vector_store.as_retriever(search_kwargs={"k": 3})

    # 4. Setup Scholar (Groq Llama 3.3)
    llm = ChatGroq(
        model_name="llama-3.3-70b-versatile", 
        groq_api_key=os.getenv("GROQ_API_KEY"),
        temperature=0.1
    )

    # 5. Build the RAG Chain
    template = """Use the following context to answer the question.
    Context: {context}
    
    Question: {question}
    
    Answer:"""
    
    prompt = ChatPromptTemplate.from_template(template)

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    print("\n🤖 AI Assistant (Powered by Groq) is thinking...")
    try:
        response = chain.invoke(question)
        return response;
    except Exception as e:
        return(f"Error : {str(e)}");

if __name__ == "__main__":
    query = input("What would you like to know from the PDF? ")
    if query.strip():
        ask_ai(query)
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DB_NAME")]
collection = db["pdf_chunks"]

result = collection.delete_many({})
print(f"🗑️ Deleted {result.deleted_count} old vectors. Database is now clean.")
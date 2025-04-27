from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.environ.get("MONGO_URI", "mongodb://localhost:27017"))
db = client["lost_and_found_db"]
collection = db["lost_found_items"]

def save_to_db(doc):
    return collection.insert_one(doc)

def fetch_unmatched_items():
    return list(collection.find({"found": False}))

def mark_item_as_found(item_id):
    return collection.update_one({"_id": ObjectId(item_id)}, {"$set": {"found": True}})
def get_item_by_id(post_id):
    try:
        return collection.find_one({"_id": ObjectId(post_id)})
    except:
        return None
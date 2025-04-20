from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
import os

model = SentenceTransformer('all-MiniLM-L6-v2')

def load_data():
    with open('data/locations.json') as f1, open('data/procedures.json') as f2:
        locations = json.load(f1)
        procedures = json.load(f2)
    return locations + procedures

def create_index(data):
    texts = [item['description'] for item in data]
    embeddings = model.encode(texts)
    index = faiss.IndexFlatL2(384)
    index.add(np.array(embeddings, dtype='float32'))
    return index, texts

def save_index(index):
    faiss.write_index(index, 'embeddings/faiss_index.bin')

def load_index():
    return faiss.read_index('embeddings/faiss_index.bin')

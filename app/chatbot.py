import ollama
from sentence_transformers import SentenceTransformer
import numpy as np
import json
from app.vector_store import load_index, load_data

model = SentenceTransformer('all-MiniLM-L6-v2')
data = load_data()
texts = [item['description'] for item in data]
index = load_index()

def get_top_context(query, k=2):
    query_vec = model.encode([query])
    D, I = index.search(np.array(query_vec, dtype='float32'), k)
    return [texts[i] for i in I[0]]
def ask_bot(query): 
    context = get_top_context(query)

    prompt = f"""
    You are a Smart Campus Assistant. 

    --- CONTEXT START ---
    {context}
    --- CONTEXT END ---

    Question: {query}
    Answer:
    """

    response = ollama.chat(
        model='llama2-uncensored',
        messages=[{"role": "user", "content": prompt}]
    )

    return response['message']['content']


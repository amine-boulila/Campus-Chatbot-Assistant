# Temporary script to build FAISS index
from vector_store import load_data, create_index, save_index

data = load_data()
index, _ = create_index(data)
save_index(index)
print("Index built and saved!")

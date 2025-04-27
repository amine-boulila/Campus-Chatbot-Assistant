import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def find_best_matches(query_embedding, items, top_k=5):
    # Edge case: No candidates
    if not items:
        return []

    # Extract all item embeddings
    embeddings = [item.get("clip_embedding") for item in items if item.get("clip_embedding")]

    # Edge case: No valid embeddings
    if not embeddings:
        return []

    # Convert to NumPy array with proper shape
    embeddings = np.array(embeddings)

    # Make sure query embedding is also 2D
    query_embedding = np.array(query_embedding).reshape(1, -1)

    # Compute cosine similarity
    similarities = cosine_similarity(query_embedding, embeddings)[0]

    # Match scores with items
    scored_items = [
        {
            "_id": str(item["_id"]),
            "description": item["description"],
            "image_url": item["image_url"],
            "similarity": float(score),
            "email":item["email"],
            "phone":item["phone"]
        }
        for item, score in zip(items, similarities)
    ]

    # Sort by similarity score
    scored_items.sort(key=lambda x: x["similarity"], reverse=True)
    return scored_items[:top_k]

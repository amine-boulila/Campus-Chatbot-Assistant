import torch
import clip
from PIL import Image
import numpy as np

model, preprocess = clip.load("ViT-B/32", device="cuda" if torch.cuda.is_available() else "cpu")

def get_clip_embedding(text, image_file):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    image = Image.open(image_file).convert("RGB")
    image_input = preprocess(image).unsqueeze(0).to(device)
    text_input = clip.tokenize([text]).to(device)

    with torch.no_grad():
        image_features = model.encode_image(image_input)
        text_features = model.encode_text(text_input)

    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)

    combined = (image_features + text_features) / 2
    return combined.squeeze().cpu().numpy()
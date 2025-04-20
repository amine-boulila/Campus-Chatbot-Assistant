# 🤖 ChatBot API with Python & FastAPI

Welcome to our **ChatBot API** project!  
This lightweight, high-performance chatbot is built using **Python** and **FastAPI**, designed for real-time interaction and easy deployment.

---

## 🚀 Features

- ⚡ Fast and asynchronous API using FastAPI
- 💬 Simple endpoint for sending/receiving chat messages
- 🧠 Easy integration with AI/ML models or external services
- 📦 Modular structure for scalability and future extensions
- 🧪 Includes basic testing and error handling

---

## 🛠️ Tech Stack

- **Python 3.9+**
- **FastAPI**
- **Uvicorn** (ASGI server)
- **Pydantic** (data validation)
- **Optional**: OpenAI / HuggingFace integrations for smart responses

---
## 🚦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/chatbot-api.git
cd chatbot-api

pip install SentenceTransformer fastapi numpy  faiss CORSMiddleware pydantic ollama

Run server
uvicorn app.main:app --reload



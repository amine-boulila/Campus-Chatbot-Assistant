🎒 Lost & Found Backend API (FastAPI)

This is the backend API for the **Lost & Found** system — a web platform that helps users report, search, and claim lost items. Built with **Python** and **FastAPI**, it's designed to integrate seamlessly with a **Next.js frontend**.

---

## 🚀 Features

- 🔍 Submit and search for lost or found items
- 📸 Support for item details like name, description, location, and images
- 🔐 User authentication support (JWT-ready)
- ⚡ Fast and scalable with FastAPI + Uvicorn
- 🧪 Includes testing framework

---

## 🛠️ Tech Stack

- **Python 3.9+**
- **FastAPI** – API framework
- **Uvicorn** – ASGI server
- **Pydantic** – Data validation
- **SQLAlchemy / Tortoise ORM** – (Optional) database layer
- **SQLite / PostgreSQL** – database options
- **CORS enabled** – for Next.js frontend communication


## 🚦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/lost-found-api.git
cd lost-found-api

Install dependencies
pip install -r requirements.txt

Run server
python app.py

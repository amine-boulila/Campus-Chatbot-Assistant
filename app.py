from flask import Flask, request, jsonify
from models.clip_model import get_clip_embedding
from database.mongo import save_to_db, fetch_unmatched_items, mark_item_as_found
from matcher.matcher import find_best_matches
from utils.image_upload import save_image_local
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from database.mongo import get_item_by_id
from flask_cors import CORS  # <-- add this


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

@app.route("/submit", methods=["POST"])
def submit_item():
    desc = request.form.get("description")
    email = request.form.get("email")
    phone = request.form.get("phone")
    image = request.files.get("image")

    image_url = save_image_local(image)
    embedding = get_clip_embedding(desc, image)

    doc = {
        "description": desc,
        "email": email,
        "phone": phone,
        "image_url": image_url,
        "clip_embedding": embedding.tolist(),
        "timestamp": datetime.utcnow(),
        "found": False
    }
    save_to_db(doc)
    return jsonify({"message": "Item saved"})

@app.route("/match", methods=["POST"])
def match_item():
    desc = request.form.get("description")
    image = request.files.get("image")
    embedding = get_clip_embedding(desc, image)
    candidates = fetch_unmatched_items()
    matches = find_best_matches(embedding, candidates)

    # Optional: automatically mark top match as found
    if matches:
        top_match = matches[0]
        return jsonify(top_match)
    return "no match"
    


@app.route("/notify/<post_id>", methods=["POST"])
def notify_user(post_id):
    item = get_item_by_id(post_id)
    if not item or "email" not in item:
        return jsonify({"error": "Email not found"}), 404

    subject = "We found a match for your lost/found item!"
    body = f"Hello,\n\nWe matched your post: '{item['description']}'.\n\nCheck the platform for more details.\n\nThanks!"

    try:
        send_email(item["email"], subject, body)
        return jsonify({"message": "Email sent"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def send_email(to_email, subject, body):
    # Use your email provider settings here
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "mohamedtest749@gmail.com"
    sender_password = "random65432189"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())
@app.route("/item/<post_id>", methods=["GET"])
def get_item(post_id):
    item = get_item_by_id(post_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    # Convert ObjectId to string for JSON serialization
    item["_id"] = str(item["_id"])
    return jsonify(item)

if __name__ == "__main__":
    app.run(debug=True)
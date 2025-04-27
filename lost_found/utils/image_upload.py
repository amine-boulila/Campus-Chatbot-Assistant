import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def save_image_local(image):
    filename = secure_filename(image.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(path)
    return f"/{path}"

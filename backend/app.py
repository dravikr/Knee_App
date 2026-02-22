from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
from io import BytesIO
import base64
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

model = YOLO("models/best.pt")

@app.route("/")
def home():
    return "Knee OA Detection API Running"

@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = Image.open(request.files["image"]).convert("RGB")
    results = model.predict(image, verbose=False)

    annotated = results[0].plot()
    annotated_pil = Image.fromarray(annotated[..., ::-1])

    buffer = BytesIO()
    annotated_pil.save(buffer, format="PNG")
    img_b64 = base64.b64encode(buffer.getvalue()).decode()

    detections = []
    for box in results[0].boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = box
        detections.append({
            "class": model.names[int(cls)],
            "confidence": float(conf),
            "bbox": [x1, y1, x2, y2]
        })

    return jsonify({
        "image": f"data:image/png;base64,{img_b64}",
        "detections": detections
    })

if __name__ == "__main__":
    app.run(debug=True)

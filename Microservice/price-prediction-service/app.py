from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained models and encoders using joblib
flight_model = joblib.load("flight_model.pkl")
hotel_model = joblib.load("hotel_model.pkl")
le_from = joblib.load("le_from.pkl")
le_to = joblib.load("le_to.pkl")
le_location = joblib.load("le_location.pkl")

def safe_encode(label, encoder, field):
    if label not in encoder.classes_:
        raise ValueError(f"Unknown {field}: {label}")
    return encoder.transform([label])[0]

@app.route("/predict/flight", methods=["POST"])
def predict_flight():
    try:
        d = request.json
        f = safe_encode(d["from"], le_from, "from")
        t = safe_encode(d["to"], le_to, "to")
        days = int(d.get("days_to_dep", 7))
        X = np.array([[f, t, days]])
        price = flight_model.predict(X)[0]
        return jsonify({"price": round(float(price), 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/predict/hotel", methods=["POST"])
def predict_hotel():
    try:
        d = request.json
        loc = safe_encode(d["location"], le_location, "location")
        nights = int(d.get("nights", 2))
        X = np.array([[loc, nights]])
        price = hotel_model.predict(X)[0]
        return jsonify({"price": round(float(price), 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("✅ Price Prediction Service running on port 8003")
    app.run(host="0.0.0.0", port=8003)

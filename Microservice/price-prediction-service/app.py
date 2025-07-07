from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained models and encoders
flight_model = pickle.load(open("flight_model.pkl", "rb"))
hotel_model = pickle.load(open("hotel_model.pkl", "rb"))
le_from = pickle.load(open("le_from.pkl", "rb"))
le_to = pickle.load(open("le_to.pkl", "rb"))
le_location = pickle.load(open("le_location.pkl", "rb"))

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
    print("Price Prediction Service running on port 8003")
    app.run(host="0.0.0.0", port=8003)
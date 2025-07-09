from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import numpy as np
import joblib

# Sample data
locations = ["Delhi", "Mumbai", "Goa", "Bangalore", "Chennai", "Hyderabad", "Lucknow", "Kolkata", "Pune"]
nights = [2, 4, 3, 5, 1, 6, 4, 3, 2]
prices = [2000, 1800, 2320, 950, 1160, 1900, 1600, 1700, 1550]

# Label Encoding
le_location = LabelEncoder()
loc_encoded = le_location.fit_transform(locations)

# Prepare features and target
X = np.array(list(zip(loc_encoded, nights)))
y = np.array(prices)

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model and encoder using joblib
joblib.dump(model, "hotel_model.pkl")
joblib.dump(le_location, "le_location.pkl")

print("✅ Hotel model trained and saved with joblib.")

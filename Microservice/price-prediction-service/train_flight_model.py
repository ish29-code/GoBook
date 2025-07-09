from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import numpy as np
import joblib

froms = ["Delhi", "Mumbai", "Pune", "Kolkata", "Goa", "Hyderabad", "Lucknow", "Chennai", "Ahmedabad"]
tos   = ["Goa", "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Lucknow", "Kolkata", "Pune"]
days  = [3, 5, 7, 2, 10, 6, 4, 8, 9]
prices = [1200, 1300, 1150, 1420, 1255, 1600, 1580, 1500, 1480]

le_from = LabelEncoder()
le_to = LabelEncoder()
from_encoded = le_from.fit_transform(froms)
to_encoded = le_to.fit_transform(tos)

X = np.array(list(zip(from_encoded, to_encoded, days)))
y = np.array(prices)

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "flight_model.pkl")
joblib.dump(le_from, "le_from.pkl")
joblib.dump(le_to, "le_to.pkl")

print("✅ Flight model trained and saved with joblib.")

import pickle
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import numpy as np

locations = ["Delhi", "Mumbai", "Goa", "Bangalore", "Chennai", "Hyderabad", "Lucknow", "Kolkata", "Pune"]
nights = [2, 4, 3, 5, 1, 6, 4, 3, 2]
prices = [2000, 1800, 2320, 950, 1160, 1900, 1600, 1700, 1550]

le_location = LabelEncoder()
loc_encoded = le_location.fit_transform(locations)

X = np.array(list(zip(loc_encoded, nights)))
y = np.array(prices)

model = LinearRegression()
model.fit(X, y)

pickle.dump(model, open("hotel_model.pkl", "wb"))
pickle.dump(le_location, open("le_location.pkl", "wb"))

print("Hotel model trained and saved.")
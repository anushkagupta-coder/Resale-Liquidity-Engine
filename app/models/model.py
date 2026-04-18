import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

# Train model once
def train_model():
    # Dummy realistic dataset (you can expand later)
    data = pd.DataFrame({
        "size": [800, 900, 1000, 1100, 1200, 1300],
        "age": [1, 3, 5, 7, 10, 12],
        "location_score": [70, 65, 60, 75, 80, 55],
        "price": [6000000, 6500000, 8000000, 8500000, 9500000, 7000000]
    })

    X = data[["size", "age", "location_score"]]
    y = data["price"]

    model = LinearRegression()
    model.fit(X, y)

    return model


# Load model once (global)
model = train_model()


def predict_price(size, age, location_score):
    prediction = model.predict([[size, age, location_score]])
    return int(prediction[0])
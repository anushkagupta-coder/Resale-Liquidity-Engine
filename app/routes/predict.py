from fastapi import APIRouter
from app.services.location_service import get_location_features
from app.services.scoring_service import calculate_scores
from app.models.model import predict_price

router = APIRouter()

@router.post("/predict")
def predict(data: dict):

    size = data["size"]
    age = data["age"]

    # STEP 1: Location Features
    location_features = get_location_features(data["address"])
    location_score = location_features["location_score"]

    # STEP 2: ML Prediction 🔥
    predicted_price = predict_price(size, age, location_score)

    # STEP 3: Score System (existing logic)
    result = calculate_scores(data, location_features)

    # STEP 4: Replace price with ML output
    result["market_value_range"] = [
        int(predicted_price * 0.9),
        int(predicted_price * 1.1)
    ]

    result["distress_value_range"] = [
        int(predicted_price * 0.8),
        int(predicted_price * 0.95)
    ]

    # STEP 5: Add ML info (important for judges)
    result["model_used"] = "Linear Regression"
    result["predicted_price"] = predicted_price
    result["lat"] = location_features["lat"]
    result["lon"] = location_features["lon"]

    return result
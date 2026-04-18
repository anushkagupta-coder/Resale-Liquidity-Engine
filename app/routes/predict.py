from fastapi import APIRouter
from app.services.location_service import get_location_features
from app.services.scoring_service import calculate_scores

router = APIRouter()

@router.post("/predict")
def predict(data: dict):
    
    # Step 1: Location features
    location_features = get_location_features(data["address"])
    
    # Step 2: Score calculation
    result = calculate_scores(data, location_features)
    
    return result
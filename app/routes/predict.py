from fastapi import APIRouter
from app.services.location_service import get_location_features
from app.services.scoring_service import calculate_scores
from app.services.ai_service import get_ai_valuation_update

router = APIRouter()

@router.post("/predict")
async def predict_liquidity(data: dict):
    # 1. Get Location Context (Still useful for providing coordinates and context to AI)
    address = data.get("address", "")
    loc = get_location_features(address)
    
    # 2. Get Data-Driven Base (As a reference for the AI)
    historical_scores = calculate_scores(data, loc)
    historical_rate = historical_scores['valuation_details']['rate_per_sqft']
    
    # Context about nearby amenities to help the AI
    neighborhood_context = f"{loc['neighborhood_tier']} area with {loc['schools']} schools, {loc['hospitals']} hospitals, and {loc['transport_hubs']} transport hubs nearby."

    # 3. Get EVERYTHING from Gemini
    ai_result = get_ai_valuation_update(
        address=address,
        historical_price=historical_rate,
        property_type=data.get("type"),
        size=data.get("size"),
        age=data.get("age"),
        neighborhood_context=neighborhood_context
    )

    if ai_result:
        # Use AI as the primary source of truth
        final_result = {
            "market_value_range": ai_result.get("market_value_range"),
            "distress_value_range": [int(v * 0.8) for v in ai_result.get("market_value_range")],
            "resale_index": ai_result.get("resale_index"),
            "time_to_sell": ai_result.get("time_to_sell"),
            "risk_flags": ai_result.get("risk_flags"),
            "key_drivers": ai_result.get("key_drivers"),
            "ai_insights": ai_result.get("ai_reasoning"),
            "market_sentiment": ai_result.get("market_sentiment"),
            "valuation_details": {
                "rate_per_sqft": ai_result.get("market_rate_per_sqft"),
                "neighborhood_tier": loc['neighborhood_tier'],
                "depreciation_applied": "Market Adjusted"
            },
            "lat": loc['lat'],
            "lon": loc['lon']
        }
    else:
        # Fallback to heuristic if AI fails
        final_result = historical_scores
        final_result['ai_insights'] = ["Analyzing historical market patterns for this location."]
        final_result['lat'] = loc['lat']
        final_result['lon'] = loc['lon']

    return final_result
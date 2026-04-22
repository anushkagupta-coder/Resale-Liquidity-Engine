import json
import os

# Load Price Map for accurate lookups
PRICE_MAP_PATH = "app/data/price_map.json"
PRICE_MAP = {}
if os.path.exists(PRICE_MAP_PATH):
    with open(PRICE_MAP_PATH, "r") as f:
        PRICE_MAP = json.load(f)

def calculate_scores(data, loc):

    size = float(data.get("size", 1000))
    age = int(data.get("age", 0))
    property_type = data.get("type", "Apartment")
    
    location_multiplier = loc.get("location_multiplier", 1.0)
    location_score = loc.get("location_score", 50)

    # ---------------- 1. DATA-DRIVEN BASE PRICE ----------------
    full_address = loc.get("full_address", "").lower()
    address_parts = [p.strip() for p in full_address.split(',')]
    
    base_rate_per_sqft = 0
    match_found = False

    # Try to find the area or city in our dataset map
    for part in reversed(address_parts):
        if part in PRICE_MAP:
            base_rate_per_sqft = PRICE_MAP[part]
            match_found = True
            break
    
    # Fallback to hardcoded city heuristic if dataset doesn't have the spot
    if not match_found:
        if "mumbai" in full_address or "than" in full_address:
            base_rate_per_sqft = 25000 
        elif "bangalore" in full_address or "bengaluru" in full_address:
            base_rate_per_sqft = 12000
        elif "pune" in full_address or "baner" in full_address:
            base_rate_per_sqft = 9500
        elif "delhi" in full_address or "gurgaon" in full_address:
            base_rate_per_sqft = 15000
        else:
            base_rate_per_sqft = 7500

    # ---------------- 2. PROPERTY TYPE MULTIPLIERS ----------------
    type_multipliers = {
        "1BHK": 1.0,
        "2BHK": 1.25,
        "3BHK": 1.5,
        "4BHK": 1.8,
        "5BHK": 2.2,
        "Villa": 2.8,
        "Penthouse": 3.2,
        "Plot": 1.4,
        "Shop": 2.0
    }
    type_factor = type_multipliers.get(property_type, 1.0)

    # ---------------- 3. AGE DEPRECIATION ----------------
    # Property loses value over time (approx 1.5% per year)
    depreciation_factor = max(0.5, 1 - (age * 0.018)) 

    # ---------------- 4. FINAL VALUATION CALCULATION ----------------
    # Formula: Base * Location * Type * Depreciation
    market_rate = base_rate_per_sqft * location_multiplier * type_factor * depreciation_factor
    
    market_value = int(market_rate * size)

    low = int(market_value * 0.95)
    high = int(market_value * 1.05)

    # ---------------- 5. LIQUIDITY / RESALE INDEX ----------------
    # How fast will it sell? Based on location quality and property age.
    resale_index = int(
        (0.6 * location_score) + 
        (0.4 * (100 - (age * 2)))
    )
    resale_index = max(10, min(95, resale_index))

    # ---------------- 6. DISTRESS VALUE ----------------
    distress_low = int(low * 0.75)
    distress_high = int(high * 0.85)

    # ---------------- 7. TIME TO SELL ----------------
    if resale_index > 80:
        time = "15-45 days (Hot Market)"
    elif resale_index > 60:
        time = "45-90 days (Stable)"
    else:
        time = "90-180 days (Slow)"

    # ---------------- 8. RISK & DRIVERS ----------------
    risks = []
    if age > 20: risks.append("High Maintenance (Old Property)")
    if location_score < 40: risks.append("Poor Connectivity")
    
    drivers = []
    if location_multiplier > 1.3: drivers.append("Premium Neighborhood")
    if type_factor > 1.2: drivers.append("High-Value Property Type")

    return {
        "market_value_range": [low, high],
        "distress_value_range": [distress_low, distress_high],
        "resale_index": resale_index,
        "time_to_sell": time,
        "confidence_score": 0.85,
        "risk_flags": risks,
        "key_drivers": drivers,
        "valuation_details": {
            "rate_per_sqft": int(market_rate),
            "neighborhood_tier": loc.get("neighborhood_tier"),
            "depreciation_applied": f"{age * 1.5}%"
        }
    }
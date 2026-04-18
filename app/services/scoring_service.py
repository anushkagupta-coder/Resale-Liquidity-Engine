def calculate_scores(data, loc):

    size = data.get("size", 1000)
    age = data.get("age", 5)
    property_type = data.get("type", "2BHK")

    location_score = loc.get("location_score", 50)

    # ---------------- PROPERTY SCORE ----------------
    property_score = 50

    if property_type == "2BHK":
        property_score += 15

    if age > 15:
        property_score -= 15

    # ---------------- MARKET DEMAND (SIMULATED) ----------------
    demand_score = 60  # can improve later

    # ---------------- LIQUIDITY ----------------
    resale_index = int(
        0.4 * location_score +
        0.3 * property_score +
        0.3 * demand_score
    )

    # ---------------- MARKET VALUE ----------------
    base_price = 5000 * size
    market_value = base_price * (1 + location_score / 100)

    low = int(market_value * 0.9)
    high = int(market_value * 1.1)

    # ---------------- DISTRESS VALUE ----------------
    distress_low = int(low * 0.8)
    distress_high = int(high * 0.85)

    # ---------------- TIME TO SELL ----------------
    if resale_index > 80:
        time = "30-60 days"
    elif resale_index > 50:
        time = "60-90 days"
    else:
        time = "90-180 days"

    # ---------------- CONFIDENCE ----------------
    confidence = 0.6

    if loc.get("lat"):
        confidence += 0.1

    if size and age:
        confidence += 0.1

    confidence = round(confidence, 2)

    # ---------------- RISK FLAGS ----------------
    risks = []

    if age > 20:
        risks.append("Old property")

    if resale_index < 50:
        risks.append("Low liquidity")

    # ---------------- KEY DRIVERS ----------------
    drivers = []

    if location_score > 60:
        drivers.append("Good location")

    if property_type == "2BHK":
        drivers.append("High demand configuration")

    # ---------------- FINAL OUTPUT ----------------
    return {
        "market_value_range": [low, high],
        "distress_value_range": [distress_low, distress_high],
        "resale_index": resale_index,
        "time_to_sell": time,
        "confidence_score": confidence,
        "risk_flags": risks,
        "key_drivers": drivers
    }
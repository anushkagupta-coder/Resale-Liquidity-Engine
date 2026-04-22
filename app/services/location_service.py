from geopy.geocoders import Nominatim
import requests

# Initialize geolocator
geolocator = Nominatim(user_agent="resale_ai_project")


def get_location_features(address):
    
    # ---------------- STEP 1: GET LAT-LONG ----------------
    try:
        location = geolocator.geocode(address, timeout=10)
    except Exception as e:
        print("Geocoding error:", e)
        return default_response()

    if location is None:
        return default_response()

    lat = location.latitude
    lon = location.longitude
    full_address = location.address 
    print(f"DEBUG: Geocoded '{address}' to {lat}, {lon} ({full_address})")

    # ---------------- STEP 2: GET NEARBY PLACES (Optimized) ----------------
    overpass_url = "http://overpass-api.de/api/interpreter"

    # Using 5km radius (more reliable) and searching for nodes, ways, and relations
    query = f"""
    [out:json][timeout:25];
    (
      nwr["amenity"~"school|hospital|university|mall|bank|theatre|gym|cafe|restaurant"](around:5000,{lat},{lon});
      nwr["leisure"~"park|garden"](around:5000,{lat},{lon});
      nwr["public_transport"="station"](around:5000,{lat},{lon});
      nwr["railway"="station"](around:5000,{lat},{lon});
    );
    out center;
    """

    headers = {'User-Agent': 'ResaleIntelligenceEngine/1.0 (contact: user@example.com)'}
    
    try:
        print(f"DEBUG: Requesting Overpass for {lat}, {lon}...")
        response = requests.get(overpass_url, params={'data': query}, headers=headers, timeout=20)
        
        if response.status_code != 200:
            print(f"DEBUG: Overpass Error {response.status_code}: {response.text[:100]}")
            return build_response(lat, lon, 0, 0, 0, 0, full_address)
            
        data = response.json()
        elements = data.get("elements", [])
        print(f"DEBUG: Overpass found {len(elements)} total elements.")

        # More robust counting
        schools = 0
        hospitals = 0
        malls = 0
        stations = 0

        for e in elements:
            tags = e.get("tags", {})
            amenity = tags.get("amenity", "")
            building = tags.get("building", "")
            railway = tags.get("railway", "")

            if amenity in ["school", "university", "college"] or building == "school":
                schools += 1
            if amenity in ["hospital", "clinic", "doctors"] or building == "hospital":
                hospitals += 1
            if amenity in ["mall", "marketplace"] or tags.get("shop") == "mall":
                malls += 1
            if tags.get("public_transport") == "station" or railway == "station":
                stations += 1

        print(f"DEBUG: Counts -> Schools: {schools}, Hospitals: {hospitals}, Malls: {malls}, Stations: {stations}")

        return build_response(lat, lon, schools, hospitals, malls, stations, full_address)

    except Exception as e:
        print(f"DEBUG: Location Service Exception: {e}")
        return build_response(lat, lon, 0, 0, 0, 0, full_address)


# ---------------- HELPER FUNCTIONS ----------------

def build_response(lat, lon, schools, hospitals, premium, transport, address=""):
    
    # Calculate Neighborhood Tier
    tier = "Developing"
    multiplier = 1.0
    
    score = 50 + (schools * 2) + (hospitals * 3) + (premium * 5) + (transport * 10)
    score = min(score, 100) # Cap at 100

    if score > 85:
        tier = "Elite/Premium"
        multiplier = 1.6
    elif score > 65:
        tier = "Prime/Standard"
        multiplier = 1.3
    elif score > 50:
        tier = "Developing"
        multiplier = 1.0
    else:
        tier = "Remote/Rural"
        multiplier = 0.7

    return {
        "lat": lat,
        "lon": lon,
        "full_address": address,
        "schools": schools,
        "hospitals": hospitals,
        "premium_spots": premium,
        "transport_hubs": transport,
        "location_score": score,
        "neighborhood_tier": tier,
        "location_multiplier": multiplier
    }


def default_response():
    return {
        "lat": None,
        "lon": None,
        "schools": 0,
        "hospitals": 0,
        "premium_spots": 0,
        "transport_hubs": 0,
        "location_score": 50,
        "neighborhood_tier": "Developing",
        "location_multiplier": 1.0
    }
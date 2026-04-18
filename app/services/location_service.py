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

    # ---------------- STEP 2: GET NEARBY PLACES ----------------
    overpass_url = "http://overpass-api.de/api/interpreter"

    query = f"""
    [out:json];
    (
      node["amenity"="school"](around:3000,{lat},{lon});
      node["amenity"="hospital"](around:3000,{lat},{lon});
    );
    out;
    """

    try:
        response = requests.get(overpass_url, params={'data': query}, timeout=10)

        # Check API status
        if response.status_code != 200:
            print("API failed:", response.status_code)
            return build_response(lat, lon, 0, 0)

        # Check empty response
        if not response.text.strip():
            print("Empty API response")
            return build_response(lat, lon, 0, 0)

        # Convert to JSON
        data = response.json()

    except Exception as e:
        print("Overpass API error:", e)
        return build_response(lat, lon, 0, 0)

    # ---------------- STEP 3: COUNT PLACES ----------------
    schools = 0
    hospitals = 0

    for element in data.get('elements', []):
        tags = element.get('tags', {})
        if tags.get('amenity') == 'school':
            schools += 1
        elif tags.get('amenity') == 'hospital':
            hospitals += 1

    return build_response(lat, lon, schools, hospitals)


# ---------------- HELPER FUNCTIONS ----------------

def build_response(lat, lon, schools, hospitals):
    
    score = 50

    if schools > 3:
        score += 15

    if hospitals > 2:
        score += 15

    return {
        "lat": lat,
        "lon": lon,
        "schools": schools,
        "hospitals": hospitals,
        "location_score": score
    }


def default_response():
    return {
        "lat": None,
        "lon": None,
        "schools": 0,
        "hospitals": 0,
        "location_score": 50
    }
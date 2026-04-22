import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key and api_key != "YOUR_API_KEY_HERE":
    genai.configure(api_key=api_key)
    # Using 'gemini-flash-lite-latest' for the best chance of bypassing quota 'limit: 0'
    model = genai.GenerativeModel('gemini-flash-lite-latest')
else:
    model = None

def get_ai_valuation_update(address, historical_price, property_type, size, age, neighborhood_context):
    if not model:
        print("DEBUG: Gemini model not initialized. Check API Key.")
        return None

    prompt = f"""
    ROLE: You are an expert Real Estate Valuer in India.
    TASK: Provide a comprehensive 2024-2025 market valuation and liquidity analysis.
    
    PROPERTY DETAILS:
    - Address: {address}
    - Type: {property_type}
    - Size: {size} sqft
    - Age: {age} years
    - Historical Rate (approx 5 years ago): ₹{historical_price} per sqft
    - Neighborhood Context: {neighborhood_context}

    JSON OUTPUT FORMAT (MANDATORY):
    {{
        "market_rate_per_sqft": number,
        "market_value_range": [low_value, high_value],
        "resale_index": number (1-100),
        "time_to_sell": "string (e.g. 30-60 days)",
        "risk_flags": ["list", "of", "risks"],
        "key_drivers": ["list", "of", "drivers"],
        "ai_reasoning": ["3-4 bullet points explaining the current market pulse"],
        "market_sentiment": "High/Medium/Low"
    }}
    
    INSTRUCTION: Return ONLY the JSON object. No preamble, no explanation outside JSON.
    """

    try:
        print(f"DEBUG: Calling Gemini for {address}...")
        response = model.generate_content(prompt)
        content = response.text.strip()
        print(f"DEBUG: Gemini raw response: {content[:100]}...")

        # Robust JSON extraction
        if "{" in content:
            start = content.find("{")
            end = content.rfind("}") + 1
            json_str = content[start:end]
            return json.loads(json_str)
        
        return None
    except Exception as e:
        print(f"DEBUG: Gemini API Error: {e}")
        return None

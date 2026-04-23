import os
import sys
from dotenv import load_dotenv

# Path to the .env file
env_path = os.path.join(os.getcwd(), ".env")
print(f"Checking for .env at: {env_path}")

load_dotenv(env_path)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ Error: GEMINI_API_KEY not found in .env")
    sys.exit(1)

print(f"✅ GEMINI_API_KEY found: {api_key[:5]}...{api_key[-5:]}")

try:
    import google.generativeai as genai
    genai.configure(api_key=api_key)
    # Just list models to verify connection
    models = genai.list_models()
    print("✅ Successfully connected to Gemini API")
except Exception as e:
    print(f"❌ Error connecting to Gemini API: {e}")
    sys.exit(1)

print("🚀 Backend environment is READY!")

import pandas as pd
import json
import os

# Load the dataset
csv_path = "app/data/real_estate_data.csv"
df = pd.read_csv(csv_path)

# Cleanup: some prices might be strings or have issues
df['Price_per_SQFT'] = pd.to_numeric(df['Price_per_SQFT'], errors='coerce')
df = df.dropna(subset=['Price_per_SQFT', 'Location'])

# Create a mapping
# We want to map "Area" and "City" to average prices
location_map = {}

for index, row in df.iterrows():
    loc_str = row['Location'].lower()
    parts = [p.strip() for p in loc_str.split(',')]
    
    if len(parts) >= 2:
        area = parts[-2]
        city = parts[-1]
        
        # Store area-level price
        if area not in location_map:
            location_map[area] = []
        location_map[area].append(row['Price_per_SQFT'])
        
        # Store city-level price
        if city not in location_map:
            location_map[city] = []
        location_map[city].append(row['Price_per_SQFT'])

# Calculate averages
final_map = {}
for loc, prices in location_map.items():
    final_map[loc] = round(sum(prices) / len(prices), 2)

# Save to JSON
with open("app/data/price_map.json", "w") as f:
    json.dump(final_map, f, indent=2)

print(f"Processed {len(df)} records. Created price map with {len(final_map)} locations.")

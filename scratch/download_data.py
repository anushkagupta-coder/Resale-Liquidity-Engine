import kagglehub
import shutil
import os

# Download the dataset
path = kagglehub.dataset_download("rakkesharv/real-estate-data-from-7-indian-cities")

print("Path to dataset files:", path)

# List files in the path
files = os.listdir(path)
print("Files in dataset:", files)

# Move the CSV to our project data folder
target_dir = "app/data"
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

for file in files:
    if file.endswith(".csv"):
        shutil.copy(os.path.join(path, file), os.path.join(target_dir, "real_estate_data.csv"))
        print(f"Copied {file} to app/data/real_estate_data.csv")
        break

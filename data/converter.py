import pandas as pd

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv('./data/database.csv')

# Convert the DataFrame to a JSON string
json_str = df.to_json(orient='records')

# Write the JSON string to a file
with open('./data/database.json', 'w') as f:
    f.write(json_str)

df = pd.read_json('./data/database.json')
print(df.shape[0])
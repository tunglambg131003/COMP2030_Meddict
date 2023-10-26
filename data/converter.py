# Converter script for generating JSON file from CSV file
# only use for development purpose

import pandas as pd

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv('./data/database.csv')

# add columns 'en_sound_location', 'vn_sound_location', 'illustration_link' to df
df['en_sound_location'] = df['idx'].apply(lambda x: './data/sounds/en/' + str(x) + '.mp3')
df['vn_sound_location'] = df['idx'].apply(lambda x: './data/sounds/vn/' + str(x) + '.mp3')
df['illustration_link'] = df['idx'].apply(lambda x: "https://example.com/")

# Convert the DataFrame to a JSON string
json_str = df.to_json(orient='records')

# Write the JSON string to a file
with open('./data/database.json', 'w') as f:
    f.write(json_str)

df = pd.read_json('./data/database.json')
print(df.shape[0])
# Script for import json to db 
# only use for development purposes
mongoimport --host mongodb --db MedDict --collection dictionary --authenticationDatabase admin --username root --password 'password' --type json --file /data/database.json --jsonArray

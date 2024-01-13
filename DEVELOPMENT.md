# 👩‍💻 Development

Currently, the code is **UNDER DEVELOPMENT**. The following instructions are for developers in the project.

## Import data for MongoDB

Currently, the data for MongoDB is not inserted automatically. You need to insert the data manually by:

1. Access the MongoDB container by running the following command:
```bash
docker exec -it mongodb bash
```

2. In the MongoDB container, run the following command: 
```bash
mongoimport --host mongodb --db MedDict --collection dictionary --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --type json --file /data/database.json --jsonArray
```

## Where is the endpoints of the API? 

The address of the API is currently `localhost:5000`. Endpoints are mentioned in the [API MedDics-VinUni documentation](https://bump.sh/h114mx001/doc/meddict-vinuni/).

### ALTERNATIVE

The current development code is using another "pseudo" domain: `meddict.com` for the website and `api.meddict.com` for the API endpoints. You can do so by adding the following lines to your `/etc/hosts` file:

```
127.0.0.1       localhost
127.0.0.1       api.meddict.com 
127.0.0.1       meddict.com
::1             localhost
```
# Medical Dictionary 🏥📖

**MedDict** is a medical dictionary made by VinUnians for College of Health Sciences (CHS) students & faculties in VinUniversity. The dictionary is curated by Professor Huynh Dinh Chien, faculty of CHS at VinUniversity. 

## 🔍 Table of contents 
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)
- [Acknowledgement](#acknowledgement)

## ✨ Features

### For end-users

- Search for both English/Vietnamese medical words to receive the corresponding words in the other language. 
- Provide sample illustrations to the words.

### For dictionary managers

- Dashboard for managing the dictionary contents.
- Quickly add new words to the dictionary via CSV or XLSX files.
- Receive & resolve requests for new words from users. 

## 👨‍🔧 Installation 

### Pre-requisite

Before installing the service, you need to have [Docker](https://docs.docker.com/) & [Docker Compose](https://docs.docker.com/compose/). Please visit their instalation guides before continuing. 

### Setup 
1. Cloning the project with:
```bash
$ git clone https://github.com/tunglambg131003/COMP2030_Meddict
```
2. Create a `.env` file, which will configure the application's environment variables for storing secret passwords, keys, etc. The sample of the `.env` can be found at [`.env_sample`](./env_sample) file. We recommend using some password generator to create the credentials. 
3. Create a `mongo-init.js` file from [`sample_mongo-init.js`](./sample_mongo-init.js). Please change the Mongo username & password according to the key `MONGODB_USERNAME` & `MONGODB_PASSWORD` at the `.env` file that you created in step 1. 
4. Run the following command:

```Bash
$ docker-compose up -d build
```

You are done! Access the service at `localhost` via your web browser if you are installing in local machine, or the server IP address/domain name if you are deploying it on a cloud instance.

## 🧐 Usage 

## 👩‍💻 Development

Currently, the code is **UNDER DEVELOPMENT**. The following instructions are for developers in the project.

### Import data for MongoDB

Currently, the data for MongoDB is not inserted automatically. You need to insert the data manually by:

1. Access the MongoDB container by running the following command:
```bash
docker exec -it mongodb bash
```

2. In the MongoDB container, run the following command: 
```bash
mongoimport --host mongodb --db MedDict --collection dictionary --authenticationDatabase admin --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD --type json --file /data/database.json --jsonArray
```

### Where is the endpoints of the API? 

The address of the API is currently `localhost:5000`. Endpoints are mentioned in the [API MedDics-VinUni documentation](https://bump.sh/h114mx001/doc/meddict-vinuni/).

#### ALTERNATIVE

The current development code is using another "pseudo" domain: `meddict.com` for the website and `api.meddict.com` for the API endpoints. You can do so by adding the following lines to your `/etc/hosts` file:

```
127.0.0.1       localhost
127.0.0.1       api.meddict.com 
127.0.0.1       meddict.com
::1             localhost
```

## 📄 License

This project is using MIT License. 

## 🙏 Acknowledgement 

We want to say thank to COMP2030 - Software Construction's Instructor Team for helping us during the course, as well as Professor Huynh Dinh Chien & Mr. Hoang Mai Duy with their supports during the project. 
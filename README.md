# Medical Dictionary 🏥📖

**MedDict** is a medical dictionary made by VinUnians for College of Health Sciences (CHS) students & faculties in VinUniversity. The dictionary is curated by Professor Huynh Dinh Chien, faculty of CHS at VinUniversity. 

## 🔍 Table of contents 
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Development](#-development)
- [License](#-license)
- [Acknowledgement](#-acknowledgement)

## ✨ Features

### For end-users

- Search for both English/Vietnamese medical words to receive the corresponding words in the other language. 
- Provide sample illustrations to the words.
- With the MedDict plugin, you can search for words directly from your browser!

### For dictionary managers

- Dashboard for managing the dictionary contents.
- Quickly add new words to the dictionary via CSV or XLSX files.
- Receive & resolve requests for new words from users. 

## 🧐 Usage 

### Search from our website

The dictionary is available at [https://meddict-vinuni.com](https://meddict-vinuni.com). In here, you can search for medical terms, receiving the translation, pronunciation, and sample illustrations for the words.

![Search from website](./images/search_website.png)

### Search with the MedDict plugin

With the [MedDict plugin](https://github.com/linhledieu/MedDict-highlighter), you can search for words directly from your browser!

More interestingly, you DON'T need to specify source/target language. The plugin will automatically do the ✨ magic for you!

![Search with MedDict plugin](./images/search_plugin_en.png)

![Search with MedDict plugin](./images/search_plugin_vn.png)

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
$ docker compose up -d build
```

You are done! Access the service at `localhost` via your web browser if you are installing in local machine, or the server IP address/domain name if you are deploying it on a cloud instance.

## 👩‍💻 Development

Please refer to [DEVELOPMENT.md](./DEVELOPMENT.md) for more information.

## 📄 License

This project is using MIT License. 

## 🙏 Acknowledgement 

We want to say thank to COMP2030 - Software Construction's Instructor Team for helping us during the course, as well as Professor Huynh Dinh Chien & Mr. Hoang Mai Duy with their supports during the project. 
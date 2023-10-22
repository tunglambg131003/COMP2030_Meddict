# Medical Dictionary 🏥📖

**MedDict** is a medical dictionary made by VinUnians for College of Health Sciences (CHS) students & faculties in VinUniversity. The dictionary is curated by Professor Huynh Dinh Chien, faculty of CHS at VinUniversity. 


## Table of contents 
- [Table of contents](#table-of-contents)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgement](#acknowledgement)


## Features

### For end-users

- Search for both English/Vietnamese medical words to receive the corresponding words in the other language. 
- Provide sample illustrations to the words.

### For dictionary managers

- Dashboard for managing the dictionary contents.
- Quickly add new words to the dictionary via CSV or XLSX files.
- Receive & resolve requests for new words from users. 

## Installation 

### Pre-requisite

Before installing the service, you need to have [Docker](https://docs.docker.com/) & [Docker Compose](https://docs.docker.com/compose/). Please visit their instalation guides before continuing. 

### Setup 

1. Create a `.env` file, which will configure the application's environment variables for storing secret passwords, keys, etc. The sample of the `.env` can be found at [`.env_sample`](./env_sample) file. We recommend using some specific password generator to create the credentials. 
2. Run the following command:

```Bash
$ docker-compose up -d build
```
And you can access the service at: `localhost:5000`. 

## Usage 

## License 

## Acknowledgement
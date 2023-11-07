# About

Project for Software Quality Assurance at university of nottingham. 


## How to run

1. Clone the repository
2. cd into backend and run `npm install`
3. Run docker-compose up inside the backend folder to start express server with mongoDB

## Environment variables
Environment variables are stored in a .env file in the backend folder. Rename the .env.example file to .env and fill in the variables with your own values.

.env file should look like this:
```
MONGOUSER=username
MONGOPASSWORD=password
PORT=8000
DBNAME=PayM8
```

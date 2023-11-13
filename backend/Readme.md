# About

Project for Software Quality Assurance at the University of Nottingham. 

## How to run

### Prerequisites
- Ensure you have Docker and Docker Compose installed on your machine. If not, you can download them from [Docker's official website](https://www.docker.com/get-started).

### Steps to Run

1. Clone the repository.
2. Change directory into the backend folder: `cd backend`.
3. Run `npm install` to install necessary node modules.
4. Rename the `.env.example` file to `.env` and update the variables with your own values.
5. To start the express server with MongoDB using Docker Compose, execute the following command inside the backend folder:


```
docker-compose up
```

This will pull the necessary Docker images and start the containers as defined in your `docker-compose.yml` file.

### Advanced Docker Compose Commands

- **Running without Cache**: To build the images without using any cached layers, use the following command:
```
docker-compose build --no-cache
docker-compose up
```


- **Clean Run with Cache Removal**: If you want to remove all the existing containers, networks, and images created by Docker Compose and start fresh, you can use the following commands:

```
docker-compose down --rmi all --volumes --remove-orphans
docker-compose up --build


```


This will ensure that everything is built from scratch and no cached data is used.

## Environment Variables

Environment variables are stored in a .env file in the backend folder. Rename the .env.example file to .env and fill in the variables with your own values.

The .env file should look like this:

```
MONGOUSER=username
MONGOPASSWORD=password
PORT=8000
DBNAME=PayM8
```
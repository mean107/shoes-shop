## Tech Stack

- Express.js for Backend
- MongoDB for persistant database
- HTML/CSS/JavaScript for Frontend
- Dockerize app with Docker Compose
- Jenkins for automation build, test

## Features

- Create shoes
- Read shoes
- Update shoes
- Delete shoes
- Persistent MongoDB storage

## API Endpoints
 
- GET  `/api/health`  Health check
- GET  `/api/shoes`  Get all shoes 
- POST  `/api/shoes`  Create a shoe 
- PUT  `/api/shoes/:id`  Update a shoe 
- DELETE  `/api/shoes/:id`  Delete a shoe 

## Run Locally With Docker

```bash
docker compose up --build
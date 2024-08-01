# Pre-requisites:
Must have node and mongoDB installed on local machine.

## Installation

Clone the Repository to your local machine.
install backend and frontend dependencies by navigating to each folder respectively and running 'npm install'.

## Setting up backend:
Create a .env file in the backend directory and add the following environment variables:
PORT, MONGO_URI, using the appropriate port on which the server will be running locally and the URI to the mongoDB database on the local machine. 
MONGO_URI refers to the path directly to the db the project will be using i.e. ".../feature-flags"

## Running the project:

Start the backend server: navigate to backend directory and run "node server.js"
Start the frontend app: navigate to frontend directory and run "npm start"
The front-end app runs on the react default of port 3000.


# Using the application 
Login/Register: Use the application to register a new user or login as an existing user. Ensure you have the appropriate role (Developer or Admin) to access certain features.

Manage Feature Flags: Add, edit, and delete feature flags using the dashboard. Use the toggle switches to enable or disable features in different environments.

Filter Flags: Use the filters to sort feature flags by environment and country.

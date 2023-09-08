# Museum of Discovery

![Museum of Discovery Logo](../my-project/public/images/logo.png)

## Description
The Museum of Discovery is an online platform that allows users to explore and share curiosities they've encountered around the world. Users can create and check out other curiosites. This README provides instructions on how to set up and run the project locally.

## Instructions to Run the App
To run this application on your local machine, follow these steps:

### 1. Install Dependencies
After forking and cloning the project, you will have to install all the dependencies

```
npm install 
``` 

### 2. Set Up Environment Variables
Create a .env file in the project root directory and add the following environment variables:
```
# MongoDB Connection String
MONGODB_URI=<your-mongodb-uri>

# Session Secret
SESSION_SECRET=<your-secret>

# Cloudinary Configuration (if used)
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

``` 

### 3. Run the Application
```
npm run dev
``` 

## Demo
https://museum-of-discovery.adaptable.app
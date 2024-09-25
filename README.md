# CMS System - A FullStack Application

Customer Management System (CMS) streamlines user and customer management for organizations. It offers features for adding, editing, and organizing user/customer information.

## Tech Stack

CMS System is created with
- **React.js**: JavaScript library to create visually enriched User Interfaces
- **Next.js**:  React framework for simplifying the process of building server-rendered React applications.
- **Material-UI**:  React component library for implementing the Google Material Design guidelines.
- **MongoDB**:  NoSQL database that stores data in flexible JSON-like documents.

This is a Full-Stack application that manages both Front-End and Back-End side, using React on FE and Node.js on BE.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/termsberk3/Cms-System.git
   cd cavus-app-master
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Configure environment variables:<br/>
   Create a new .env file on your local
   MONGODB_URI = Your mongoDB connection because MongoDB is used on this project for data storing
   JWT_SECRET = Add a secret key in order to create a new profile
   Creation of Admin user can be done from postman, therefore use http://localhost:3000/api/auth/register on postman to create a new profile
   body of the request will be;
   ```
   {
  "email": "youremail",
  "password": "password of your choise",
  "userType": "Admin",
  "fullName":"name of your desire"
}
    ```
4. Start the development server:
    ```
    npm run dev
    ```
5. Application can be viewed by navigating to http://localhost:3000.
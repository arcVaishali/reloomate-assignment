# Reloomate

## Deployment Link on Render
https://reloomate-assignment.onrender.com


## To Run locally
- Fork the repository
- Clone the repository in your local
- Copy and set up the following environment variables in a `.env` file
    ```env
    MONGODBURI=""
    PORT=5000
    CORS_ORIGIN=""
    ACCESS_TOKEN_SECRET=""
    ACCESS_TOKEN_EXPIRY=""
    REFRESH_TOKEN_SECRET=""
    REFRESH_TOKEN_EXPIRY=""
    ```
- Run the following to get the server started on your local
   ```
   npm i
   npm run dev
   ```
- Other commands are listed in the package.json file.
   ![](image.png)


---

## Notes on Architecture Choices
- Modular Node.js backend using Express for routing and middleware.
- MongoDB is used as the database.
- JWT is implemented for stateless authentication and secure session handling.
- Sensitive configuration is managed via environment variables for flexibility across environments.
- API structure follows RESTful conventions for easy frontend integration (e.g., React Native).
- Robust error handling and input validation are prioritized.
- CORS is enabled to support cross-origin requests.
- The architecture is designed for simplicity, scalability, and maintainability to support rapid development and future enhancements.

## Features

### 1. User Registration

- **Endpoint:** `POST /api/register`
- **Accepts:** `name`, `email`, `password`
- **Details:**
    - Hash password before saving (use bcrypt)
    - Store user in MongoDB (or any preferred DB)

### 2. User Login

- **Endpoint:** `POST /api/login`
- **Accepts:** `email`, `password`
- **Details:**
    - Verify email and password
    - Return a JWT token on success

### 3. Get User Profile

- **Endpoint:** `GET /api/profile`
- **Details:**
    - Protected route requiring JWT
    - Returns user’s name and email

### 4. Onboarding Content

- **Endpoint:** `GET /api/onboarding`
- **Returns:** Array of 3 onboarding steps:
    - `title`
    - `description`
    - `image URL`

---
<!-- 
## Requirements

- Add validation and proper error handling
- Use CORS so React Native can access it
- Write a clean README with instructions to run locally
- Push to a GitHub repo

---

## Bonus (Optional)

- Dockerize the app for easy testing
- Use environment variables for config (JWT secret, DB URI)

---

## Submission

- Share your GitHub repository link
- Share Postman collection (optional but helps us test)
- Share a brief note on your architecture choices

---

## What We Will Check

- Understanding of RESTful principles
- Code readability and structure
- JWT authentication handling
- Ability to work with MongoDB (or chosen DB)
- Potential to integrate seamlessly with React Native app workflows
 -->

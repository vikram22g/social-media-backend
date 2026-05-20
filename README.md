# 🚀 Social Media Backend API

A scalable and secure Social Media Backend built using Node.js, Express.js, and MongoDB.

This project includes authentication, authorization, profile management, follow system, personalized feed APIs, and secure backend architecture inspired by real-world social media platforms.

---

# ✨ Features

✅ User Registration & Login  
✅ JWT Authentication  
✅ Secure Cookie-Based Authorization  
✅ Create & Delete Posts  
✅ Follow / Unfollow Users  
✅ User Profile Management  
✅ Personalized Feed System  
✅ Protected Routes using Middleware  
✅ MongoDB Database Integration  
✅ RESTful API Architecture  

---

# 🛠 Tech Stack

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- bcrypt

---

# 📂 Project Structure

```bash
src/
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 ├── config
```

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/vikram22g/social-media-backend.git
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Run Server

```bash
npm start
```

---

# 🔐 Authentication

This project uses JWT Authentication with secure cookies for protected routes and authorization handling.

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Register User |
| POST | /login | Login User |
| POST | /post/create | Create Post |
| DELETE | /post/delete/:id | Delete Post |
| PUT | /follow/:id | Follow User |
| GET | /feed | Personalized Feed |

---

# 🚧 Upcoming Features

- Forgot Password System
- Email Verification
- Likes & Comments
- Image Upload
- Deployment
- API Documentation

---

# 👨‍💻 Developer

Vikram Mehra

Backend Developer passionate about building scalable web applications and learning modern backend technologies.

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
````

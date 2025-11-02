# 💬 ChatApp — Real-time Private Chat with Login & Registration

A real-time private chat web application built with **Node.js**, **Express**, **Socket.io**, and **MongoDB (Mongoose)**.  
It includes secure **user registration & login**, **message persistence**, and **live private messaging** between users.

---

## 🚀 Features

✅ User registration & login (passwords hashed with bcrypt)  
✅ Real-time private messaging using Socket.io  
✅ Chat history stored persistently in MongoDB  
✅ Responsive and simple UI with animations  
✅ Fully functional frontend + backend integration  

---

## 🗂️ Project Structure

```
ChatApp/
│
├── models/
│   ├── userModel.js          # User schema (username, password, status)
│   └── messageModel.js       # Message schema (sender, receiver, text)
│
├── routes/
│   └── api.js                # REST API routes for registration, login, messages
│
├── Public/
│   ├── index.html            # Login & Registration page
│   ├── chat.html             # Private chat page
│   ├── script.js             # Client-side chat logic with Socket.io
│   └── style.css             # Styling and animations
│
├── server.js                 # Main Express + Socket.io server
├── .env                      # Environment variables (MongoDB URI, etc.)
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup Guide

### 🧩 Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 🧩 Step 2: Install Dependencies
```bash
npm install
```

### 🧩 Step 3: Setup MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
2. Create a free cluster and a database named **chat_app**  
3. Get your MongoDB connection string (URI)

### 🧩 Step 4: Configure Environment Variables
Create a `.env` file in the project root with the following:
```bash
MONGODB_URI="your_mongodb_connection_string_here"
PORT=5000
```

Example:
```
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/chat_app"
PORT=5000
```

### 🧩 Step 5: Start the Server
```bash
node server.js
```

(Optionally, install **nodemon** for auto-reload during development)
```bash
npm install -g nodemon
nodemon server.js
```

Once running, open:
```
http://localhost:5000
```

---

## 🧠 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/register` | Register a new user |
| **POST** | `/api/login` | Login an existing user |
| **POST** | `/api/send` | Send a new message |
| **GET** | `/api/messages/:user1/:user2` | Fetch chat history between two users |
| **GET** | `/api/test` | Check if API is working properly |

---

## 💻 Frontend Overview

### 🟢 `index.html`
- Handles **user registration** and **login** via `/api/register` and `/api/login`
- Stores the logged-in username in `localStorage`
- Redirects to `chat.html` on successful login
- Includes toggling between Login/Register forms

### 🟣 `chat.html`
- Displays the chat interface
- Connects to the backend using Socket.io
- Sends/receives private messages in real-time
- Loads previous chat history between users

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Realtime** | Socket.io |
| **Database** | MongoDB + Mongoose |
| **Security** | bcrypt.js (password hashing) |
| **Environment** | dotenv |
| **Version Control** | Git + GitHub |

---

## 🧪 Testing the APIs

You can use **Postman** or **curl** to test endpoints.

### ✅ Check API connection
```bash
GET http://localhost:5000/api/test
```

## 📂 MongoDB Collections

**Database:** `chat_app`

## 💡 Quick Start Summary

```bash
# 1. Clone repo
git clone https://github.com/your-username/chat-app.git

# 2. Install dependencies
npm install

# 3. Add your MongoDB URI in .env
echo "MONGODB_URI=<your_connection_string>" > .env

# 4. Run the server
node server.js

# 5. Open browser at:
http://localhost:5000
```

🎉 You now have a working real-time private chat app with login, registration, and database persistence!

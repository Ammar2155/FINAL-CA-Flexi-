# MERN Task Management App

A complete full-stack task management application built with MongoDB, Express, React, and Node.js.

## Project Structure

task-management-app/
├── backend/                    # Express.js backend
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   └── tasks.js           # Task CRUD endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.js    # Task form component
    │   │   ├── TaskList.js    # Task list component
    │   │   └── TaskCard.js    # Individual task card
    │   ├── pages/
    │   │   ├── Home.js        # Main dashboard
    │   │   ├── SignIn.js      # Sign in page
    │   │   └── SignUp.js      # Sign up page
    │   ├── App.js             # Main app component
    │   ├── index.js           # React entry point
    │   └── index.css          # Global styles
    └── package.json


## Features

- User Authentication (Sign Up & Sign In)
- Create, Read, Update, Delete Tasks
- Task Status Management (To Do, In Progress, Completed)
- Task Priority Levels (Low, Medium, High)
- Due Date Assignment
- Task Filtering by Status
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm

## Installation & Setup

### 1. Backend Setup

# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB URI and JWT secret


### 2. Frontend Setup

bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install


## Running the Application

### Start MongoDB

If using local MongoDB:
bash
mongod


### Start Backend Server

bash
cd backend
npm start


The backend will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:
bash
cd frontend
npm start


The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Environment Variables

### Backend (.env)

MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000


## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Express.js, Node.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Styling**: CSS3

## Future Enhancements

- Task categories/tags
- Shared tasks/collaboration
- Task notifications
- Dark mode toggle
- Task search functionality
- Task comments
- User profile customization

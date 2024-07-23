# Task Manager

Task Manager is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to manage tasks efficiently. This repository contains the backend code for the Task Manager project.

## Deployment

The backend of the Task Manager project is deployed on Vercel. You can access the deployed backend via the following link:

[Task Manager Backend](http://localhost:8000/)

## Features

- **User Authentication**: Users can sign up and log in securely to manage their tasks.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Priority and Sorting**: Tasks can be prioritized and sorted based on priority or completion status.
- **Customization**: Users can customize task titles, descriptions, priorities, and colors.

## Getting Started

To run the backend locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the backend directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.
5. Access the server endpoints using a tool like Postman or integrate it with the frontend of the Task Manager project.

## Backend Structure

- **`tasks.routes.js`**: Contains the routes for handling CRUD operations related to tasks.
- **`Task.model.js`**: Defines the MongoDB schema for tasks.
- **`User.model.js`**: Defines the MongoDB schema for users.
- **`authMiddleware.js`**: Middleware for user authentication using JWT tokens.
- **`db.js`**: Configures the MongoDB connection.
- **`index.js`**: Main entry point of the backend application, configures server, and routes.

## Endpoints

### Authentication

- `POST /signup`: Register a new user. Requires a JSON body with `name`, `email`, and `password` fields.
- `POST /login`: Log in an existing user. Requires a JSON body with `email` and `password` fields.

### Tasks

- `POST /api/tasks`: Create a new task for the authenticated user. Requires a JSON body with `title`, `description`, `priority`, and `cardColor` fields.
- `GET /api/tasks`: Get all tasks of the authenticated user. Supports query parameters for filtering and sorting:
  - `title`: Search tasks by title (optional).
  - `sortPriority`: Sort tasks by priority (optional).
  - `sortCompleted`: Sort tasks by completion status (optional).
- `GET /api/tasks/:id`: Get a single task of the authenticated user by ID.
- `PUT /api/tasks/:id`: Update a task of the authenticated user by ID. Requires a JSON body with fields to update.
- `DELETE /api/tasks/:id`: Delete a task of the authenticated user by ID.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing task and user data.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt**: For password hashing and encryption.
- **dotenv**: For loading environment variables.
- **cors**: Middleware for enabling CORS in Express.js.





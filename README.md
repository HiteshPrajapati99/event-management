# Event Management Application

This project Event Management built with **Node.js** for the backend and **React.js (Vite)** for the frontend. It uses **MySQL** as the database, managed with **Prisma ORM**, and **TypeScript** is used throughout the stack for static type checking.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, MySQL
- **Frontend**: React.js (Vite), TypeScript
- **Database**: MySQL
- **ORM**: Prisma

## Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 16.x or higher
- **MySQL**: Version 5.7 or higher
- **Prisma**: Globally installed (`npm install -g prisma`)
- **Vite**: Installed with the frontend
- **Setup**: Clone the repository

## Backend Setup (Node.js)

1. Go To server dir
2. Run (`npm install`)
3. Run (`npx prisma migrate dev --name init`)
4. Run (`npm start`)

## I have provide env with repo so you can replace the database url with you mysql db url for db connection

## Frontend Setup (React.js)

1. Go to client dir
2. Run (`npm install`)
3. Run (`npm run dev`)

## Additional Notes

Some features related to filtering and search functionalities are pending implementation. Due to time constraints, the following features have not yet been completed:

### Backend

- **Advanced Filtering**: Allow filtering by event name, start date, and end date.
- **Sorting**: Allow sorting of events based on criteria such as name or date.

### Frontend

- **Filtering UI**: The user interface for advanced filtering (e.g., filtering by category) is not yet completed.
- **Advanced Filtering**: Allow filtering by event name, start date, and end date.
- **Sorting**: Allow sorting of events based on criteria such as name or date.

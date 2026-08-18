# Inventory Management

A full-stack web application for inventory and product management. This project features a robust backend API built with Node.js and Express, connected to a MongoDB database using Mongoose. The frontend is a modern React application built with Next.js, featuring a beautiful UI styled with Tailwind CSS.

## Features
- **Product Management:** Create, Read, Update, and Delete (CRUD) products.
- **Categorization:** Organize products into various dynamic categories.
- **Pagination & Filtering:** Browse through large datasets efficiently with page limit selectors, real-time search, and category filters.
- **Modern UI:** Responsive, fast, and interactive user interface with skeleton loaders, modals, and toast notifications.

## Tech Stack
- **Frontend:** Next.js (React App Router), Tailwind CSS, Lucide React (Icons), Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, Joi (Data Validation)

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas URI)
- npm or yarn

## Getting Started

### 1. Repository Setup
Make sure you are in the root directory of the project.
```bash
git init
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend/` directory and configure your MongoDB connection:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tech-edurite
```

**Start the backend server:**
```bash
npm run dev
```
The backend API will start running on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

**Start the frontend development server:**
```bash
npm run dev
```
The Next.js application will start running on `http://localhost:3000`. You can now open your browser and interact with the application!

## Project Structure
- `/backend`: Contains all Express server code, Mongoose models, controllers, and routes. Features are modularized by domain (e.g., `/src/features/productes`).
- `/frontend`: Contains the Next.js application, React components, custom hooks, utilities, and pages.

## Git Commands to Push
Now that you have initialized Git and created this README, you can commit your changes:
```bash
git add .
git commit -m "Initial commit with project setup"
git branch -M main
# Add your remote repository here if you have one:
# git remote add origin <your-repo-url>
# git push -u origin main
```

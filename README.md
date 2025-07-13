# Wellness Node.js Backend

A robust Node.js backend for a wellness platform, providing modules for cognitive tests & quizzes, journaling, and mood tracking. Built with Express.js, Sequelize ORM, and MySQL, this API is designed for extensibility, security, and ease of integration with frontend applications.

## Features

- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Role-based access for users and admins

- **Test & Quizzes Module**
  - Create, manage, and take cognitive tests and quizzes
  - Support for question options, types, and categories
  - Admin panel for quiz management

- **Journal Module**
  - Users can create, edit, and tag journal entries
  - Tagging system for organization and analytics

- **Mood Tracking Module**
  - Track daily moods and view mood history
  - Analytics for mood trends over time

- **Admin Dashboard**
  - Manage users, quizzes, categories, and more

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT
- **Validation:** Joi

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MySQL](https://www.mysql.com/) server

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/wellness-nodejs.git
   cd wellness-nodejs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MySQL credentials and other environment variables:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_user
     DB_PASS=your_mysql_password
     DB_NAME=wellness_db
     DB_DIALECT=mysql
     JWT_SECRET=your_jwt_secret
     PORT=3000
     ```

4. **Set up the database:**
   - Ensure your MySQL server is running.
   - The app uses Sequelize to manage models and tables. Tables will be created automatically on server start if they do not exist.

5. **Start the server:**
   ```bash
   npm start
   ```

## Project Structure

```
src/
  config/           # Database configuration
  controllers/      # Route controllers (admin, user)
  middleware/       # Authentication and other middleware
  models/           # Database models (User, Journal, Mood, Quiz, etc.)
  routes/           # API route definitions
  utils/            # Utility functions
  validations/      # Input validation logic
  server.js         # Application entry point
```

## API Overview

### User Endpoints (`/api/`)
- `POST /register` — Register a new user
- `POST /login` — User login
- `POST /journal/add` — Add a journal entry
- `POST /add-mood` — Add a mood entry
- `GET /profile` — Get user profile

### Admin Endpoints (`/api/admin/`)
- `GET /user-list` — List all users
- `POST /category/add` — Add a category
- `POST /test/add` — Add a cognitive test
- `POST /quiz/add` — Add a quiz

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

ISC

---

*For any questions or support, please contact the maintainer.* 
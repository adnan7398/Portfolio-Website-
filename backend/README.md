# Portfolio Backend API

A Node.js/Express backend for the portfolio website with local file uploads, authentication, and email notifications.

## Features

- **Local File Uploads**: Images are stored locally in the `uploads/` directory
- **Admin Authentication**: JWT-based authentication for admin features
- **Project Management**: CRUD operations for portfolio projects
- **Contact Messages**: Handle contact form submissions with email notifications
- **Profile Image Management**: Upload and manage profile images
- **Email Notifications**: Send emails for contact form submissions

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=3001
   ```

3. **Start the Server**:
   ```bash
   npx nodemon index.js
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin account
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project (public)
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Messages
- `POST /api/messages` - Submit contact message (public)
- `GET /api/messages` - Get all messages (admin only)
- `GET /api/messages/:id` - Get single message (admin only)
- `PATCH /api/messages/:id/read` - Mark message as read/unread (admin only)
- `DELETE /api/messages/:id` - Delete message (admin only)

### Profile
- `POST /api/profile/upload` - Upload profile image (admin only)
- `GET /api/profile/image` - Get current profile image (public)

## File Uploads

Images are stored locally in the `uploads/` directory:
- Project images: `/uploads/image-{timestamp}-{random}.{ext}`
- Profile images: `/uploads/profile-{timestamp}-{random}.{ext}`
- Static files are served at `/uploads/` endpoint

## Models

### Admin
- `email` (String, required, unique)
- `password` (String, required, hashed)

### Project
- `title` (String, required)
- `description` (String, required)
- `imageUrl` (String)
- `techStack` (Array of Strings)
- `githubUrl` (String)
- `liveUrl` (String)
- `createdAt` (Date, auto-generated)

### Message
- `name` (String, required)
- `email` (String, required)
- `message` (String, required)
- `type` (String, enum: 'contact', 'hire')
- `read` (Boolean, default: false)
- `createdAt` (Date, auto-generated)

## Security

- JWT authentication for admin routes
- Password hashing with bcrypt
- File type validation for uploads
- File size limits (5MB)
- CORS configuration for frontend integration

## Development

The server runs on port 3001 by default. The frontend should be configured to connect to `http://localhost:3001`. 
# Portfolio Project

A full-stack portfolio website with React frontend and Node.js backend.

## Project Structure

```
portfolio/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   └── ...
├── backend/          # Node.js backend API
│   ├── routes/       # API routes
│   ├── models/       # Database models
│   ├── uploads/      # Local file storage
│   └── ...
└── README.md         # This file
```

## Features

- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js with Express, MongoDB, JWT authentication
- **File Uploads**: Local storage for images (projects and profile)
- **Admin Dashboard**: Upload projects and manage messages
- **Contact Form**: Email notifications for messages
- **Responsive Design**: Mobile-friendly interface

## Quick Start

### Backend
```bash
cd backend
npm install
node index.js
```
Backend runs on: http://localhost:3001

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:8081

## Environment Variables

### Backend (.env in backend/ directory)
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=3001
```

### Frontend (.env in frontend/ directory)
```
VITE_API_URL=http://localhost:3001
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin only)
- `POST /api/messages` - Submit contact message
- `POST /api/profile/upload` - Upload profile image (admin only)
- `GET /api/profile/image` - Get profile image

## Admin Access

Visit `/admin` to access the admin dashboard for:
- Uploading projects with images
- Managing contact messages
- Uploading profile images

## Development

- Backend uses nodemon for auto-reload
- Frontend uses Vite for fast development
- Images stored locally in `backend/uploads/`
- CORS configured for frontend-backend communication

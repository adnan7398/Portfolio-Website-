# Portfolio Backend API

## Setup
1. Create a `.env` file with:
   - MONGODB_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - EMAIL_USER
   - EMAIL_PASS
2. Run `npm install`
3. Start server: `node index.js` or `npx nodemon index.js`

## Models
- **Admin**: email, password (hashed)
- **Project**: title, description, imageUrl, techStack, githubUrl, liveUrl, createdAt
- **Message**: name, email, message, type (contact/hire), read, createdAt

## Auth Endpoints
- `POST /api/auth/register` — Register admin (one-time setup)
- `POST /api/auth/login` — Login, returns JWT
- `GET /api/auth/me` — Get current admin info (JWT required)

## Project Endpoints
- `GET /api/projects` — List all projects
- `GET /api/projects/:id` — Get single project
- `POST /api/projects` — Create project (admin, image upload)
- `PUT /api/projects/:id` — Update project (admin, image upload optional)
- `DELETE /api/projects/:id` — Delete project (admin)

## Message Endpoints
- `POST /api/messages` — Send contact/hire me message (public)
- `GET /api/messages` — List all messages (admin)
- `GET /api/messages/:id` — Get single message (admin)
- `PATCH /api/messages/:id/read` — Mark as read/unread (admin)
- `DELETE /api/messages/:id` — Delete message (admin)

## Notes
- All admin endpoints require `Authorization: Bearer <token>` header.
- Project image uploads use multipart/form-data with `image` field.
- Contact/hire me messages send an email notification to the admin. 
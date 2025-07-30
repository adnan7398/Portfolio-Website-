# Deployment Guide

## Backend Deployment (Render)

### 1. Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment**: `Node`

### 2. Environment Variables (Render)
Add these environment variables in Render dashboard:
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=10000
```

### 3. Important Notes for Render
- **Port**: Render uses port 10000, not 3001
- **File Storage**: Render doesn't support persistent local file storage
- **Images**: You'll need to use external image hosting (Cloudinary, AWS S3, etc.)

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com)
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Environment Variables (Vercel)
Add this environment variable in Vercel dashboard:
```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

### 3. Update API URL
Replace `your-render-backend-url.onrender.com` with your actual Render backend URL.

## Image Storage Solution

Since Render doesn't support persistent file storage, you have these options:

### Option 1: Cloudinary (Recommended)
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your credentials
3. Update backend to use Cloudinary instead of local storage

### Option 2: AWS S3
1. Create an S3 bucket
2. Configure CORS
3. Update backend to use S3 for file storage

### Option 3: External Image URLs
Use external image URLs for your projects:
- Upload images to services like Imgur, Cloudinary, or your own hosting
- Update project data to use these URLs directly

## Current Issues & Solutions

### Issue 1: Images not loading
**Problem**: Local file paths don't work on deployed servers
**Solution**: Use external image hosting or placeholder images

### Issue 2: API URL mismatch
**Problem**: Frontend trying to access localhost
**Solution**: Set correct `VITE_API_URL` in Vercel environment variables

### Issue 3: CORS errors
**Problem**: Frontend and backend on different domains
**Solution**: Update CORS configuration in backend

## Quick Fix for Current Deployment

1. **Update Backend CORS** (in `backend/index.js`):
```javascript
app.use(cors({
  origin: ['https://your-vercel-frontend-url.vercel.app', 'http://localhost:8081'],
  credentials: true
}));
```

2. **Update Frontend API URL** (in Vercel environment variables):
```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

3. **Use Placeholder Images** (temporary solution):
- Update project data to use placeholder image URLs
- Use services like `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Project+Name`

## Testing Deployment

1. **Backend Health Check**:
```bash
curl https://your-render-backend-url.onrender.com/api/health
```

2. **Frontend API Test**:
```bash
curl https://your-vercel-frontend-url.vercel.app
```

## Troubleshooting

### Common Issues:
1. **404 Errors**: Check if API routes are correct
2. **CORS Errors**: Verify CORS configuration
3. **Image Loading**: Use external image URLs
4. **Environment Variables**: Ensure they're set correctly in deployment platform

### Debug Steps:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Test environment variables are loaded
4. Confirm CORS is configured properly 
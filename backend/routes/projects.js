const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary (but don't fail if credentials are invalid)
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Cloudinary configured successfully');
} catch (error) {
  console.error('Cloudinary configuration error:', error.message);
}

// Upload project (admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    let imageUrl = '';
    
    if (req.file) {
      try {
        // Try to upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        imageUrl = result.secure_url;
        console.log('Image uploaded to Cloudinary successfully');
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed:', cloudinaryError.message);
        // Use a better placeholder image if Cloudinary fails
        imageUrl = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(title)}`;
        console.log('Using placeholder image due to Cloudinary error');
      }
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    // Create and save the project
    const project = new Project({
      title,
      description,
      imageUrl,
      techStack: techStack ? techStack.split(',').map(tech => tech.trim()) : [],
      githubUrl,
      liveUrl,
    });
    
    const savedProject = await project.save();
    console.log('Project saved successfully:', savedProject.title);
    res.status(201).json(savedProject);
    
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(500).json({ 
      message: 'Failed to create project', 
      error: err.message 
    });
  }
});

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Get single project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project (admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    let updateData = { 
      title, 
      description, 
      techStack: techStack ? techStack.split(',').map(tech => tech.trim()) : [], 
      githubUrl, 
      liveUrl 
    };
    
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        updateData.imageUrl = result.secure_url;
        console.log('Updated image uploaded to Cloudinary successfully');
      } catch (cloudinaryError) {
        console.error('Cloudinary update upload failed:', cloudinaryError.message);
        // Use a better placeholder image if Cloudinary fails
        updateData.imageUrl = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(title)}`;
        console.log('Using placeholder image due to Cloudinary error');
      }
    }
    
    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
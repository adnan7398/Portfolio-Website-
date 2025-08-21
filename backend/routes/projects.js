const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    let imageUrl = '';
    if (req.file) {

      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      imageUrl = '/uploads/placeholder.svg';
    }

    // Parse techStack if it's a string
    let techArray = [];
    if (techStack) {
      if (typeof techStack === 'string') {
        techArray = techStack.split(',').map(tech => tech.trim());
      } else if (Array.isArray(techStack)) {
        techArray = techStack;
      }
    }

    const project = new Project({
      title,
      description,
      imageUrl,
      techStack: techArray,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || ''
    });

    await project.save();
    console.log(`Project saved successfully: ${title}`);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// GET /api/projects - Get all projects (public)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching projects...');
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log(`Found ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      error: 'Failed to fetch projects',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// GET /api/projects/:id - Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const updateData = {
      title,
      description,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || ''
    };

    if (techStack) {
      if (typeof techStack === 'string') {
        updateData.techStack = techStack.split(',').map(tech => tech.trim());
      } else if (Array.isArray(techStack)) {
        updateData.techStack = techStack;
      }
    }
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    if (project.imageUrl && !project.imageUrl.includes('placeholder.svg')) {
      const imagePath = path.join(__dirname, '..', project.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router; 
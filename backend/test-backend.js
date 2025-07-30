const mongoose = require('mongoose');
require('dotenv').config();

async function testBackend() {
  console.log('🧪 Testing Backend...');
  
  // Test MongoDB connection
  try {
    console.log('📡 Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Test Project model
    const Project = require('./models/Project');
    const projectCount = await Project.countDocuments();
    console.log(`📊 Found ${projectCount} projects in database`);
    
    // Test uploads directory
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(__dirname, 'uploads');
    
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      console.log(`📁 Uploads directory exists with ${files.length} files:`, files);
    } else {
      console.log('❌ Uploads directory does not exist');
    }
    
    await mongoose.disconnect();
    console.log('✅ All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testBackend(); 
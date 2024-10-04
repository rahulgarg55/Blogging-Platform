const express = require('express'); 
const dotenv = require('dotenv');  
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');  
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();  

// Use CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Blog routes
app.use('/api/blogs', blogRoutes);  

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express'); 
const dotenv = require('dotenv');  
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');  

dotenv.config();
connectDB();    

const app = express();  
app.use(express.json());    

app.use('/api/blogs', blogRoutes);  

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
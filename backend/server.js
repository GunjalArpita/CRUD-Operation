import express from 'express';
import dbcon from './utils/db.js'; // Import the dbcon function from the db.js file
import dotenv from 'dotenv';  
import routers from './routes/routes.js';
import cors from 'cors';
dotenv.config();

const app = express();

// MongoDB connection
dbcon();
app.use(express.json());
app.use(cors());
app.use('/api', routers);
app.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT);
});

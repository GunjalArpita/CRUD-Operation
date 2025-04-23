import express from 'express';
import dbcon from './utils/db.js';
import dotenv from 'dotenv';
import routers from './routes/routes.js';
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js';
dotenv.config();

const app = express();

// MongoDB connection
dbcon();

// Updated CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']; // Add both origins
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/api', routers);
app.use('/api/admin', adminRouter); // Add admin routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});

import mongoose from "mongoose";

const dbcon = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('mongodb is connected');
    } catch (error) {
        console.error('error:', error);
    }
};

export default dbcon;
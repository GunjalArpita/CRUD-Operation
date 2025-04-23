import mongoose from "mongoose";

const dbcon = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('mongodb is connected');
    } catch (error) {
        console.error('error:', error);
        process.exit(1); // Terminate the process on connection failure
    }
};

export default dbcon;
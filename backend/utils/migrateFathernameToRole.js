import mongoose from "mongoose";
import UserModels from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const migrateFathernameToRole = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const users = await UserModels.find();
        for (const user of users) {
            if (user.fathername) {
                user.role = user.fathername; // Copy fathername to role
                user.fathername = undefined; // Remove fathername
                await user.save();
            }
        }

        console.log("Migration completed: fathername -> role");
        process.exit(0);
    } catch (error) {
        console.error("Error during migration:", error);
        process.exit(1);
    }
};

migrateFathernameToRole();
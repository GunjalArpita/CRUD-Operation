import bcrypt from "bcrypt";
import AdminModel from "../models/Admin.js";
import dbcon from "./db.js";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables from .env

const createAdmin = async () => {
    try {
        await dbcon(); // Connect to the database

        const username = "admin"; // Set your desired username
        const plainPassword = "admin123"; // Set your desired password

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create the admin user
        const admin = new AdminModel({ username, password: hashedPassword });
        await admin.save();

        console.log("Admin user created successfully!");
        console.log(`Username: ${username}`);
        console.log(`Password: ${plainPassword}`);
        process.exit(0); // Exit the script
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1); // Exit with error
    }
};

createAdmin();
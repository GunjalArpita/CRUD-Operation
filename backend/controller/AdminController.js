import AdminModel from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await AdminModel.findOne({ username });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("Error in AdminLogin:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { AdminLogin };

import UserModels from "../models/User.js";

const Createuser = async (req, res) => {
    try {
        const { name, role, email, phone } = req.body; // Ensure all required fields are extracted

        // Validate required fields
        if (!name || !role || !email || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const NewUser = new UserModels({ name, role, email, phone });
        await NewUser.save();

        res.status(200).json({ success: true, message: 'User created successfully', user: NewUser });
    } catch (error) {
        console.error("Error in Createuser:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Read API
const GetUser = async (req, res) => {
    try {
        const users = await UserModels.find(); // Renamed variable to 'users' for clarity
        if (users.length === 0) { // Check for empty array instead of null
            return res.status(404).json({ success: false, message: 'no users found' });
        }
        res.status(200).json({ success: true, users }); // Return the users array
    } catch (error) {
        console.error("Error in GetUser:", error); // Log the error
        return res.status(500).json({ success: false, message: 'internal server error' });
    }
};

// Update user
const UpdateUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        const updatedUser = await UserModels.findByIdAndUpdate(UserId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, message: 'user updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'internal server error' });
    }
};

// Delete user
const DeleteUser = async (req, res) => {
    try {
        const UserId = req.params.id;
        const deleteUser = await UserModels.findByIdAndDelete(UserId);
        if (!deleteUser) {
            return res.status(404).json({ success: false, message: "user not found" });
        }
        res.status(200).json({ success: true, message: "user deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'internal server error' });
    }
};

export { Createuser, GetUser, UpdateUser, DeleteUser };
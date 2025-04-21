import UserModels from "../models/User.js";

const Createuser = async (req, res) => {
    try {
        const { name, fathername, email, phone } = req.body;
        const NewUser = new UserModels({ name, fathername, email, phone });

        await NewUser.save();
        res.status(200).json({ success: true, message: 'user created successfully', NewUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'internal server error' });
    }
};

// Read API
const GetUser = async (req, res) => {
    try {
        const user = await UserModels.find();
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, users: user });
    } catch (error) {
        console.log(error);
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
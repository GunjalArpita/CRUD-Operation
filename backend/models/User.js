import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Added validation
        trim: true
    },
    role: { // Replaced fathername with role
        type: String,
        required: true, // Added validation
        trim: true
    },
    email: {
        type: String,
        required: true, // Added validation
        unique: true, // Ensure email is unique
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email format validation
    },
    phone: {
        type: String,
        required: true, // Added validation
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Phone number format validation
    }
}, { timestamps: true });

const UserModels = mongoose.model('user', userSchema);

export default UserModels;
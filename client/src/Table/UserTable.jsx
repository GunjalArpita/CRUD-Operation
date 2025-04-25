import React, { useState, useEffect } from 'react';
import Table from '../Component/Table';
import AddUser from '../Component/AddUser';
import UpdatedUser from '../Component/UpdatedUser';
import DeleteUser from '../Component/DeleteUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import './UserTable.css'; // Import the CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function UserTable() {
    const [updateid, setUpdateid] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [value, setValue] = useState({
        name: "",
        role: "",
        email: "",
        phone: ""
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function FetchData() {
            try {
                const fetchUser = await axios.get('http://localhost:4000/api/get');
                const response = fetchUser.data;
                if (response.success && Array.isArray(response.users)) {
                    setData(response.users);
                } else {
                    setData([]);
                    setError('No users found or invalid response from server.');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError('Failed to fetch data. Please check the backend server.');
            } finally {
                setLoading(false);
            }
        }

        FetchData();
    }, []);

    const handleDeleteUser = (deleteid) => {
        setDeleteId(deleteid);
    };

    const handleDelete = async () => {
        try {
            const deleteuser = await axios.delete(`http://localhost:4000/api/delete/${deleteId}`);
            const response = deleteuser.data;
            if (response.success) {
                toast.success(response.message);
                setData(prevData => prevData.filter(user => user._id !== deleteId));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdatedUser = (id) => {
        setUpdateid(id);
        const userToUpdate = data.find(user => user._id === id);
        if (userToUpdate) {
            setValue(userToUpdate);
        }
    };

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateUser = await axios.put(`http://localhost:4000/api/update/${updateid}`, value);
            const response = updateUser.data;
            if (response.success) {
                toast.success(response.message);

                // Fetch updated data from the server to ensure consistency
                const fetchUser = await axios.get('http://localhost:4000/api/get');
                const updatedResponse = fetchUser.data;
                if (updatedResponse.success && Array.isArray(updatedResponse.users)) {
                    setData(updatedResponse.users); // Update the state with the latest data
                }
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user. Please try again.");
        }
    };

    const handleAddUser = (newUser) => {
        setData(prevData => [...prevData, newUser]);
    };

    return (
        <div className="dashboard-page">
            <div className="container mt-5">
                <h2 className="text-center mb-4 text-white">Employee Management Dashboard</h2>
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <Table UpdatedUser={handleUpdatedUser} DeleteUser={handleDeleteUser} data={data}></Table>
                )}
                <AddUser handleAddUser={handleAddUser}></AddUser>
                <UpdatedUser value={value} handleChange={handleChange} handleSubmit={handleSubmit}></UpdatedUser>
                <DeleteUser handleDelete={handleDelete}></DeleteUser>
            </div>
        </div>
    );
}


import React, { useState, useEffect } from 'react';
import Table from '../Component/Table';
import AddUser from '../Component/AddUser';
import UpdatedUser from '../Component/UpdatedUser';
import DeleteUser from '../Component/DeleteUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function UserTable() {
    const [updateid, setUpdateid] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [value, setValue] = useState({
        name: "",
        fathername: "",
        email: "",
        phone: ""
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

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
                setLoading(false); // Stop loading after fetch
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
                setData(prevData => prevData.map(user => user._id === updateid ? { ...user, ...value } : user));
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleAddUser = (newUser) => {
        setData(prevData => [...prevData, newUser]); // Dynamically update the table
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Management</h2>
            {loading ? (
                <p>Loading...</p> // Display loading message
            ) : error ? (
                <p className="text-danger text-center">{error}</p> // Display error message
            ) : (
                <Table UpdatedUser={handleUpdatedUser} DeleteUser={handleDeleteUser} data={data}></Table>
            )}
            <AddUser handleAddUser={handleAddUser}></AddUser>
            <UpdatedUser value={value} handleChange={handleChange} handleSubmit={handleSubmit}></UpdatedUser>
            <DeleteUser handleDelete={handleDelete}></DeleteUser>
        </div>
    );
}


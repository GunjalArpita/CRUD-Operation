import React, { useState, useEffect } from 'react'
import Table from '../Component/Table'
import AddUser from '../Component/AddUser'
import UpdatedUser from '../Component/UpdatedUser'
import DeleteUser from '../Component/DeleteUser'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function UserTable() {
    const [updateid, setUpdateid] = useState()
    const [deleteId, setDeleteId] = useState()
    const [value, setValue] = useState({
        name: "",
        fathername: "",
        email: "",
        phone: ""
    })
const [data, setData] = useState([])

    useEffect(() => {
        async function FetchData() {
            try {
                const fetchUser = await axios.get('http://localhost:4000/api/get')
                const response = fetchUser.data;
                console.log(response); // Log the response to debug the structure
                if (response.success && Array.isArray(response.users)) {
                    setData(response.users)
                } else {
                    setData([]) // Handle the case where response.users is not an array
                }
            } catch (error) {
                console.log(error)
            }
        }

        FetchData()
    }, []) // Ensure the dependency array is empty to prevent infinite loop

    const handleDeleteUser = (deleteid) => {
        setDeleteId(deleteid)
    }

    const handleDelete = async () => {
        try {
            const deleteuser = await axios.delete(`http://localhost:4000/api/delete/${deleteId}`)
            const response = deleteuser.data;
            console.log(response);
            if (response.success) {
                toast.success(response.message)
                setData(data.filter(user => user._id !== deleteId)) // Update state
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdatedUser = (id) => {
        setUpdateid(id)
    }

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateUser = await axios.put(`http://localhost:4000/api/update/${updateid}`, value)
            const response = updateUser.data;
            if (response.success) {
                toast.success(response.message)
                console.log(response);
                setData(data.map(user => user._id === updateid ? { ...user, ...value } : user)) // Update state
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddUser = async (newUser) => {
        try {
            const adduser = await axios.post('http://localhost:4000/api/create', newUser)
            const response = adduser.data;
            if (response.success && response.user) {
                toast.success(response.message)
                setData(prevData => [...prevData, response.user]) // Update state
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Table UpdatedUser={handleUpdatedUser} DeleteUser={handleDeleteUser} data={data}></Table>
            <AddUser handleAddUser={handleAddUser}></AddUser>
            <UpdatedUser value={value} handleChange={handleChange} handleSubmit={handleSubmit}></UpdatedUser>
            <DeleteUser handleDelete={handleDelete}></DeleteUser>
        </>
    )
}


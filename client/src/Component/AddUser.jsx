import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddUser({ handleAddUser }) {
    const [value, setValue] = useState({
        name: '',
        role: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const CloseRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/create', value);
            if (response.data.success) {
                toast.success(response.data.message);
                CloseRef.current.click(); // Close the modal
                handleAddUser(response.data.user); // Update parent state with new user
                setValue({ name: '', role: '', email: '', phone: '' }); // Reset form
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to add user. Please try again.");
        }
    };

    return (
        <div className='modal fade' id='addEmployeeModal'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='modal-header bg-success text-white'>
                            <h4 className='modal-title'>Add Employee</h4>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-hidden='true' ref={CloseRef}></button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group mb-3'>
                                <label>Name</label>
                                <input type='text' value={value.name} name='name' onChange={handleChange} className='form-control' required />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Role</label>
                                <input type='text' value={value.role} name='role' onChange={handleChange} className='form-control' required />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Email</label>
                                <input type='email' value={value.email} name='email' onChange={handleChange} className='form-control' required />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Phone</label>
                                <input type='text' value={value.phone} name='phone' onChange={handleChange} className='form-control' required />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                            <button type='submit' className='btn btn-success'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}



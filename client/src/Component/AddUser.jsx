import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser({ handleAddUser }) {

    const [value, setValue] = useState({
        name: '',
        fathername: '',
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
            const adduser = await axios.post('http://localhost:4000/api/create', value);
            const response = adduser.data;
            if (response.success && response.user) {
                toast.success(response.message);
                CloseRef.current.click();
                handleAddUser(response.user); // Update state in parent component
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='modal fade' id='addEmployeeModal'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <form onSubmit={handleSubmit}>
                            <div className='modal-header'>
                                <h4 className='modal-title'>Add Employee</h4>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-hidden='true' ref={CloseRef}>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type='text' value={value.name} name='name' onChange={handleChange} className='form-control' required ></input>
                                </div>
                                <div className='form-group'>
                                    <label>Father</label>
                                    <input type='text' value={value.fathername} name='fathername' onChange={handleChange} className='form-control' required ></input>
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='email' value={value.email} name='email' onChange={handleChange} className='form-control' required ></input>
                                </div>
                                <div className='form-group'>
                                    <label>Phone</label>
                                    <input type='text' value={value.phone} name='phone' onChange={handleChange} className='form-control' required ></input>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <input type='button' className='btn btn-default' data-bs-dismiss='modal' value="Cancel"></input>
                                <input type='submit' className='btn btn-primary' value="Add" data-bs-dismiss='modal'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}



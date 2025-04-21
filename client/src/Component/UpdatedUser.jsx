import React from 'react'

export default function UpdatedUser({ value, handleChange, handleSubmit }) {
    return (
        <>
            <div className='modal fade' id='editEmployeeModal'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <form onSubmit={handleSubmit}>
                            <div className='modal-header'>
                                <h4 className='modal-title'>Update User</h4>
                                <button type='button' className='close' data-bs-dismiss='modal' aria-hidden='true'>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type='text' value={value.name} name='name' onChange={handleChange} className='form-control'></input>
                                </div>
                                <div className='form-group'>
                                    <label>Father</label>
                                    <input type='text' value={value.fathername} name='fathername' onChange={handleChange} className='form-control'></input>
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='text' value={value.email} name='email' onChange={handleChange} className='form-control'></input>
                                </div>
                                <div className='form-group'>
                                    <label>Phone</label>
                                    <input type='text' value={value.phone} name='phone' onChange={handleChange} className='form-control'></input>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <input type='button' className='btn btn-default' data-bs-dismiss='modal' value="Cancel"></input>
                                <input type='submit' className='btn btn-primary' value='Update' data-bs-dismiss='modal'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


import React, { useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function DeleteUser({ handleDelete }) {
    const closeRef = useRef(); // Reference to close the modal

    const handleDeleteAndClose = () => {
        handleDelete(); // Call the delete function
        closeRef.current.click(); // Close the modal
    };

    return (
        <div id='deleteEmployeeModal' className='modal fade'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <form>
                        <div className='modal-header bg-danger text-white'>
                            <h4 className='modal-title'>Delete Employee</h4>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-hidden='true' ref={closeRef}></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete this record?</p>
                            <p className='text-warning'><small>This action cannot be undone.</small></p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                            <button type='button' className='btn btn-danger' onClick={handleDeleteAndClose}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;

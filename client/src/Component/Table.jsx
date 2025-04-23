import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Table({ UpdatedUser, DeleteUser, data }) {
    return (
        <div className='container'>
            <div className='table-wrapper'>
                <div className='table-title bg-primary text-white p-3 rounded'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <h2>Manage <b>Employees</b></h2>
                        </div>
                        <div className='col-sm-6 text-end'>
                            <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#addEmployeeModal'>
                                <i className='fas fa-plus'></i> <span>Add New Employee</span>
                            </button>
                        </div>
                    </div>
                </div>
                <table className='table table-striped table-hover mt-3'>
                    <thead className='table-dark'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((elem, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{elem?.name}</td>
                                <td>{elem?.role}</td>
                                <td>{elem?.email}</td>
                                <td>{elem?.phone}</td>
                                <td>
                                    <button className='btn btn-warning btn-sm me-2' data-bs-toggle='modal' data-bs-target='#editEmployeeModal' onClick={() => UpdatedUser(elem._id)}>
                                        <i className='fas fa-edit' data-bs-toggle='tooltip' title='Edit'></i>
                                    </button>
                                    <button className='btn btn-danger btn-sm' data-bs-toggle='modal' data-bs-target='#deleteEmployeeModal' onClick={() => DeleteUser(elem._id)}>
                                        <i className='fas fa-trash' data-bs-toggle='tooltip' title='Delete'></i>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



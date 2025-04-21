import React from 'react'
import axios from 'axios'

export default function Table({ UpdatedUser, DeleteUser, data }) {
    return (
        <>
            <div className='container'>
                <div className='table-wrapper'>
                    <div className='table-title'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <h2>Manage <b>Employees</b></h2>
                            </div>
                            <div className='col-sm-6'>
                                <a href='#' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#addEmployeeModal'>
                                    <i className='material-icons'>&#xE147;</i> <span>Add new Employee</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Father Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((elem, index) => {
                                if (!elem) return null; // Skip undefined elements
                                return (
                                    <tr key={index}>
                                        <td></td>
                                        <td>{elem?.name}</td>
                                        <td>{elem?.fathername}</td>
                                        <td>{elem?.email}</td>
                                        <td>{elem?.phone}</td>
                                        <td>
                                            <a href='#' className='edit cursor-pointer' data-bs-toggle='modal' data-bs-target='#editEmployeeModal' onClick={() => UpdatedUser(elem._id)}>
                                                <i className='material-icons' data-bs-toggle='tooltip' title='Edit'>&#xE254;</i>
                                            </a>
                                            <a href='#' className='delete cursor-pointer' data-bs-toggle='modal' data-bs-target='#deleteEmployeeModal' onClick={() => DeleteUser(elem._id)}>
                                                <i className='material-icons' data-bs-toggle='tooltip' title='Delete'>&#xE872;</i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }) : <tr><td colSpan="6">No data available</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}



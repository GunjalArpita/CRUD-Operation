import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Table({ UpdatedUser, DeleteUser, data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        // Synchronize filteredData with the updated data prop
        setFilteredData(data);
    }, [data]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter data based on the first 2-3 characters matching name or surname
        const filtered = data.filter((employee) => {
            const fullName = employee.name.toLowerCase(); // Combine name, surname, and father name
            const nameParts = fullName.split(' '); // Split into parts
            return nameParts.some((part) => part.startsWith(value)); // Check if any part starts with the search term
        });
        setFilteredData(filtered);
    };

    return (
        <div className='container'>
            <div className='top-bar d-flex justify-content-between align-items-center mb-4'>
                <button className='btn btn-success add-btn' data-bs-toggle='modal' data-bs-target='#addEmployeeModal'>
                    <i className='fas fa-plus'></i> <span>Add Employee</span>
                </button>
                <div className='search-bar'>
                    <input
                        type='text'
                        className='form-control search-input'
                        placeholder='Search by name...'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className='table-wrapper'>
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
                        {filteredData.length > 0 ? (
                            filteredData.map((elem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{elem?.name}</td>
                                    <td>{elem?.role}</td>
                                    <td>{elem?.email}</td>
                                    <td>{elem?.phone}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning btn-sm me-2'
                                            data-bs-toggle='modal'
                                            data-bs-target='#editEmployeeModal'
                                            onClick={() => UpdatedUser(elem._id)}
                                        >
                                            <i className='fas fa-edit' data-bs-toggle='tooltip' title='Edit'></i>
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm'
                                            data-bs-toggle='modal'
                                            data-bs-target='#deleteEmployeeModal'
                                            onClick={() => DeleteUser(elem._id)}
                                        >
                                            <i className='fas fa-trash' data-bs-toggle='tooltip' title='Delete'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
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



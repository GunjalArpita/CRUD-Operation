import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdatedUser({ value, handleChange, handleSubmit }) {
    const closeRef = useRef(); // Reference to close the modal

    const handleSubmitAndClose = (e) => {
        handleSubmit(e); // Call the update function
        closeRef.current.click(); // Close the modal
    };

    return (
        <div className="modal fade" id="editEmployeeModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmitAndClose}>
                        <div className="modal-header bg-warning text-white">
                            <h4 className="modal-title">Update User</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-hidden="true"
                                ref={closeRef}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={value.name}
                                    name="name"
                                    onChange={handleChange}
                                    className="form-control"
                                ></input>
                            </div>
                            <div className="form-group mb-3">
                                <label>Role</label> {/* Updated label to Role */}
                                <input
                                    type="text"
                                    value={value.role} // Updated to use role
                                    name="role"
                                    onChange={handleChange}
                                    className="form-control"
                                ></input>
                            </div>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input
                                    type="text"
                                    value={value.email}
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control"
                                ></input>
                            </div>
                            <div className="form-group mb-3">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    value={value.phone}
                                    name="phone"
                                    onChange={handleChange}
                                    className="form-control"
                                ></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-warning">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import UserTable from './Table/UserTable';
import PrivateRoute from './utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';

export default function App() {
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <UserTable />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
}



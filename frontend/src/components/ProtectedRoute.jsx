import React from 'react';
import { Navigate } from 'react-router-dom';

// Placeholder for actual auth logic
const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

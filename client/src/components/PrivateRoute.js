import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { currUser } = useAuth();

    return currUser ? children : <Navigate to="/login" />
}

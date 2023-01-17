import React from "react";
import Register from "./Register";
import Login from "./Login"
import TodoPage from "./TodoPage";
import PasswordReset from "./PasswordReset";
import BoxWrapper from './BoxWrapper'
import { AuthProvider } from '../contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute}  from "./PrivateRoute";

function App() {
	return (
        <>
        <AuthProvider>
            <Routes>
                <Route path="/register" element={
                    <BoxWrapper>
                        <Register />
                    </BoxWrapper>} />
                <Route path="/login" element={
                    <BoxWrapper>
                        <Login />
                    </BoxWrapper>} />
                <Route path="/reset" element={
                    <BoxWrapper>
                        <PasswordReset />
                    </BoxWrapper>} />
                <Route path="/" element={
                    <PrivateRoute>
                        <TodoPage />
                    </PrivateRoute>} />
            </Routes>
        </AuthProvider>
        </>
    )
}

export default App;

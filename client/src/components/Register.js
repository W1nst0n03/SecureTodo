import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
    const { register } = useAuth();
    // STATE VARIABLES
    const [username, serUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(true);
    const [loading, setLoading] = useState(false);

    const tryRegister = async (event) =>  {
        event.preventDefault();
        setAlert('');

        // Check password equality
        if (password !== confirmPassword) {
            setDanger(true);
            return setAlert('Passwords do not match');
        }

        try {
            setAlert('');
            setLoading(true);
            await register(email, password, username);
            setDanger(false);
            setAlert('Account created successfully');
        } catch(err) {
            console.log({err});
            setDanger(true);
            // Set Alert to corresponding error
            switch (err.code) {
                case 'auth/weak-password':
                    setAlert('Password should be at least 6 characters long');
                    break;
                case 'auth/email-already-in-use':
                    setAlert('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setAlert('Invalid email');
                    break;
                default:
                    setAlert('Failed to create account');
                    break;
            }
        }

        setLoading(false);
    }

    return (
        <>
        <Card >
            <Card.Body>
            <h1 className='text-center mb-4'>Register Account</h1>
            <Form onSubmit={tryRegister}>
                {alert && <Alert className='text-center' variant={danger ? 'danger' : 'success'}>{alert}</Alert>}
                <FloatingLabel controlId="floatingInput" label="Name" className='mb-3'>
                    <Form.Control type="first-name"
                    onChange={(e) => serUsername(e.target.value)} 
                    required
                    placeholder='Name'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Email Address" className='mb-1'>
                    <Form.Control type="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder='Email'/>
                </FloatingLabel>
                <p className='w-100 text-center mb-1' type='button' onClick={() => setShowPassword(!showPassword)}>Show Password</p> 
                <FloatingLabel controlId="floatingInput" label="Password" className='mb-3'>
                    <Form.Control type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    placeholder='Password'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Name" className='mb-3'>
                    <Form.Control type={showPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required
                    placeholder='Confirm Password'/>
                </FloatingLabel>
                <Button disabled={loading} className="w-100" type='Submit'>Register Account</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
        </div>
        </>
    )
}

import React, { useState } from 'react';
import { Card, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    // STATE VARIABLES
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(true);
    const [loading, setLoading] = useState(false);

    const tryLogin = async (event) =>  {
        event.preventDefault();

        setAlert('');

        try {
            setLoading(true);
            await login(email, password);
            navigate("/");
        } catch(err) {
            console.log({err});
            setDanger(true);
            // Set Alert to corresponding error code
            switch (err.code) {
                case 'auth/wrong-password':
                    setAlert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    setAlert('User does not exist');
                    break;
                default:
                    setAlert('Failed to log in');
                    break;
            }
        }

        setLoading(false);
    }

    return (
        <>
        <Card >
            <Card.Body>
            <h1 className='text-center mb-4'>Log In</h1>
            <Form onSubmit={tryLogin}>
                {alert && <Alert className='text-center' variant={danger ? 'danger' : 'success'}>{alert}</Alert>}
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
                <Button disabled={loading} className="w-100" type='Submit'>Log In</Button>
            </Form>
            <div className='w-100 text-center mt-2'>
                <Link to='/reset'>Forgot Password?</Link>
            </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an Account? <Link to='/register'>Register</Link>
        </div>
        </>
    )
}

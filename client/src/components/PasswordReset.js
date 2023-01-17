import React, { useState } from 'react';
import { Card, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PasswordReset() {
    const { passwordReset } = useAuth();
    // STATE VARIABLES
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState('');
    const [danger, setDanger] = useState(true);
    const [loading, setLoading] = useState(false);

    const tryReset = async (event) =>  {
        event.preventDefault();

        setAlert('');

        try {
            setLoading(true);
            await passwordReset(email);
            setDanger(false);
            setAlert('Check your inbox for further Instructions');
        } catch(err) {
            console.log({err});
            setDanger(true);
            // Set Alert to corresponding error code
            switch (err.code) {
                case 'auth/user-not-found':
                    setAlert('User does not exist');
                    break;
                default:
                    setAlert('Failed to Send Reset Email');
                    break;
            }
        }

        setLoading(false);
    }

    return (
        <>
        <Card >
            <Card.Body>
            <h1 className='text-center mb-4'>Reset Password</h1>
            <Form onSubmit={tryReset}>
                {alert && <Alert className='text-center' variant={danger ? 'danger' : 'success'}>{alert}</Alert>}
                <FloatingLabel controlId="floatingInput" label="Email Address" className='mb-3'>
                    <Form.Control type="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder='Email'/>
                </FloatingLabel>
                <Button disabled={loading} className="w-100" type='Submit'>Reset Password</Button>
            </Form>
            <div className='w-100 text-center mt-2'>
                <Link to='/login'>Log In</Link>
            </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an Account? <Link to='/register'>Register</Link>
        </div>
        </>
    )
}

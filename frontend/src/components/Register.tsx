import React, { useState, useContext, type ChangeEvent, type FormEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<{ username: string; email: string; password: string }>({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { register } = useContext(AuthContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await register(formData.username, formData.email, formData.password);
            setSuccess('Registration successful! Redirecting to login...');
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'Registration failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <button type="submit">Register</button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
        </form>
    );
};

export default Register;

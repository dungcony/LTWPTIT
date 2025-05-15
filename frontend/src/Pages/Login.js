import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8080/V1/check_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            if (res.ok) {
                const user = await res.json();
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/Home');
            } else if (res.status === 401) {
                setError("sai tk hoac mk")
            } else {
                setError("cos looix xayr ra")
            }

        }
        catch (error) {
            console.error("loi", error)
            setError("not conection")
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;
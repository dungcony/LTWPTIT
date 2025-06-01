import axios from '../utils/axios_edit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("username", username);
        console.log("password", password);
        try {
            await axios.post('/V1/user/login', {
                username,
                password
            })
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    localStorage.setItem('token', res.token);
                    navigate('/Home');
                })
                .catch(err => {
                    console.error("Error:", err);
                    setError("Invalid username or password");
                });
        }
        catch {
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
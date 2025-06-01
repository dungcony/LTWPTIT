import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from '../utils/axios_edit';

const Users = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy danh sách blog
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await axios.get("/V1/user/list")
                    .then(res => {
                        setUserList(res)
                        console.log("User List:", userList);
                    })
                    .catch(err => {
                        setError(err.message)
                    }
                    );
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Danh sách User</h2>
            <ul>
                {userList.map((item) => (
                    <li key={item._id}>
                        <Link to={`/user/${item._id}`}>
                            {item.username}
                        </Link>
                    </li>
                ))}
            </ul>

            <Outlet />
        </div>
    );
}

const Userr = () => {
    const id = useParams()

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log('hehehe')
        console.log("Delete User ID:", id);
        try {
            await axios.get(`/V1/user/delete/${id}`)
                .then(res => {
                    console.log("User List:");
                })
                .catch(err => {
                    //setError(err.message)
                }
                );
        } catch (error) {

        }
    }
    return (
        <>
            <form onSubmit={handleDelete}>
                <button type='submit'>delete</button>
            </form>
        </>
    )
}

export { Users, Userr };

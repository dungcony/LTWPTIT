import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import axios from "../utils/axios_edit";

const Blog = () => {
    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy danh sách blog
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await axios.get("/V1/blog/list")
                    .then(res => {
                        setBlogList(res)
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
    }, []);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Danh sách Blog</h2>
            <ul>
                {blogList.map((item) => (
                    <li key={item._id}>
                        <Link to={`/blog/${item._id}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <Outlet />
        </div>
    );
};

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [like, setLike] = useState('like');

    const userId = JSON.parse(localStorage.getItem('user'))?._id || null;

    const handleLike = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/V1/blog/like', {
                userId: userId,
                blogId: id
            })
                .then(res => {
                    console.log(res)
                    if (res === 'no') {
                        alert("đã like");
                    }
                    setLike('unlike');
                });

            e.target.reset();

            setBlog(prev => ({
                ...prev,
                Comment: [...prev.Comment, { desc: comment, user_id: userId }]
            }));
        } catch (err) {
            console.error(err);
            alert("Lỗi khi like");
        }
    }

    // const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                await axios.get(`/V1/blog/${id}/${userId}`)
                    .then(res => {
                        console.log(res.isLike);
                        setBlog(res.blog);
                        if (res.isLike) {
                            setLike('unlike');
                        } else {
                            setLike('like');
                        }
                    })
                    .catch(err => {
                        setError(err.message);
                    });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetail();
    }, [id, userId]);

    const handleComment = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/V1/blog/add_comment', {
                userId: userId,
                blogId: id,
                comment
            });
            alert("Bình luận đã được thêm thành công");
            e.target.reset();
            // Cập nhật lại danh sách bình luận
            setBlog(prev => ({
                ...prev,
                Comment: [...prev.Comment, { desc: comment, user_id: userId }]
            }));
        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm bình luận");
        }
    }

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!blog) return null;



    return (
        <div style={{ marginTop: 20 }}>
            <h3>Chi tiết bài viết</h3>
            <p>
                <strong>Tiêu đề:</strong> {blog.name}
            </p>
            <p>
                <strong>Mô tả:</strong> {blog.desc}
            </p>
            <p>
                <strong>Người đăng:</strong> {blog.user_id ? blog.user_id.name : "Chưa có người đăng"}
            </p>
            <div>
                <strong>Comment:</strong>
                {blog.Comment && blog.Comment.length > 0 ? (
                    <ul>
                        {blog.Comment.map((comment) => (
                            <li key={comment._id}>{comment.desc}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Chưa có bình luận nào.</p>
                )}
            </div>


            <form onSubmit={handleComment}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit">Thêm bình luận</button>
            </form>

            {userId === blog.userId &&
                (<button type="submit">
                    <Link to={`/blog/edit/${id}`}>Edit</Link>
                </button>)}

            <div>
                <form onSubmit={handleLike}>
                    <button type="submid" >{like}</button>
                </form>
            </div>
        </div>
    );
};

export { Blog, BlogDetail };

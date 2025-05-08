import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

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
                const response = await fetch("http://localhost:8080/V1/blog");
                if (!response.ok) throw new Error("Lỗi khi gọi API danh sách");
                const result = await response.json();
                setBlogList(result);
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
                    <li key={item.id}>
                        <Link to={item.id}>
                            {item.title}
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

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/V1/blog/${id}`);
                if (!response.ok) throw new Error("Không tìm thấy bài viết");
                const result = await response.json();
                setBlog(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetail();
    }, [id]);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!blog) return null;

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Chi tiết bài viết</h3>
            <p>
                <strong>Tiêu đề:</strong> {blog.title}
            </p>
            <p>
                <strong>Mô tả:</strong> {blog.desc}
            </p>
        </div>
    );
};

export { Blog, BlogDetail };

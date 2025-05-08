import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const Blog = () => {
    const [blogList, setBlogList] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy danh sách blog
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("https://hz2hkh-8080.csb.app/api/blogs");
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

    // Lấy chi tiết blog
    const fetchBlogDetail = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://hz2hkh-8080.csb.app/api/blogs/${id}`
            );
            if (!response.ok) throw new Error("Không tìm thấy bài viết");
            const result = await response.json();
            setSelectedBlog(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Danh sách Blog</h2>
            {blogList.length === 0 ? (
                <p>Không có bài viết nào</p>
            ) : (
                <ul>
                    {blogList.map((item) => (
                        <li key={item.id}>
                            <button onClick={() => fetchBlogDetail(item.id)}>
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {selectedBlog && (
                <div style={{ marginTop: 20 }}>
                    <h3>Chi tiết bài viết</h3>
                    <p>
                        <strong>Tiêu đề:</strong> {selectedBlog.title}
                    </p>
                    <p>
                        <strong>Mô tả:</strong> {selectedBlog.desc}
                    </p>
                </div>
            )}
        </div>
    );
};

export { Blog }; 
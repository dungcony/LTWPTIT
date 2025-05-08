import React, { useEffect, useState } from "react";

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

    // Lấy chi tiết blog
    const fetchBlogDetail = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `http://localhost:8080/V1/blog/${id}`
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
            <ul>
                {blogList.map((item) => (
                    <li key={item.id}>
                        <button onClick={() => fetchBlogDetail(item.id)}>
                            {item.title}
                        </button>
                    </li>
                ))}
            </ul>

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
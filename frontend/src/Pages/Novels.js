import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const Novels = () => {
    const [novelList, setNovelList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:8080/V1/novels")
                if (response.ok) {
                    const res = await response.json()
                    setNovelList(res)

                } else {
                    setError("Lỗi khi lấy danh sách truyện")
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Danh sách truyện</h2>
            <ul>
                {novelList.map((item) => (
                    <li key={item.id}>
                        <Link to={`/novel/${item.id}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    )
}

const NovelDetail = () => {
    const { id } = useParams()
    const [novel, setNovel] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDataDetail = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`http://localhost:8080/V1/novel/${id}`)
                if (response.ok) {
                    const res = await response.json()
                    setNovel(res)
                } else {
                    setError("Lỗi khi lấy thông tin truyện")
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDataDetail()
    }, [id])

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!novel) return <p>Không tìm thấy truyện</p>;

    console.log(novel)

    return (
        <div>
            <h2>{novel.name}</h2>
            <p>Miêu tả: {novel.desc}</p>
            <p>Tác giả: {novel.auth}</p>
        </div>
    )
}

export { Novels, NovelDetail }
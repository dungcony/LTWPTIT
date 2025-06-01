
import axios from "../utils/axios_edit";
import { useEffect, useState } from "react";
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
                await axios.get("/V1/novel/list")
                    .then(res => {
                        setNovelList(res)
                    })
                    .catch(err => {
                        setError(err.message)
                    })
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
    const [comment, setComment] = useState('')

    useEffect(() => {
        const fetchDataDetail = async () => {
            setLoading(true)
            setError(null)
            try {
                await axios.get(`/V1/novel/${id}`)
                    .then(res => {
                        setNovel(res)
                    })
                    .catch(err => {
                        setError(err.message)
                    })

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDataDetail()
    }, [id])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(comment)
        try {
            axios.post(`/V1/novel/set_comment/${id}`, {
                comment: comment
            })
                .then(res => {
                    if (res.status === 200) {
                        setNovel(prevNovel => ({
                            ...prevNovel,
                            comment: [...(prevNovel.comment || []), comment]
                        }));
                        setComment(''); // Clear the input field after submission
                    } else {
                        setError("Lỗi khi gửi bình luận");
                    }
                })
        }
        catch (error) {
            console.error("loi", error)
            setError("not conection")
        }
        console.log(e.target.value)
    }

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!novel) return <p>Không tìm thấy truyện</p>;
    console.log(novel)

    console.log(novel.comment == null)

    return (
        <div>
            <h2>{novel.name}</h2>
            <p>Miêu tả: {novel.desc}</p>
            <p>Tác giả: {novel.auth}</p>
            <p>comments: {novel.comment ? novel.comment.length : 0}</p>
            <ul>
                {(novel.comment || []).map((item, index) => (
                    <li>
                        {item}
                    </li>
                ))}

            </ul>

            <div>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nhập nội dung bình luận" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button type="submit">Bình luận</button>
                </form>

            </div>
        </div>
    )
}

export { Novels, NovelDetail }
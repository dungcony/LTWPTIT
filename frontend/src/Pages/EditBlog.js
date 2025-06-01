import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from "../utils/axios_edit"

const EditBlog = () => {

    const { id } = useParams()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newBlog = {
            name,
            desc
        }

        axios.post(`/V1/blog/edit/${id}`, {
            name: newBlog.name,
            desc: newBlog.desc
        })

        console.log(newBlog)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" name="desc" onChange={(e) => setDesc(e.target.value)} />
            <button type="submit">Edit</button>
        </form>
    )
}

export default EditBlog
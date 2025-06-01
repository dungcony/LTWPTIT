import { useState } from 'react';
import axios from '../utils/axios_edit'; // Adjust the import path as necessary

const NewNovels = () => {

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newNovel = {
            name,
            author,
            desc
        }

        await axios.post('/V1/novel/create_novel', {
            name: newNovel.name,
            author: newNovel.author,
            desc: newNovel.desc
        })
    }

    return (
        <div>
            <h1>New Novels</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="desc">Description</label>
                    <textarea id="desc" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>

                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default NewNovels
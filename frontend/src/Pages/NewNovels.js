import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

        const response = await fetch('http://localhost:8080/V1/create_novel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNovel)
        })

        if (response.ok) {
            const res = await response.json()
            console.log(res)
        } else {
            console.log('Error')
        }

        console.log(newNovel)
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
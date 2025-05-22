import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState('')
  const [photoId, setPhotoId] = useState('')

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/photo/user/${userId}`).then(data => {
      setPhotos(data);
    }).catch(error => {
      console.error("Không thể tải ảnh người dùng:", error);
    });
  }, [userId]);

  const onComment = async (e) => {
    e.preventDefault();
    console.log(comment)

    try {
      const res = await fetch(`http://localhost:8081/api/photo/addcomment/${photoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      })
    }
    catch (error) {
      console.error("loi")
    }
  }

  return (
    <div>
      <h2>Ảnh của người dùng</h2>
      {photos.map(photo => (
        <div key={photo._id} className="photo-container">
          <img src={`/images/${photo.file_name}`} alt="User's Photo" />
          <p>Thời gian: {photo.date_time}</p>
          {photo.comments?.map((comment, index) => (
            <div key={index} className="comment">
              <p className="comment-text">Bình luận: {comment.comment}</p>
              <p className="comment-user">Bởi: {comment.user_id}</p>
            </div>
          ))}
          <div>
            <form onSubmit={onComment}>
              <label>
                comment
                <input type='text' onChange={(e) => {
                  setComment(e.target.value)
                  setPhotoId(photo._id)
                }} />
                <button type="submit">comment</button>
              </label>
            </form>
          </div>
        </div>
      ))}

    </div>
  );
}

export default UserPhotos;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`http://localhost:1504/v1/photos/${userId}`).then(data => {
      setPhotos(data);
    }).catch(error => {
      console.error("Không thể tải ảnh người dùng:", error);
    });
  }, [userId]);

  return (
    //<Typography variant="body1">
    //   This should be the UserPhotos view of the PhotoShare app. Since it is
    //   invoked from React Router the params from the route will be in property
    //   match. So this should show details of user:
    //   {user.userId}. You can fetch the model for the user
    //   from models.photoOfUserModel(userId):
    // </Typography>
    <div>
      <h2>Ảnh của người dùng</h2>
      {photos.map(photo => (
        <div key={photo._id} className="photo-container">
          <img src={`/images/${photo.file_name}`} alt="User's Photo" />
          <p>Thời gian: {photo.date_time}</p>
          {photo.comments?.map((comment, index) => (
            <div key={index} className="comment">
              <p className="comment-text">Bình luận: {comment.comment}</p>
              <p className="comment-user">Bởi: {comment.user.first_name} {comment.user.last_name}</p>
            </div>
          ))}
        </div>

      ))}
    </div>
  );
}

export default UserPhotos;

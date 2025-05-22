// import React from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


import fetchModel from "../../lib/fetchModelData";
import "./styles.css";


function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/${userId}`).then(data => {
      setUser(data);
    }).catch(error => {
      console.error("Không thể tải thông tin người dùng:", error);
    });
  }, [userId]);

  if (!user) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <h2>Chi tiết người dùng</h2>
      <p>Họ tên: {user.first_name} {user.last_name}</p>
      <p>Địa chỉ: {user.location}</p>
      <p>Nghề nghiệp: {user.occupation}</p>

      <Typography variant="body2" sx={{ marginTop: 2 }}>
        <MuiLink component={Link} to={`/photos/${userId}`}>
          Hình ảnh của {user.first_name}
        </MuiLink>
      </Typography>
    </div>
  );
}

export default UserDetail;

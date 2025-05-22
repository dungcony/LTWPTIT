import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const path = location.pathname;
  const [user, setUser] = useState(null);

  // Tách userId từ URL nếu có
  const match = path.match(/^\/(users|photos)\/([^/]+)/);
  const userId = match ? match[2] : null;

  useEffect(() => {
    if (userId) {
      fetchModel(`http://localhost:8081/api/user/${userId}`)
        .then((data) => {
          setUser(data)
        })
        .catch((err) => {
          console.error("Không thể tải thông tin người dùng:", err);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [userId]);

  // Thiết lập nội dung bên phải TopBar
  let rightContent = "Photo Share App";

  if (path.startsWith("/users/") && !path.includes("/photos") && user) {
    rightContent = `${user.first_name} ${user.last_name}`;
  } else if (path.startsWith("/photos/") && user) {
    rightContent = `Ảnh của ${user.first_name} ${user.last_name}`;
  }

  return (

    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          Lường Tiến Dũng
        </Typography>
        <Typography variant="h6" color="inherit">
          {rightContent}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
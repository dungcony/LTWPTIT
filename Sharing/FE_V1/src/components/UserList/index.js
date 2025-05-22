import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";


import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("http://localhost:8081/api/user/list").then(data => {
      setUsers(data);
    }).catch(error => {
      console.error("Không thể tải danh sách người dùng:", error);
    });
  }, []);

  return (
    <div>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        chọn để hiển thị thông tin của người dùng:
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem
              component={Link}
              to={`/users/${item._id}`}
            >
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;

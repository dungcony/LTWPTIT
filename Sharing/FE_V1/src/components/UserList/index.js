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
    fetchModel("https://xgvjk8-1504.csb.app/v1/users").then(data => {
      setUsers(data);
    }).catch(error => {
      console.error("Không thể tải danh sách người dùng:", error);
    });
  }, []);

  return (
    //  <Typography variant="body1">
    //   This is the user list, which takes up 3/12 of the window. You might
    //   choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
    //   and <a href="https://mui.com/components/dividers/">Dividers</a> to
    //   display your users like so:
    // </Typography>
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

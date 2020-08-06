import React, { useState, useEffect } from "react";
import "./profile.css";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import { removeUserSession, getToken } from "../../Utils/Common";

function Profile(props) {
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/");
  };

  useEffect(() => {
    const token = getToken();
    cartApi(token).then((data) => {
      console.log(data);
      console.log("USER DATA");
      /* data.requests.map((user) => {
        const username = user.username;
        const userID = user.userId;
    }*/
    });
  });

  return (
    <div id="profile-page-background">
      <div id="-profile-settings-container">
        <div id="profile-settings" style={{ marginBottom: "20px" }}>
          تغيير كلمة السر
          <LockIcon id="profile-settings-icon" />
        </div>
        <div id="profile-settings" onClick={handleLogout}>
          الخروج
          <ExitToAppIcon id="profile-settings-icon" />
        </div>
      </div>
      <div id="profile-container">
        <div id="profile-image-container">
          <img alt="profile image" src="profile_img.png" id="profile-img" />
        </div>
        <div id="profile-information">
          <TextField
            id="outlined-read-only-input"
            label="UserID"
            defaultValue="11223"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-read-only-input"
            label="Password"
            defaultValue="*******"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            margin="dense"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

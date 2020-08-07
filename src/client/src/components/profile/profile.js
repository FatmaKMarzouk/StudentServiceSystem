import React, { useState, useEffect } from "react";
import "./profile.css";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import { removeUserSession, getToken } from "../../Utils/Common";
import {
  secretaryInfoApi,
  studentInfoApi,
  postPasswordInfoStudent,
  postPasswordInfoSecretary,
} from "../../core/Apis";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";
import { Form, Button } from "semantic-ui-react";

export default function Profile(props) {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/");
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAlert(false);
    setPasswordInfo({
      oldPass: "",
      newPass: "",
      confirmNewPass: "",
    });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (
      passwordInfo.oldPass === "" ||
      passwordInfo.newPass === "" ||
      passwordInfo.confirmNewPass === ""
    ) {
      setAlertMessage("لم يتم ادخال جميع البيانات");
      setAlertSeverity("error");
      setOpenAlert(true);
    } else {
      const token = getToken();
      console.log("token ");
      console.log(token);
      switch (props.id) {
        case 1:
          postPasswordInfoSecretary(token, passwordInfo).then((data) => {
            if (data.error) {
              setAlertMessage(data.message);
              setAlertSeverity("error");
              setOpenAlert(true);
            } else {
              setAlertMessage(data.message);
              setAlertSeverity("success");
              setOpenAlert(true);
            }
          });
          break;
        case 2:
          console.log("PASSWORDINFO " + passwordInfo.oldPass);
          postPasswordInfoStudent(token, passwordInfo).then((data) => {
            if (data.error) {
              setAlertMessage(data.message);
              setAlertSeverity("error");
              setOpenAlert(true);
            } else {
              setAlertMessage(data.message);
              setAlertSeverity("success");
              setOpenAlert(true);
            }
          });
          break;
      }
    }
  };

  const handleChange = (input) => (event) => {
    console.log("in handle change");
    console.log("input");
    console.log(input);
    console.log("event.target.value");
    console.log(event.target.value);
    const value = event.target.value;
    setPasswordInfo((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  useEffect(() => {
    const token = getToken();
    switch (props.id) {
      case 1:
        secretaryInfoApi(token).then((data) => {
          console.log("USER DATA");
          data.map((user) => {
            console.log(user);
            console.log(user.Name + " " + user.ID);
            setUsername(user.Name);
            setUserID(user.ID);
            console.log("username= " + username + " id= " + userID);
          });
        });
        break;
      case 2:
        studentInfoApi(token).then((data) => {
          console.log(data);
          console.log("USER DATA");
          data.map((user) => {
            console.log(user.NameAr + " " + user.ID);
            setUsername(user.NameAr);
            setUserID(user.ID);
            console.log("username= " + username + " id= " + userID);
          });
        });
        break;
    }
  }, [username]);

  return (
    <div id="profile-page-background">
      <div id="-profile-settings-container">
        <div
          id="profile-settings"
          style={{ marginBottom: "20px" }}
          onClick={handleClick}
        >
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
        <div id="profile-user-details-container">
          <div id="profile-user-details">
            <div id="profile-user-details-mainlabel">الاسم</div>
            <div id="profile-user-details-label">{username}</div>
          </div>
          <div id="profile-user-details">
            <div id="profile-user-details-mainlabel">اسم المستخدم</div>
            <div id="profile-user-details-label">{userID}</div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ width: "500px", height: "250px" }}>
          <div dir="rtl">
            <div id="password-form-field">
              <label id="password-form-field-label">كلمة السر القديمة</label>
              <TextField
                required
                id="outlined-required"
                variant="outlined"
                onChange={handleChange("oldPass")}
                margin="dense"
                style={{ width: "280px" }}
              />
            </div>
            <div id="password-form-field">
              <label id="password-form-field-label">كلمة السر الجديدة</label>
              <TextField
                required
                id="outlined-required"
                variant="outlined"
                onChange={handleChange("newPass")}
                margin="dense"
                style={{ width: "280px" }}
              />
            </div>
            <div id="password-form-field">
              <label id="password-form-field-label">
                تأكيد كلمة السر الجديدة
              </label>
              <TextField
                id="outlined-required"
                required
                onChange={handleChange("confirmNewPass")}
                variant="outlined"
                margin="dense"
                style={{
                  paddingTop: "0px",
                  fontSize: "14px",
                  width: "280px",
                }}
              />
            </div>
            <Button type="submit" id="progress-button" onClick={handleSubmit}>
              استمرار
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ padding: 0 }}>
          <Alert variant="outlined" severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}

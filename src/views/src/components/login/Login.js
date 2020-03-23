import React from "react";
import "./login.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function login() {
  return (
    <Grid component="main" className="root">
      <Grid className="background">
        <div className="login-form-container">
          <img src="/uni_logoo.png" alt="uni_logo" id="logo"></img>
          <Avatar id="avatar"></Avatar>
          <Typography
            component="h1"
            variant="h4"
            style={{ fontWeight: "bold" }}
          >
            تسجيل الدخول
          </Typography>
          <form className="login-form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="اسم المستخدم"
              name="username"
              autoComplete="username"
              id="inputLabels"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              autoComplete="current-password"
              id="inputLabels"
            />
            <div className="form-radio">
              <div>
                <label id="radioBtns">
                  شئون الطلبة
                  <input
                    type="radio"
                    name="selection"
                    value="student"
                    style={{ marginLeft: "10px" }}
                  />
                </label>
              </div>
              <div>
                <label id="radioBtns">
                  طالب
                  <input
                    type="radio"
                    name="selection"
                    value="secretary"
                    style={{ marginLeft: "10px" }}
                  />
                </label>
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="lightBlue"
              style={{ fontWeight: "bold" }}
              id="Btn"
            >
              الدخول
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

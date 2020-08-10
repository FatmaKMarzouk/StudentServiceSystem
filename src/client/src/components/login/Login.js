import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../../Utils/Common";
import "./login.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const role = useFormInput("");
  const [error, setError] = useState(null);

  //handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("https://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/users/signin", {
        username: username.value,
        password: password.value,
        role: role.value,
      })
      .then((response) => {
        setLoading(false);
        console.log("response.data.token");
        console.log(response.data.token);
        console.log("response.data.user");
        console.log(response.data.user);
        setUserSession(response.data.token, response.data.user);

        if (response.data.user.role === "secretary")
          props.history.push("/sechome");
        else props.history.push("/studenthome");
      })
      .catch((error) => {
        console.log("login error: "+ error);
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <Grid component="main">
      <Grid className="background">
        <div className="login-form-container">
          <img src="/uni_logoo.png" alt="uni_logo" id="logo"></img>
          <Avatar id="avatar"></Avatar>
          <Typography
            component="h1"
            variant="h4"
            style={{ fontWeight: "bold", fontFamily: "Cairo" }}
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
              {...username}
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
              {...password}
              autoComplete="current-password"
              id="inputLabels"
            />
            <div className="form-radio">
              <div>
                <label id="radioBtns">
                  شئون الطلبة
                  <input
                    type="radio"
                    {...role}
                    name="selection"
                    value="secretary"
                    style={{ marginLeft: "10px" }}
                  />
                </label>
              </div>
              <div>
                <label id="radioBtns">
                  طالب
                  <input
                    type="radio"
                    {...role}
                    name="selection"
                    value="student"
                    style={{ marginLeft: "10px" }}
                  />
                </label>
              </div>
            </div>
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
            <br />

            <Button
              variant="raised"
              type="submit"
              fullWidth
              color="lightBlue"
              style={{ fontWeight: "bold" }}
              id="Btn"
              value={loading ? "Loading..." : "Login"}
              onClick={handleLogin}
              disabled={loading}
            >
              الدخول
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;

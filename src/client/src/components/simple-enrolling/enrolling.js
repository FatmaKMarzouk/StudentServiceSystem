import React, { useState } from 'react';
import axios from 'axios';
import "../login/login.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getUser, removeUserSession, setUserSession } from '../../Utils/Common';

function Enrolling(props) {
    const user = getUser();

    const [loading, setLoading] = useState(false);
    const nameen = useFormInput('');
    const namear = useFormInput('');
    const ssn = useFormInput('');
    const email = useFormInput('');
    const gender = useFormInput('');


    const [error, setError]= useState(null);

    const handleLogout = () => {
    props.history.push('/');
  }

    //handle button click of Enroll form
    const handleEnroll = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:5000/enroll', {nameen: nameen.value, namear: namear.value, ssn: ssn.value, email: email.value, gender: gender.value})
        .then(response => {
            props.history.push('/home');
        }).catch(error => {
          setLoading(false);
          if (error.response.status === 401) setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
      }
      );
    }


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
              تسجيل الطالب
            </Typography>
            <form className="login-form" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label=" اسم الطالب بالانجليزية"
                name="nameen"
                {...nameen}
                id="inputLabels"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="اسم الطالب بالعربية"
                name="namear"
                {...namear}
                id="inputLabels"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="الرقم القومي"
                name="ssn"
                {...ssn}
                id="inputLabels"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="البريد الالكتروني"
                name="email"
                {...email}
                id="inputLabels"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="النوع"
                name="gender"
                {...gender}
                id="inputLabels"
              />
              <div className="form-radio">
                <div>
                  <label id="radioBtns">
                  برامج خاصة
                    <input
                      type="radio"
                      name="selection"
                      value="private"
                      style={{ marginLeft: "10px" }}
                    />
                  </label>
                </div>
                <div>
                  <label id="radioBtns">
                  عام
                    <input
                      type="radio"
                      name="selection"
                      value="general"
                      style={{ marginLeft: "10px" }}
                    />
                  </label>
                </div>
              </div>
              {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />

                <Button
                variant = "raised"
                type="submit"
                fullWidth
                color="lightBlue"
                style={{ fontWeight: "bold" }}
                id="Btn"
                value={loading ? 'Loading...' : 'Login'}
                onClick={handleEnroll}
                disabled={loading}
              >
              تسجيل الطالب
              </Button>

              <input type="button" onClick={handleLogout} value="Logout" />

            </form>
          </div>
        </Grid>
      </Grid>
    );
}


const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

  export default Enrolling;

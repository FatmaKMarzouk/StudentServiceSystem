import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
//import { nationalities } from "./Nationalities";

class AddSecretary extends Component {
  handleSubmit = () => {};

  handleChange = () => {};

  render() {
    return (
      <div className="main-form" dir="rtl">
        <Form onSubmit={this.handleSubmit}>
          <div className="column">
            <div id="main-form-titles">البيانات الشخصية</div>
            <div id="form-labels">
              <div id="form-labels-column">
                <Form.Field>
                  <div id="enrolling-form-field">
                    <label id="userDetails-label">الاسم الرباعي</label>
                    <TextField
                      required
                      id="outlined-required"
                      variant="outlined"
                      onChange={this.handleChange()}
                      margin="dense"
                      style={{ width: "280px" }}
                    />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div id="enrolling-form-field">
                    <label id="userDetails-label">البريد الإلكتروني</label>
                    <TextField
                      required
                      id="outlined-required"
                      variant="outlined"
                      type="email"
                      onChange={this.handleChange()}
                      margin="dense"
                      style={{ width: "280px" }}
                    />
                  </div>
                </Form.Field>
              </div>
              <div>
                <Divider
                  orientation="vertical"
                  id="mainform-vertical-divider"
                />
              </div>
              <div id="form-labels-column">
                <Form.Field>
                  <div id="enrolling-form-field">
                    <label id="userDetails-label">الوظيفة</label>
                    <TextField
                      id="outlined-required"
                      select
                      required
                      onChange={this.handleChange()}
                      variant="outlined"
                      margin="dense"
                      style={{
                        paddingTop: "0px",
                        fontSize: "14px",
                        width: "280px",
                      }}
                    >
                      <MenuItem key="admin" value="admin">
                        Admin
                      </MenuItem>
                      <MenuItem key="secretary" value="secretary">
                        Secretary
                      </MenuItem>
                    </TextField>
                  </div>
                </Form.Field>
                <Button
                  type="submit"
                  id="progress-button"
                  onClick={this.handleSubmit}
                >
                  استمرار
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default AddSecretary;

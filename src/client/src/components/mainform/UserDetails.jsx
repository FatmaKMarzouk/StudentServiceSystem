// UserDetails.jsx
import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { nationalities } from "./Nationalities";


class UserDetails extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div className="main-form">
        <Form onSubmit={this.props.handleSubmit}>
          <div className="column">
            <span
              style={{
                fontSize: "32px",
                paddingRight: "15px"
              }}
            >
              بيانات الطالب الشخصية
            </span>
            <br />
            <br />
            <Divider id="divider" />
            <div id="form-labels">
              <div id="form-labels-column">
                <Form.Field>
                  <label id="userDetails-label">الاسم</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("fullName")}
                    defaultValue={values.firstName}
                    margin="dense"
                  />
                </Form.Field>
                <Form.Field>
                  <label id="userDetails-label">الرقم القومى</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("nationalId")}
                    defaultValue={values.nationalId}
                    margin="dense"
                  />
                </Form.Field>
                <Form.Field>
                  <label id="userDetails-label">البريد الإلكتروني</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    type="email"
                    onChange={this.props.handleChange("email")}
                    defaultValue={values.email}
                    margin="dense"
                    InputLabelProps={{
                      className: "floating-labels"
                    }}
                  />
                </Form.Field>

                <Form.Field>
                  <label id="userDetails-label">النوع</label>
                  <TextField
                    id="filled-required"
                    select
                    required
                    label="Required"
                    onChange={this.props.handleChange("gender")}
                    defaultValue={values.gender}
                    variant="filled"
                    margin="dense"
                    style={{
                      width: "255px",
                      paddingTop: "0px",
                      fontSize: "14px"
                    }}
                  >
                    <MenuItem key="female" value="female">
                      Female
                    </MenuItem>
                    <MenuItem key="male" value="male">
                      Male
                    </MenuItem>
                  </TextField>
                </Form.Field>

                <Form.Field>
                  <label id="userDetails-label">العنوان</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("address")}
                    defaultValue={values.address}
                    margin="dense"
                  />
                </Form.Field>
              </div>
              <div id="form-labels-column">
                <Form.Field>
                  <label id="userDetails-label">رقم التليفون</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("phoneNumber")}
                    defaultValue={values.phoneNumber}
                    margin="dense"
                  />
                </Form.Field>

                <Form.Field>
                  <label id="userDetails-label">الجنسية</label>
                  <TextField
                    id="filled-required"
                    select
                    required
                    label="Required"
                    onChange={this.props.handleChange("nationality")}
                    defaultValue={values.gender}
                    variant="filled"
                    margin="dense"
                    style={{
                      width: "255px",
                      paddingTop: "0px",
                      fontSize: "14px"
                    }}
                  >
                    {nationalities}
                  </TextField>
                </Form.Field>

                <Form.Field>
                  <label id="userDetails-label">تاريخ الميلاد</label>
                  <TextField
                    required
                    id="filled-required"
                    variant="filled"
                    type="date"
                    onChange={this.props.handleChange("birthDate")}
                    defaultValue={values.birthDate}
                    margin="dense"
                    style={{
                      color: "#003366"
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label id="userDetails-label">الحالة الصحية</label>
                  <TextField
                    id="filled-required"
                    variant="filled"
                    onChange={this.props.handleChange("medicalCondition")}
                    defaultValue={values.medicalCondition}
                    margin="dense"
                    label="Optional"
                  />
                </Form.Field>
              </div>
            </div>
          </div>
          <div className="column">
            <span
              style={{
                fontSize: "32px",
                paddingRight: "15px"
              }}
            >
              بيانات ولي الأمر
            </span>
            <br />
            <br />
            <Divider id="divider" />
            <div id="form-labels">
              <div id="form-labels-column">
                <Form.Field>
                  <label id="userDetails-label">اسم ولي الأمر</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("guardianName")}
                    defaultValue={values.guardianName}
                    margin="dense"
                  />
                </Form.Field>

                <Form.Field>
                  <label id="userDetails-label">الرقم القومى</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("guardianId")}
                    defaultValue={values.guardianId}
                    margin="dense"
                  />
                </Form.Field>
              </div>
              <div id="form-labels-column">
                <Form.Field>
                  <label id="userDetails-label">رقم التليفون</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("guardianPhoneNumber")}
                    defaultValue={values.guardianPhoneNumber}
                    margin="dense"
                  />
                </Form.Field>

                <Form.Field>
                  <label id="userDetails-label">صلة القرابة</label>
                  <TextField
                    required
                    id="filled-required"
                    label="Required"
                    variant="filled"
                    onChange={this.props.handleChange("relativeRelation")}
                    defaultValue={values.relativeRelation}
                    margin="dense"
                  />
                </Form.Field>
              </div>
              <Button
                type= "submit"
                className="progress-button"
                onClick={this.saveAndContinue}
              >
                استمرار
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default UserDetails;

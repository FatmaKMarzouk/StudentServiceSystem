// Confirmation.jsx
import React, { Component } from "react";
import { Button, List, Form } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";

class Confirmation extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        collegeId = "٢٣٤٥",
        fullName,
        nationalId = "٢٩٧٤٥٩٣٤٦٧٠٨١",
        email,
        gender,
        address,
        phoneNumber,
        nationality,
        guardianName,
        guardianId,
        relativeRelation,
        birthDate,
        medicalCondition,
        guardianPhoneNumber,
        facultyName,
        collegeName,
        collegeYear,
        collegeProgram,
        enrollmentStatus,
        gpa,
        enrollmentDestination,
        courses
      }
    } = this.props;
    {
      console.log(`confirmation id ${this.props.id}`);
    }
    switch (this.props.id) {
      case 0:
        return (
          <div id="confirm-form">
            <div id="confirm-form-title">
              <h2
                style={{
                  float: "right",
                  fontWeight: "bold",
                  marginBottom: "0",
                  marginTop: "1%"
                }}
              >
                يرجى التأكد من صحة البيانات المدخلة
              </h2>
              <span
                style={{ float: "right", fontWeight: "bold", fontSize: "20px" }}
              >
                ( ثم اضغط على زر التأكيد )
              </span>
              <Divider id="divider" />
            </div>
            <div id="confirm-form-details">
              <List style={{ textAlign: "right", float: "right" }}>
                <h3 style={{ fontWeight: "bold" }}>بيانات الطالب الشخصية</h3>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الاسم الرباعي :{fullName}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الرقم القومى : {nationalId}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="Email" />
                  <List.Content id="confirmation-list-item">
                    الإيميل :{email}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    النوع : {gender}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    العنوان : {address}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    رقم التليفون : {phoneNumber}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الجنسية : {nationality}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    تاريخ الميلاد : {birthDate}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الحالة الصحية : {medicalCondition}
                  </List.Content>
                </List.Item>
                <Divider id="confirm-divider" />
                <h3 style={{ fontWeight: "bold" }}>بيانات ولي الأمر</h3>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    اسم ولي الأمر : {guardianName}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الرقم القومى : {guardianId}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    صلة القرابة : {relativeRelation}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="calendar" />
                  <List.Content id="confirmation-list-item">
                    رقم التليفون : {guardianPhoneNumber}
                  </List.Content>
                </List.Item>
              </List>
              <Button
                id="progress-button"
                style={{ marginLeft: "13%" }}
                onClick={this.back}
              >
                رجوع
              </Button>
              <Button id="progress-button" onClick={this.saveAndContinue}>
                تأكيد
              </Button>
            </div>
          </div>
        );

      default:
        return "Unknown step";
    }
  }
}

export default Confirmation;

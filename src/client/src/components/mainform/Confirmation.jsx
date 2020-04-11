// Confirmation.jsx
import React, { Component } from "react";
import { Button, List, Form } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

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
        id,
        fullName,
        nationalId,
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
        enrollmentDestination
      }
    } = this.props;
    console.log({ id });
    switch (id) {
      case 0:
        return (
          <div className="confirm-form">
            <h2 style={{ float: "right", fontWeight: "bold" }}>
              يرجى التأكد من صحة البيانات المدخلة
            </h2>
            <p style={{ float: "right", fontWeight: "bold", fontSize: "20px" }}>
              ( ثم اضغط على زر التأكيد )
            </p>
            <Divider id="divider" />
            <div className="confirm-form-details">
              <List style={{ textAlign: "right", float: "right" }}>
                <h3 style={{ fontWeight: "bold" }}>بيانات الطالب الشخصية</h3>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>الاسم الرباعي :{fullName}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>الرقم القومى : {nationalId}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="Email" />
                  <List.Content>الإيميل :{email}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>النوع : {gender}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>العنوان : {address}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>رقم التليفون : {phoneNumber}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>الجنسية : {nationality}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>تاريخ الميلاد : {birthDate}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>
                    الحالة الصحية : {medicalCondition}
                  </List.Content>
                </List.Item>
                <Divider id="confirm-divider" />
                <h3 style={{ fontWeight: "bold" }}>بيانات ولي الأمر</h3>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>اسم ولي الأمر : {guardianName}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>الرقم القومى : {guardianId}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>صلة القرابة : {relativeRelation}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar" />
                  <List.Content>
                    رقم التليفون : {guardianPhoneNumber}
                  </List.Content>
                </List.Item>
              </List>
              <Button
                className="progress-button"
                style={{ marginLeft: "13%" }}
                onClick={this.back}
              >
                رجوع
              </Button>
              <Button
                className="progress-button"
                onClick={this.saveAndContinue}
              >
                تأكيد
              </Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="dialog-confirm-form">
            <h2 style={{ float: "right", fontWeight: "bold" }}>شهادة قيد</h2>
            <p style={{ float: "right", fontWeight: "bold", fontSize: "20px" }}>
              ( ثم اضغط على زر التأكيد )
            </p>
            <Divider id="inside-dialog-divider" />
            <div className="confirm-form-details">
              <List style={{ textAlign: "right", float: "right" }}>
                {/*<h3 style={{ fontWeight: "bold" }}>بيانات الطالب الشخصية</h3>*/}
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{fullName} : الاسم الرباعي</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{facultyName} : الكلية</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="Email" />
                  <List.Content>{collegeName} : الجامعة</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{collegeYear} : الفرقة</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{collegeProgram} : الشعبة/التخصص</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{enrollmentStatus} : حالة القيد</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>{gpa} : التقدير العام</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>
                    {enrollmentDestination} :أود استخراج شهادة قيد لتقديمها إلى
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div>
        );
      default:
        return "Unknown step";
    }
  }
}

export default Confirmation;

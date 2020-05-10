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
        case 1:
        return (
          <div /*className="dialog-confirm-form"*/>
            {/*<div className="service-title-container">
<h2 style={{ float: "right", fontWeight: "bold" }}>شهادة قيد</h2>
<h4 style={{ float: "right", fontWeight: "bold" }}>
يرجى التأكد من صحة البيانات المدخلة
</h4>
<p
style={{ float: "right", fontWeight: "bold", fontSize: "20px" }}
>
( ثم اضغط على زر التأكيد )
</p>
</div>*/}
            {/*<Divider id="inside-dialog-divider" />*/}
            <div className="confirm-form-details" style={{ width: "580px" }}>
              <List
                style={{
                  textAlign: "right",
                  float: "right"
                }}
              >
                {/*<h3 style={{ fontWeight: "bold" }}>بيانات الطالب الشخصية</h3>*/}
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">{fullName}</span>
                      <span id="list-attribute-name"> : الاسم الرباعي </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">{facultyName}</span>
                      <span id="list-attribute-name"> : الكلية </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="Email" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">{collegeName}</span>
                      <span id="list-attribute-name"> : الجامعة </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">{collegeYear}</span>
                      <span id="list-attribute-name"> : الفرقة </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">{collegeProgram}</span>
                      <span id="list-attribute-name"> : الشعبة/التخصص </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {enrollmentStatus}
                      </span>
                      <span id="list-attribute-name"> : حالة القيد </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div className="list-content-block">
                      <span id="list-attribute-content">{gpa}</span>
                      <span id="list-attribute-name"> : التقدير العام </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content>
                    <div
                      className="list-content-block"
                      style={{ height: "10px" }}
                    >
                      <span
                        id="list-attribute-content"
                        style={{ marginLeft: "0" }}
                      >
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          margin="dense"
                        />
                      </span>
                      {/*<span id="list-attribute-content">
                        {enrollmentDestination}
              </span>*/}
                      <span id="list-attribute-name">
                        :أود استخراج شهادة قيد لتقديمها إلى
                      </span>
                    </div>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div>
        );
      case 2:
        return <TranscriptTable courses={this.props.values.courses} />;
      case 3:
        return (
          <div id="student-card-container">
            <Card id="student-card">
              <Card.Content>
                <Image
                  floated="left"
                  id="student-card-image"
                  className="image-size"
                  id="student-card-image"
                  src="card.jpg"
                />
                <Card.Header>
                  <span id="student-card-title">كلية الهندسة</span>
                </Card.Header>
                <Card.Meta>
                  <div className="list-content-block">
                    <span id="student-card-content">{fullName}</span>
                    <span id="student-card-name">: الاسم</span>
                  </div>
                </Card.Meta>
                <Card.Description>
                  <div className="list-content-block">
                    <span id="student-card-content">{collegeProgram}</span>
                    <span id="student-card-name"> : البرنامج </span>
                  </div>
                </Card.Description>
                <Card.Meta>
                  <div className="list-content-block">
                    <span id="student-card-content">{collegeId}</span>
                    <span id="student-card-name"> : الرقم الجامعي </span>
                  </div>
                </Card.Meta>
                <Card.Description>
                  <div className="list-content-block">
                    <span
                      id="student-card-content"
                      style={{ paddingBottom: "25px" }}
                    >
                      {nationalId}
                    </span>
                    <span
                      id="student-card-name"
                      style={{ paddingBottom: "25px" }}
                    >
                      {" "}
                      : الرقم القومي{" "}
                    </span>
                  </div>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        );

      case 4:
        return "Unknown";

      default:
        return "Unknown step";
    }
  }
}

export default Confirmation;

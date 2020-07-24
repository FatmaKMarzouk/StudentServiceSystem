// Confirmation.jsx
import React, { Component } from "react";
import "./student-card.css";
import { Button, List } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import TranscriptTable from "../tables/TranscriptTable";
import { Card, Image } from "semantic-ui-react";
import { getUser, getToken } from "../../Utils/Common";
import {
  getStudentTranscript,
  readCertOfEnrollData,
  getCardDetails,
  getAnnualFees,
  postStudentInfo,
} from "../../core/Apis";

class Confirmation extends Component {
  state = {
    userCertOfEnrollInfo: {
      NameAr: "",
      Faculty: "",
      CollegeName: "جامعة الأسكندرية",
      CollegeYear: "سنة رابعة",
      Program: "",
      EnrollmentStatus: "طالبة في كلية الهندسة جامعة الأسكندرية",
      GPA: "",
    },
    semsterDetails: [],
    courses: [],
    totalGpa: {},

    userCardDetails: {
      NameAr: "",
      Faculty: "",
      Program: "",
      Username: "",
      SSN: "",
      Photo: "",
    },

    annualFees: {
      value: "",
    },

    newStudentInfo: {
      namear: "",
      ssn: "",
      medicalcondition: "",
      parentphone: "",
      parentname: "",
      parentssn: "",
      parentrelation: "",
      email: "",
      nationality: "",
      birthdate: "",
      phonenumber: "",
      address: "",
      gender: "",
      selection: "",
    },
  };
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  submitNewStudent = (e) => {
    console.log("ONE");
    e.preventDefault();
    console.log("TWO");

    const token = getToken();
    console.log("token in useEffect");
    console.log(token);

    postStudentInfo(token, this.state.newStudentInfo).then((data) => {
      console.log("FIVE");
      if (data.error) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    });
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  updateCourses = (cor) => {
    var myCoursesArray = [];
    const objectTemp = cor;

    Object.keys(cor).map(function (keyName, keyIndex) {
      console.log("keyName");
      console.log(keyName);

      console.log("objectTemp[keyName]");
      console.log(objectTemp[keyName]);

      myCoursesArray.push(objectTemp[keyName]);
    });

    console.log("myCoursesArray11111111111");
    console.log(myCoursesArray);
    return myCoursesArray;
  };

  updateSemsterDetails = (sem) => {
    var mySemsterDetailsArray = [];
    const objectTemp = sem;

    Object.keys(sem).map(function (keyName, keyIndex) {
      console.log("keyName");
      console.log(keyName);

      console.log("objectTemp[keyName]");
      console.log(objectTemp[keyName]);

      mySemsterDetailsArray.push(objectTemp[keyName]);
    });

    console.log("mySemsterDetailsArray11111111111");
    console.log(mySemsterDetailsArray);
    return mySemsterDetailsArray;
  };

  updateTotalGpa = (gpa) => {
    var myTotalGpaArray = [];
    const objectTemp = gpa;

    Object.keys(gpa).map(function (keyName, keyIndex) {
      console.log("keyName");
      console.log(keyName);

      console.log("objectTemp[keyName]");
      console.log(objectTemp[keyName]);

      myTotalGpaArray.push(objectTemp[keyName]);
    });

    console.log("myTotalGpaArray11111111111");
    console.log(myTotalGpaArray);
    return myTotalGpaArray;
  };

  loadUserData = (username, token) => {
    switch (this.props.id) {
      case 0:
        this.setState({ newStudentInfo: this.props.values });
        break;
      case 1:
        readCertOfEnrollData(token).then((data) => {
          if (data.error) {
            console.log("IN ERORRR :: ");
            console.log(data.error);
          } else {
            console.log("IN ELSEEE DATA:: ");
            console.log(data);
            /*const { NameAr, Faculty, Program, GPA } = data;
            this.userCertOfEnrollInfo = { NameAr, Faculty, Program, GPA };
    */
            //const { NameAr, Faculty, Program, GPA } = data;
            this.setState({
              userCertOfEnrollInfo: {
                ...data,
                CollegeName: "جامعة الأسكندرية",
                CollegeYear: "سنة رابعة",
                EnrollmentStatus: "طالبة في كلية الهندسة جامعة الأسكندرية",
              },
            });
            console.log("userCertOfEnrollInfo!!!!!!!");
            console.log(this.state.userCertOfEnrollInfo);

            //console.log("user data before");
            //console.log(userData);
            //setUserData({ NameAr, Faculty, Program, GPA });
            //console.log("user data after");
            //console.log(userData);
          }
        });
        break;
      case 2:
        getStudentTranscript(token).then((data) => {
          if (data.error) {
            console.log("IN ERROR TRANSCRIPT");
            console.log(data);
            //console.log(data.error);
          } else {
            this.setState({
              semsterDetails: this.updateSemsterDetails(data.row4),
              courses: this.updateCourses(data.row2),
              totalGpa: this.updateTotalGpa(data.row1),
            });

            console.log("semsterDetails");
            console.log(Array.isArray(this.state.semsterDetails));

            console.log("courses");
            console.log(this.state.courses);

            console.log("total Gpa ");
            console.log(this.state.totalGpa);
          }
        });
        break;

      case 3:
        getCardDetails(token).then((data) => {
          if (data.error) {
            console.log("IN ERORRR CARD DETAILS:: ");
            console.log(data.error);
          } else {
            console.log("IN ELSEEE DATA CARD DETAILS:: ");
            console.log(data);
            this.setState({
              userCardDetails: {
                ...data,
              },
            });
            console.log("USERCARDDETAILS!!!!!!");
            console.log(this.state.userCardDetails.Faculty);
          }
        });
        break;

      case 4:
        getAnnualFees(token).then((data) => {
          if (data.error) {
            console.log("IN ERORRR IN ANNUAL FEES:: ");
            console.log(data.error);
            console.log(data.message);
          } else {
            console.log("IN ELSEEE DATA CARD DETAILS:: ");
            console.log(data);
            this.setState({
              annualFees: {
                value: data.message,
              },
            });
            console.log("ANNUAl FEES VALUE!!!!!");
            console.log(this.state.annualFees.value);
          }
        });

      default:
        return;
    }
  };

  /*  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      const username = getUser().username;
      console.log("username in useEffect");
      console.log(username);
      const token = getToken();
      console.log("token in useEffect");
      console.log(token);
      //const username = props.match.params.username;
      this.loadUserData(username, token);
    }
  }
*/
  componentWillMount() {
    const username = getUser().username;
    console.log("username in useEffect");
    console.log(username);
    const token = getToken();
    console.log("token in useEffect");
    console.log(token);
    //const username = props.match.params.username;
    this.loadUserData(username, token);
  }

  /*useEffect(() => {
    const username = getUser().username;
    console.log("username in useEffect");
    console.log(username);
    const token = getToken();
    console.log("token in useEffect");
    console.log(token);
    //const username = props.match.params.username;
    loadUserData(username, token);
  }, [props.id]);
*/
  render() {
    //-----------------------------------------------------------------------------
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
        courses,
        namear,
        ssn,
        phonenumber,
        parentname,
        parentssn,
        parentrelation,
        birthdate,
        medicalcondition,
        parentphone,
        selection,
      },

      /* newStudentValues: {
        namear,
        ssn,
        email,
        gender,
        address,
        phonenumber,
        nationality,
        parentname,
        parentssn,
        parentrelation,
        birthdate,
        medicalcondition,
        parentphone,
        selection,
      },*/
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
                  marginTop: "1%",
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
                    الاسم الرباعي :{this.state.newStudentInfo.namear}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الرقم القومى : {this.state.newStudentInfo.ssn}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="Email" />
                  <List.Content id="confirmation-list-item">
                    الإيميل :{this.state.newStudentInfo.email}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    النوع : {this.state.newStudentInfo.gender}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    العنوان : {this.state.newStudentInfo.address}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    رقم التليفون : {this.state.newStudentInfo.phonenumber}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الجنسية : {this.state.newStudentInfo.nationality}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    تاريخ الميلاد : {this.state.newStudentInfo.birthdate}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الحالة الصحية : {this.state.newStudentInfo.medicalcondition}
                  </List.Content>
                </List.Item>
                <Divider id="confirm-divider" />
                <h3 style={{ fontWeight: "bold" }}>بيانات ولي الأمر</h3>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    اسم ولي الأمر : {this.state.newStudentInfo.parentname}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    الرقم القومى : {this.state.newStudentInfo.parentssn}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content id="confirmation-list-item">
                    صلة القرابة : {this.state.newStudentInfo.parentrelation}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="calendar" />
                  <List.Content id="confirmation-list-item">
                    رقم التليفون : {this.state.newStudentInfo.parentphone}
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
              <Button id="progress-button" onClick={this.submitNewStudent}>
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
                  float: "right",
                }}
              >
                {/*<h3 style={{ fontWeight: "bold" }}>بيانات الطالب الشخصية</h3>*/}
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.NameAr}
                      </span>
                      <span id="list-attribute-name"> : الاسم الرباعي </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.Faculty}
                      </span>
                      <span id="list-attribute-name"> : الكلية </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="Email" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.CollegeName}
                      </span>
                      <span id="list-attribute-name"> : الجامعة </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.CollegeYear}
                      </span>
                      <span id="list-attribute-name"> : الفرقة </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.Program}
                      </span>
                      <span id="list-attribute-name"> : الشعبة/التخصص </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.EnrollmentStatus}
                      </span>
                      <span id="list-attribute-name"> : حالة القيد </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
                    <div className="list-content-block">
                      <span id="list-attribute-content">
                        {this.state.userCertOfEnrollInfo.GPA}
                      </span>
                      <span id="list-attribute-name"> : التقدير العام </span>
                    </div>
                  </List.Content>
                </List.Item>
                <List.Item id="list-item">
                  <List.Icon name="users" />
                  <List.Content id="form-content">
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
        return (
          <TranscriptTable
            courses={this.state.courses}
            semsterDetails={this.state.semsterDetails}
            totalGpa={this.state.totalGpa}
          />
        );
      case 3:
        return (
          <div id="student-card-container">
            <Card id="student-card">
              <Card.Content id="form-content">
                <Image
                  floated="left"
                  id="student-card-image"
                  className="image-size"
                  src="card.jpg"
                />
                <Card.Header id="student-card-header">
                  <span id="student-card-title">
                    {this.state.userCardDetails.Faculty}
                  </span>
                </Card.Header>
                <Card.Meta>
                  <div className="list-content-block">
                    <span id="student-card-content">
                      {this.state.userCardDetails.NameAr}
                    </span>
                    <span id="student-card-name">: الاسم</span>
                  </div>
                </Card.Meta>
                <Card.Description>
                  <div className="list-content-block">
                    <span id="student-card-content">
                      {this.state.userCardDetails.Program}
                    </span>
                    <span id="student-card-name"> : البرنامج </span>
                  </div>
                </Card.Description>
                <Card.Meta>
                  <div className="list-content-block">
                    <span id="student-card-content">
                      {this.state.userCardDetails.Username}
                    </span>
                    <span id="student-card-name"> : الرقم الجامعي </span>
                  </div>
                </Card.Meta>
                <Card.Description>
                  <div className="list-content-block">
                    <span
                      id="student-card-content"
                      style={{ paddingBottom: "25px" }}
                    >
                      {this.state.userCardDetails.SSN}
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
        return (
          <List
            style={{
              textAlign: "right",
              float: "right",
            }}
          >
            <List.Item id="list-item">
              <List.Icon name="users" />
              <List.Content id="form-content">
                <div className="list-content-block">
                  <span id="list-attribute-content">
                    {this.state.annualFees.value}
                  </span>
                  {/*<span id="list-attribute-name"> : القيمة المستحقة </span>*/}
                </div>
              </List.Content>
            </List.Item>
          </List>
        );

      default:
        return "Unknown step";
    }
  }
}

export default Confirmation;

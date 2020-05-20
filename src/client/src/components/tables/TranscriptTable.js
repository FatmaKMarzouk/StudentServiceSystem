import React from "react";
import "./transcript.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Carousel from "react-bootstrap/Carousel";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const columns = [
  { id: "courseCode", label: "Course Code", minWidth: 120 },
  { id: "courseName", label: "Course Name", align: "center", minWidth: 170 },
  {
    id: "creditHours",
    label: "Credit Hours",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "courseGrade",
    label: "Grade",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
];

const semsterDetails = [
  {
    semesterr: "Fall 2015-2016",
    termGPA: "2.4",
    GPA: "3.3",
    attemptedHours: "18",
    totalEarnedHours: "18",
  },
  {
    semesterr: "Spring 2015-2016",
    termGPA: "1.8",
    GPA: "2.9",
    attemptedHours: "18",
    totalEarnedHours: "15",
  },
  {
    semesterr: "Winter 2015-2016",
    termGPA: "3.9",
    GPA: "0.7",
    attemptedHours: "20",
    totalEarnedHours: "14",
  },
];

const courses = [
  {
    semester: "Fall 2015-2016",
    courseCode: "MP100 N",
    courseName: "Mechanics-1",
    creditHours: "3",
    courseGrade: "A+",
  },
  {
    semester: "Fall 2015-2016",
    courseCode: "MP101 N",
    courseName: "Mechanics-1",
    creditHours: "3",
    courseGrade: "B+",
  },
  {
    semester: "Fall 2015-2016",
    courseCode: "MP102 N",
    courseName: "Mechanics-1",
    creditHours: "3",
    courseGrade: "C+",
  },
  {
    semester: "Fall 2015-2016",
    courseCode: "MP103 N",
    courseName: "Mechanics-1",
    creditHours: "3",
    courseGrade: "A+",
  },
  {
    semester: "Fall 2015-2016",
    courseCode: "MP104 N",
    courseName: "Mechanics-1",
    creditHours: "3",
    courseGrade: "B+",
  },
  {
    semester: "Fall 2015-2016",
    courseCode: "MP105 N",
    courseName: "Mechanics-1",
    creditHours: "3",
    courseGrade: "A-",
  },
  {
    semester: "Spring 2015-2016",
    courseCode: "MP106 N",
    courseName: "Math-1",
    creditHours: "3",
    courseGrade: "D+",
  },
  {
    semester: "Spring 2015-2016",
    courseCode: "MP107 N",
    courseName: "Math-1",
    creditHours: "3",
    courseGrade: "C+",
  },
  {
    semester: "Spring 2015-2016",
    courseCode: "MP108 N",
    courseName: "Math-1",
    creditHours: "3",
    courseGrade: "A+",
  },
  {
    semester: "Spring 2015-2016",
    courseCode: "MP109 N",
    courseName: "Math-1",
    creditHours: "3",
    courseGrade: "B-",
  },
  {
    semester: "Spring 2015-2016",
    courseCode: "MP110 N",
    courseName: "Math-1",
    creditHours: "3",
    courseGrade: "A+",
  },
  {
    semester: "Winter 2015-2016",
    courseCode: "MP110 N",
    courseName: "Performance-1",
    creditHours: "3",
    courseGrade: "A+",
  },
  {
    semester: "Winter 2015-2016",
    courseCode: "MP110 N",
    courseName: "Performance-1",
    creditHours: "3",
    courseGrade: "A+",
  },
  {
    semester: "Winter 2015-2016",
    courseCode: "MP110 N",
    courseName: "Performance-1",
    creditHours: "3",
    courseGrade: "A+",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    width: "100%",
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();

  const numOfCoursesPerSemster = [];

  return (
    <Container id="transcript-container" style={{ width: "750px" }}>
      <Carousel
        interval={null}
        nextIcon={
          <span
            aria-hidden="true"
            className="carousel-control-next-icon"
            id="carousel-control-next-icon"
          />
        }
        prevIcon={
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon"
            id="carousel-control-prev-icon"
          />
        }
      >
        {semsterDetails.map((semster) => {
          const coursesTemp = courses.filter(
            (semsterCourse) => semsterCourse.semester == semster.semesterr
          );
          return (
            <Carousel.Item>
              <div id="table-container">
                <div id="transcript-term-title">{semster.semesterr}</div>
                <Divider id="transcript-term-title-underline" />
                <TableContainer className={classes.container}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            id="transcript-titles"
                            style={{
                              minWidth: column.minWidth,
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {coursesTemp.map((course) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={course.courseCode}
                            id="transcript-entries-rows"
                          >
                            {columns.map((column) => {
                              const value = course[column.id];
                              console.log(value);
                              console.log("-------------------------");
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  id="transcript-entries"
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                      <TableRow id="semester-details-row">
                        <TableCell id="semester-details-row">
                          Term GPA: {semster.termGPA}
                        </TableCell>
                        <TableCell id="semester-details-row" align="center">
                          GPA: {semster.GPA}
                        </TableCell>
                        <TableCell id="semester-details-row" align="center">
                          Attempted Hours: {semster.attemptedHours}
                        </TableCell>
                        <TableCell id="semester-details-row" align="center">
                          Total Earned Hours: {semster.totalEarnedHours}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
}

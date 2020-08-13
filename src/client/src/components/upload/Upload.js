import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { getToken } from "../../Utils/Common";
import axios from "axios";
import { uploadFile } from "../../core/Apis";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      stdId: 0,
      openAlert: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
    document.getElementById("files-container").style.display = "block";
    document.getElementById("upload-button").style.display = "block";
    document.getElementById("delete-upload-button").style.display = "block";
  }

  async uploadFiles() {
    if (this.state.stdId == "") {
      this.setState({ openAlert: true });
    } else {
      this.setState({ uploadProgress: {}, uploading: true });
      const promises = [];
      console.log("SARA SAKRRRR");
      console.log(this.state.files);
      this.state.files.forEach((file) => {
        console.log("Test 1");
        console.log(file);
        promises.push(this.sendRequest(file));
        console.log("PROMISES");
        console.log(promises);
      });
      try {
        await Promise.all(promises);

        this.setState({ successfullUploaded: true, uploading: false });
      } catch (e) {
        // Not Production ready! Do some error handling here instead...
        this.setState({ successfullUploaded: true, uploading: false });
      }
    }
  }

  sendRequest(file) {
    console.log("Test 2");
    console.log(file);
    return new Promise((resolve, reject) => {
      console.log("Test 3");
      console.log(file);
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      console.log("Test 4");
      console.log(file);

      /*for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1].name);
      }

      console.log("AHAM CONSOLE FEHOM2");
      console.log(formData);
*/
      const token = getToken();
      console.log("tokennnnn");
      console.log(token);
      console.log("tokennnnn");

      console.log(this.props.stepNum);

      switch (this.props.stepNum) {
        case 1:
          const formData1 = new FormData();
          formData1.append("file", file);
          //const data = new FormData();
          // data.append("file", file);
          axios
            .post("https://localhost:5000/nominationcard", formData1, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log("El raga3");
              console.log(res.statusText);
            });

          break;

        /* fetch("https://localhost:5000/upload", {
            mode: "no-cors",
            method: "POST",
            body: formData,
          })
            .then((response) => {
              console.log("Test 4");
              console.log(file);
              console.log("Nomination Response");
              console.log("response hena");
              console.log(response.message);
              return response.json();
            })
            .catch((err) => console.log(err));*/

        /* console.log("Heyyyyooooo");
          //console.log(formData);
          req.open("POST", "http://localhost:5000/upload");
          req.setRequestHeader("Content-Type", "multipart/form-data;");
          //req.setRequestHeader("Authorization", `Bearer ${token}`);
          req.send(formData);
          console.log("request.response");
          console.log(req.response);*/

        case 2:
          const formData2 = new FormData();
          formData2.append("file", file);
          axios
            .post("https://localhost:5000/highschoolcertificate", formData2, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log("El raga3");
              console.log(res.statusText);
            });

          break;
        case 3:
          const formData3 = new FormData();
          formData3.append("file", file);
          axios
            .post("https://localhost:5000/birthcertificate", formData3, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log("El raga3");
              console.log(res.statusText);
            });
          break;

        case 4:
          const formData4 = new FormData();
          formData4.append("file", file);
          axios
            .post("https://localhost:5000/nationalid", formData4, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log("El raga3");
              console.log(res.statusText);
            });

          break;
        case 5:
          const formData5 = new FormData();
          formData5.append("file", file);
          axios
            .post("https://localhost:5000/photo", formData5, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log("El raga3");
              console.log(res.statusText);
            });
          break;

        case 6:
          console.log("Sara 1");
          /*const student = {
            stdId: "1",
          };
          const json = JSON.stringify(student);
          const blob = new Blob([json], {
            type: "application/json",
          });*/
          const formData6 = new FormData();

          formData6.append("file", file);
          //formData6.append("document", blob);

          console.log("Sara 2 -->> loop");
          for (var key of formData6.entries()) {
            console.log(key[0] + ", " + key[1]);
          }

          const stdId = 1;
          axios
            .post(
              `http://localhost:5000/uploaddoc?stdId=${this.state.stdId}`,
              formData6,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log("El raga3");
              console.log(res.statusText);
            })
            .catch((error) => {
              console.log("uploaddoc api error: " + error);
            });
          break;

        default:
          console.log("Default");
          break;
      }

      //req.open("POST", "http://localhost:8000/upload");
      //req.send(formData);
      //console.log(formData);

      /* uploadFile(token, formData, 1).then((data) => {
        console.log("HENA EL MESSAGE BTA3T EL NOMMMI");
        console.log(data.message);

      });*/
      this.setState({
        files: [],
        successfullUploaded: false,
        uploading: false,
        open: true,
      });
      document.getElementById("files-container").style.display = "none";
      document.getElementById("upload-button").style.display = "none";
      document.getElementById("delete-upload-button").style.display = "none";
      document.getElementById("successfully-upload").style.display = "flex";
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() => {
            this.setState({ files: [], successfullUploaded: false });
            document.getElementById("files-container").style.display = "none";
          }}
          id="upload-button"
        >
          مسح
        </button>
      );
    } else {
      return (
        <div id="upload-buttons">
          <button
            disabled={this.state.files.length < 0 || this.state.uploading}
            onClick={this.uploadFiles}
            id="upload-button"
          >
            رفع
          </button>
          <button
            onClick={() => {
              this.setState({ files: [], successfullUploaded: false });
              document.getElementById("files-container").style.display = "none";
              document.getElementById("upload-button").style.display = "none";
              document.getElementById("delete-upload-button").style.display =
                "none";
            }}
            id="delete-upload-button"
          >
            مسح
          </button>
          <Dialog
            open={this.state.openAlert}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Alert variant="outlined" severity="error">
                يجب ادخال الرقم الجامعي للطالب أولاً
              </Alert>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }

  handleChange = () => (event) => {
    console.log("in handle change Upload");

    console.log("event.target.value");
    console.log(event.target.value);

    this.setState({ stdId: event.target.value });
  };

  handleClose = () => {
    this.setState({ openAlert: false });
  };

  getInputID(id) {
    switch (id) {
      case 6:
        return (
          <div id="upload-input-id">
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              onChange={this.handleChange()}
              style={{
                width: "130px",
                textAlign: "center",
              }}
            />
            <label id="upload-id-label">: الرقم الجامعي </label>
          </div>
        );
      default:
        return;
    }
  }

  componentDidMount() {
    document.getElementById("successfully-upload").style.display = "none";
  }

  render() {
    return (
      <div className="Upload">
        <div className="upload-files">
          <div id="upload-title">يرجى تحميل {this.props.value}</div>
          <Divider id="divider-upload" />
          <br />
          <div id="upload-container">
            <div id="inside-upload-container">
              <div className="upload-circle">
                <Dropzone
                  onFilesAdded={this.onFilesAdded}
                  disabled={
                    this.state.uploading || this.state.successfullUploaded
                  }
                />
              </div>
              <div id="files-container">
                {this.state.files.map((file) => {
                  return (
                    <div key={file.name} className="Row">
                      <span className="Filename">{file.name}</span>
                      {this.renderProgress(file)}
                      <Divider />
                    </div>
                  );
                })}
              </div>
            </div>
            {this.getInputID(this.props.stepNum)}
            {this.renderActions()}
          </div>
          <div id="successfully-upload">
            <Alert
              variant="outlined"
              severity="success"
              style={{
                fontFamily: "Cairo",
                fontSize: "12px",
              }}
            >
              Successfully Uploaded - {this.props.value}
            </Alert>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;

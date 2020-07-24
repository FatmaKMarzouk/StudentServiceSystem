import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { getToken } from "../../Utils/Common";
import axios from "axios";
import { uploadFile } from "../../core/Apis";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
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
  }

  async uploadFiles() {
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

      const formData = new FormData();
      formData.append("nominationCard", file, file.name);

      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1].name);
      }

      console.log("AHAM CONSOLE FEHOM2");
      console.log(file);

      const token = getToken();
      console.log("tokennnnn");
      console.log(token);

      switch (this.props.stepNum) {
        case 1:
          fetch("http://localhost:5000/nominationcard", {
            //mode: "no-cors",
            method: "POST",
            headers: {
              "Content-type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
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
            .catch((err) => console.log(err));
          /*console.log("Heyyyyooooo");
          //console.log(formData);
          req.open("POST", "http://localhost:5000/nominationcard");
          req.setRequestHeader("Content-Type", "multipart/form-data;");
          req.setRequestHeader("Authorization", `Bearer ${token}`);
          req.send(formData);
          console.log("request.response");
          console.log(req.response);*/
          break;
        /*
        case 2:
          console.log("Heyyyyooooo");
          console.log(formData);
          req.open("POST", "http://localhost:5000/highschoolcertificate");
          req.setRequestHeader("Authorization", `Bearer ${token}`);
          req.send(formData);
          console.log("request.response");
          console.log(req.response);
          break;
        case 3:
          console.log("Heyyyyooooo");
          console.log(formData);
          req.open("POST", "http://localhost:5000/birthcertificate");
          req.setRequestHeader("Authorization", `Bearer ${token}`);
          req.send(formData);
          console.log("request.response");
          console.log(req.response);
          break;
        case 4:
          console.log("Heyyyyooooo");
          console.log(formData);
          req.open("POST", "http://localhost:5000/nationalid");
          req.setRequestHeader("Authorization", `Bearer ${token}`);
          req.send(formData);
          console.log("request.response");
          console.log(req.response);
          break;
        case 5:
          console.log("Heyyyyooooo");
          console.log(formData);
          req.open("POST", "http://localhost:5000/photo");
          req.setRequestHeader("Authorization", `Bearer ${token}`);
          req.send(formData);
          console.log("request.response");
          console.log(req.response);
          break;
*/
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
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
          id="upload-button"
        >
          رفع
        </button>
      );
    }
  }

  getInputID(id) {
    switch (id) {
      case 0:
        return;
      case 1:
        return (
          <div id="upload-input-id">
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              style={{
                width: "130px",
                textAlign: "center",
              }}
            />
            <label id="upload-id-label">: الرقم الجامعي </label>
          </div>
        );
    }
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
                {this.renderActions()}
              </div>
              <div className="upload-circle">
                <Dropzone
                  onFilesAdded={this.onFilesAdded}
                  disabled={
                    this.state.uploading || this.state.successfullUploaded
                  }
                />
              </div>
            </div>
            {this.getInputID(this.props.id)}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;

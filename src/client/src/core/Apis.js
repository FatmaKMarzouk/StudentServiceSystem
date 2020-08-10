// certificate of enrollment api
// api 1
export const readCertOfEnrollData = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/certificateofenrollment`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// api 2
export const certificateToCart = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/certificatecart`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("certifiate testttttttt");
      //props.history.push("/dummy")
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------
// card api
// api 1
export const getCardDetails = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/card`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("CARD TESTT");
      return response.json();
    })
    .catch((err) => console.log(err));
};
// api 2
export const cardCart = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/cardcart`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("CARD CART TESTTTTTTTTTTT");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------
// chooseprog apis
// api 1
export const getProgramss = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/chooseprog`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("prog TESTTTTTTT amm");
      return response.json();
    })
    .catch((err) => console.log(err));
};
// api 2
export const submitChosenProgram = (token, selectedProgram) => {
  console.log("2");
  console.log(selectedProgram);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/submitprog", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ selectedprogram: selectedProgram }),
  })
    .then((response) => {
      console.log("HEYYYYYY");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------
// transcript api
// api 1
export const getStudentTranscript = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/transcript`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// api 2
export const transcriptCart = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/transcriptconfirm`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("TRANSCRIPT TESTTTTTTTTTTT");
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------
// cart api
// api 1
export const cartApi = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/cart`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//api 2
export const deleteCart = (token, reqID) => {
  console.log("ana f api deleteCart");
  console.log(reqID);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/delete-cart", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reqID: reqID }),
  })
    .then((response) => {
      console.log("HEYYYYYY");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------
//annual fees api
// di api bta3t eny ageeb el kema 3am el 3ala el taleb 3shan a display it fl dialogbox
// di btetnada fl confirmation.jsx
//api 1
export const getAnnualFees = (token) => {
  console.log("Tokenn");
  console.log(token);
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/annualfees`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("inside getAnnual Fees in APIS response");
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};
// di api bta3t eny azawed masaref 3am fl cart
// btetnada f dialogBox.js lama ados adef ela el 3araba
//api 2
export const annualFeesCart = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/confirmannualfees`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("inside annualFeesCart responseeeeeeee");
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------
//enroll new students apis
//api 1
export const postStudentInfo = (token, newStudentInfo) => {
  console.log("THREE");
  console.log("HENA el newStudentInfo:::");
  console.log(newStudentInfo);

  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/enroll", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ studentinfo: newStudentInfo }),
  })
    .then((response) => {
      console.log("FOUR");
      console.log("response hena");
      console.log(response);
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};
//api 2
// upload apis of:
// 1. nominationcar
// 2. photo
// 3. highschoolcertificate
// 4. birthcertificate
// 5. nationalid
export const uploadFile = (token, uploadedFile, step) => {
  console.log("HENA el uploadedFile:::");
  console.log(uploadedFile);

  switch (step) {
    case 1:
      return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/nominationcard", {
        mode: "no-cors",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { nominationCard: uploadedFile },
      })
        .then((response) => {
          console.log("Nomination Response");
          console.log("response hena");
          console.log(response.message);
          return response.json();
        })
        .catch((err) => console.log(err));

    case 2:
      return;
    case 3:
      return;
    case 4:
      return;
    case 5:
      return;
  }
};
// ------------------------------------------------------------------------------------------------
// SECRETARY REQUESTS
// api 1
export const allRequestsApi = (token) => {
  console.log("ana f api REQUESTS");
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/allrequests`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// api 2
export const undoneRequestsApi = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/undonerequests`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//api 3
export const searchRequests = (token, studentid) => {
  console.log("ana f api searchRequests");
  console.log(studentid);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/searchrequests", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ studentid: studentid }),
  })
    .then((response) => {
      console.log("HEYYYYYY");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
//api 4
export const searchUndoneRequests = (token, studentid) => {
  console.log("ana f api searchRequests");
  console.log(studentid);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/searchundonerequests", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ studentid: studentid }),
  })
    .then((response) => {
      console.log("HEYYYYYY");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
//api 5
export const requestDone = (token, reqID) => {
  console.log("ana f api requestsDone");
  console.log(reqID);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/requestdone", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reqID: reqID }),
  })
    .then((response) => {
      console.log("HEYYYYYY");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
//api 6
export const requestReceived = (token, reqID) => {
  console.log("ana f api requestsReceived");
  console.log(reqID);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/requestreceived", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reqID: reqID }),
  })
    .then((response) => {
      console.log("HEYYYYYY");
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
// ------------------------------------------------------------------------------------------------

//add sec

export const addSecretary = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/addsec`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Inside add Seccccc Response");
      console.log(response);
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const postSecretaryInfo = (token, newSecretaryInfo) => {
  console.log("HENA el newSecretaryInfo:::");
  console.log(newSecretaryInfo);

  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/add", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ secretaryinfo: newSecretaryInfo }),
  })
    .then((response) => {
      console.log("FOUR");
      console.log("RESPONSE el ADD");
      console.log(response);
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};

//-------------------------------------------------
//Profile Info
//Student Profile
export const studentInfoApi = (token) => {
  console.log("ana f api REQUESTS");
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/studentinfo`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const secretaryInfoApi = (token) => {
  return fetch(`http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/secretaryinfo`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//--------------------------------
//CHANGE PASSWORD

export const postPasswordInfoStudent = (token, newPasswordInfo) => {
  console.log("PASSWORD INFO");
  console.log(newPasswordInfo);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/changepass/Student", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword: newPasswordInfo }),
  })
    .then((response) => {
      console.log("RESPONSE of change pass");
      console.log(response);
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const postPasswordInfoSecretary = (token, newPasswordInfo) => {
  console.log("PASSWORD INFO");
  console.log(newPasswordInfo);
  return fetch("http://ec2-3-16-161-126.us-east-2.compute.amazonaws.com:5000/changepass/Secretary", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword: newPasswordInfo }),
  })
    .then((response) => {
      console.log("RESPONSE of change pass");
      console.log(response);
      console.log(response.error);
      console.log(response.message);
      return response.json();
    })
    .catch((err) => console.log(err));
};

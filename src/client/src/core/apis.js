// certificate of enrollment api
// api 1
export const readCertOfEnrollData = (token) => {
  return fetch(`http://localhost:5000/certificateofenrollment`, {
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
  return fetch(`http://localhost:5000/certificatecart`, {
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

export const getCardDetails = (token) => {
  return fetch(`http://localhost:5000/card`, {
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

export const getProgramss = (token) => {
  return fetch(`http://localhost:5000/chooseprog`, {
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

export const submitChosenProgram = (token, selectedProgram) => {
  console.log("2");
  console.log(selectedProgram);
  return fetch("http://localhost:5000/submitprog", {
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

// transcript api
// api 1
export const getStudentTranscript = (token) => {
  return fetch(`http://localhost:5000/transcript`, {
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
  return fetch(`http://localhost:5000/transcriptconfirm`, {
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

// card api
// api 1
export const cartApi = (token) => {
  return fetch(`http://localhost:5000/cart`, {
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
export const cardCart = (token) => {
  return fetch(`http://localhost:5000/cardcart`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("CARD CART TESTTTTTTTTTTT");
      return response.json();
    })
    .catch((err) => console.log(err));
};

//api 2

export const deleteCart = (token, reqID) => {
  console.log("ana f api deleteCart");
  console.log(reqID);
  return fetch("http://localhost:5000/delete-cart", {
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
// di api bta3t eny ageeb el kema 3am el 3ala el taleb 3shan a display it fl dialogbox
// di btetnada fl confirmation.jsx

export const getAnnualFees = (token) => {
  console.log("Tokenn");
  console.log(token);
  return fetch(`http://localhost:5000/annualfees`, {
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

export const annualFeesCart = (token) => {
  return fetch(`http://localhost:5000/confirmannualfees`, {
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

// SECRETARY REQUESTS
// api 1
export const allRequestsApi = (token) => {
  console.log("ana f api REQUESTS");
  return fetch(`http://localhost:5000/allrequests`, {
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
  return fetch(`http://localhost:5000/undonerequests`, {
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
  return fetch("http://localhost:5000/searchrequests", {
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

export const searchUndoneRequests = (token, studentid) => {
  console.log("ana f api searchRequests");
  console.log(studentid);
  return fetch("http://localhost:5000/searchundonerequests", {
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

export const requestDone = (token, reqID) => {
  console.log("ana f api requestsDone");
  console.log(reqID);
  return fetch("http://localhost:5000/requestdone", {
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

export const requestReceived = (token, reqID) => {
  console.log("ana f api requestsReceived");
  console.log(reqID);
  return fetch("http://localhost:5000/requestreceived", {
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

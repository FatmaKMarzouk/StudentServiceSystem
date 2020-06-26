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

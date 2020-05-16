// certificate of enrollment api
export const readCertOfEnrollData = (username, token) => {
  return fetch(`http://localhost:5000/certificateofenrollment/${username}`, {
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

// transcript api
export const getStudentTranscript = (username, token) => {
  return fetch(`http://localhost:5000/transcript/${username}`, {
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

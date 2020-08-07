import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";
//import UserDetails from "./components/mainform/UserDetails";
import Login from "./components/login/Login";
import Enrolling from "./components/simple-enrolling/enrolling";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, setUserSession, removeUserSession } from "./Utils/Common";
import SecHome from "./components/homepage-sec/pagesec";
import StudentHome from "./components/homepage-student/page-student";
import DummyFile from "./components/dummyfolder/dummyfile";
import payment from "./components/payment/payment";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log("token in App.js UseEffect:" + token);
    if (!token) {
      return;
    }
    console.log("abl el axios.verifytoken");
    axios
      .get(`http://ec2-3-134-107-83.us-east-2.compute.amazonaws.com:5000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        console.log("error in axios.verifytoken catch error:" + error);
        removeUserSession();
        setAuthLoading(false);
      });
    console.log("b3d el axios.verifytoken");
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute path="/sechome" component={SecHome} />
        <PrivateRoute path="/studenthome" component={StudentHome} />
        <PrivateRoute path="/enroll" component={Enrolling} />
        <PublicRoute path="/payment" component={payment} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

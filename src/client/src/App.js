import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import UserDetails from './components/mainform/UserDetails';
import Login from './components/login/Login';
import Enrolling from './components/simple-enrolling/enrolling';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, setUserSession, removeUserSession } from './Utils/Common';
import SecHome from './components/homepage-sec/pagesec';

function App() {
const [authLoading,setAuthLoading] = useState(true);

useEffect(() => {
  const token = getToken();
  if(!token) {
    return;
  }

  axios.get(`http:/localhost:5000/verifyToken?token=${token}`).then(response => {
    setUserSession(response.data.token, response.data.user);
    setAuthLoading(false);
  }).catch(error => {
    removeUserSession();
    setAuthLoading(false);
  })
}, []);

if(authLoading && getToken()) {
  return <div className="content">Checking Authentication...</div>
}

  return (
    <div>
      <BrowserRouter>
        <div>
          <div>
            <Switch>
              <PublicRoute exact path="/" component={Login} />
              <PrivateRoute path="/home" component={SecHome} />
              <PublicRoute path='/enroll' component={Enrolling}/>

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

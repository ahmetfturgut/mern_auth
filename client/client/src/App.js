import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/Login'

import Home from './pages/Home.'
import Alert from "./component/Alert";

const App = () => {

  return (
    <>
      <Alert></Alert>
      <div>
        <Router>
          <Switch> 
            <Route exact component={Login} path="/"></Route>
            <Route exact component={Home} path="/home"></Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;

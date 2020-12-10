import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './components/Navbar';

import Ranking from './components/Ranking'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
      <NavBar></NavBar>
      <Router>
      <div>
        <Switch>
          <Route path="/about">
            <h2>About</h2>
          </Route>
          <Route path="/ranking">
            <Ranking></Ranking>
          </Route>
          <Route path='/internshipMatching'>
            <h2>Internship Matching</h2>
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    );
  }
  return
}



export default App;

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';
import './App.scss'

export default class AppRoutes extends Component {
  render() {
    return (
       <div className="App-Container">
          <Route path="/" exact component={ProjectPage}></Route>
          <Route path="/about" component={AuthorPage}></Route>
       </div>
    );
  }
}


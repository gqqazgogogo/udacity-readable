// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import DetailPage from "./pages/detailPage/DetailPage";
import NotFoundComponent from "./pages/share/404";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/:id" component={DetailPage} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ homePage, detailPage }) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

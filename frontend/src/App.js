import React, { Component } from "react";
import "./App.css";
import LogView from "./views/logView";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import InfoView from "./views/infoView";
import LoginView from "./views/loginView";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  // handleLogin = (data) => {
  //   const { api_key: api, username: user, auth: isAuth } = data;
  //   this.setState({ api_key: api, username: user, auth: isAuth });
  // };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route exact path="/allData" component={LogView} />
            <Route exact path="/info" component={InfoView} />
            <Route exact path="/login" component={LoginView} />
            <Redirect from="/" exact to="/alldata" />
            <Route path="/" component={App} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

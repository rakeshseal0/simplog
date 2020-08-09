import React, { Component } from "react";
import NavbarComponent from "../components/navBar";

class InfoView extends Component {
  componentDidMount() {
    const api_key = localStorage.getItem("api_key");
    const user = localStorage.getItem("user");
    this.setState({ api: api_key, username: user });
  }
  state = {
    api: "<API_KEY>",
    username: "<USER_NAME>",
  };
  render() {
    return (
      <React.Fragment>
        <NavbarComponent />
        <div className="jumbotron jumbotron-fluid mb-0 mt-0">
          <div className="container mb-5">
            <h1 className="display-3">Docs</h1>
            <p className="lead">
              This page consists of API keys and API_ENDPOINT documentations for
              simplog.
            </p>
          </div>
          <div className="container">
            <h4 className="font-weight-bold">API KEY</h4>

            <div className="bd-example mb-5">
              <code>{this.state.api}</code>
            </div>
            <h4 className="font-weight-bold">Log Data</h4>
            <div className="bd-example mb-5">
              <code>
                simplog.herokuapp.com/log?user={this.state.username}&api=
                {this.state.api}&text={"<TEXT_TO_LOG>"}
              </code>
            </div>
            <h4 className="font-weight-bold">Get All Data</h4>
            <div className="bd-example mb-5">
              <code>simplog.herokuapp.com/dump?user={this.state.username}</code>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InfoView;

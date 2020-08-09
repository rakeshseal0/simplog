import React, { Component } from "react";
import TableComponent from "../components/tableComponent";
import NavbarComponent from "../components/navBar";
import config from "../config.json";
import axios from "axios";
import { ToastContainer } from "react-toastify";

class LogView extends Component {
  async componentDidMount() {
    const jwt_token = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("user");

    const { data } = await axios.get(
      config.API_URL + "/dump?user=" + username + "&jwt=" + jwt_token
    );
    // console.log(data.slice(1));

    //got data from backend, validate data now
    if (!data[0].username) {
      this.props.history.push("/login");
    } else {
      this.setState({ logData: data.slice(1), username: data[0].username });
    }
  }
  state = {
    logData: [],
    username: ""
  };
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <NavbarComponent value={this.props} />
          <p className="text-lowercase">
            Showing logs for : {this.state.username}
          </p>

          <TableComponent data={this.state.logData} />
        </React.Fragment>

        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default LogView;

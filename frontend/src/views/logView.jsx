import React, { Component } from "react";
import TableComponent from "../components/tableComponent";
import NavbarComponent from "../components/navBar";
import config from "../config.json";
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";

class LogView extends Component {
  async componentDidMount() {
    const cookies = new Cookies();
    const resData = cookies.get("vitals");
    if (!resData) {
      toast.error("session expired, login again!");
      this.state.isAuth = false;
    } else {
      const { isAuth: auth, user } = resData;
      const { data } = await axios.get(config.API_URL + "/dump?user=" + user);
      if (data) {
        this.setState({ logData: data.slice(1), username: user, isAuth: auth });
      }
    }
  }
  state = {
    logData: [],
    username: "",
    isAuth: false
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isAuth ? (
          <React.Fragment>
            <NavbarComponent />
            <p className="text-lowercase">
              Showing logs for : {this.state.username}
            </p>

            <TableComponent data={this.state.logData} />
          </React.Fragment>
        ) : (
          <a className="btn btn-info" href="/login">
            Login
          </a>
        )}
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default LogView;

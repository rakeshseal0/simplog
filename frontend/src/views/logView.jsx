import React, { Component } from "react";
import TableComponent from "../components/tableComponent";
import NavbarComponent from "../components/navBar";
import config from "../config.json";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import animationData from "../lotties/lottieFile.json";
import LottieComponent from "../components/lottieComponent";

class LogView extends Component {
  async componentDidMount() {
    const jwt_token = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("user");
    let newuser = localStorage.getItem("newUser");
    // if (newuser === "true") {
    //   newuser = true;
    // }

    const { data } = await axios.get(
      config.API_URL + "/dump?user=" + username + "&jwt=" + jwt_token
    );

    //got data from backend, validate data now
    if (!username) {
      this.props.history.push("/login");
    } else {
      if (!data[0].username) {
        this.props.history.push("/login");
      } else {
        this.setState({
          logData: data.slice(1),
          username: data[0].username,
          new: newuser,
        });
      }
    }
  }

  handleDelete = async (id) => {
    const user = localStorage.getItem("user");
    const api_key = localStorage.getItem("api_key");
    const URL =
      config.API_URL + "/delete?user=" + user + "&api=" + api_key + "&id=" + id;
    const tmpStateLogData = this.state.logData;
    try {
      console.log(this.state.logData);
      const newStateLogData = this.state.logData.filter((d) => d._id !== id);
      console.log(newStateLogData);
      this.setState({ logData: newStateLogData });
      const { data } = await axios.delete(URL);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("unable to delete");
      // console.log(tmpStateLogData);
      this.setState({ logData: tmpStateLogData });
    }
  };

  //handleInfo change
  handleInfo = (id) => {
    toast("This Feature will be updated " + id);
  };
  state = {
    logData: [],
    username: "",
  };
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <NavbarComponent value={this.props} />

          {this.state.logData.length === 0 ? (
            <div>
              <div className="jumbotron jumbotron-fluid">
                <div className="container  mb-0">
                  <h1 className="display-6">welcome {this.state.username}</h1>
                  <p className="lead  mb-0">
                    You dont have new logs, goto{" "}
                    {
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => this.props.history.push("/info")}
                      >
                        info
                      </button>
                    }{" "}
                    for docs.
                  </p>
                </div>
              </div>
              <LottieComponent
                value={{ data: animationData, height: null, width: null }}
              />
            </div>
          ) : (
            <div>
              <p className="text-lowercase">
                Showing logs for : {this.state.username}
              </p>
              <TableComponent
                data={this.state.logData}
                onDelete={this.handleDelete}
                onInfo={this.handleInfo}
              />
            </div>
          )}
        </React.Fragment>

        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default LogView;

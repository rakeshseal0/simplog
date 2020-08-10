import React, { Component } from "react";
import TableComponent from "../components/tableComponent";
import NavbarComponent from "../components/navBar";
import config from "../config.json";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isLoggedIn } from "../services/auth";
import animationData from "../lotties/lottieFile.json";
import loadingAnimationData from "../lotties/loadingLottie.json";

import LottieComponent from "../components/lottieComponent";

class LogView extends Component {
  async componentDidMount() {
    this.setState({ loading: true });
    const jwt_token = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("user");

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
          loading: false,
        });
      }
    }
  }

  handleDelete = async (id) => {
    const user = localStorage.getItem("user");
    const api_key = localStorage.getItem("api_key");
    const jwt = localStorage.getItem("accesstoken");

    const URL =
      config.API_URL +
      "/delete?user=" +
      user +
      "&api=" +
      api_key +
      "&id=" +
      id +
      "&jwt=" +
      jwt;
    console.log(URL);
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

  //handle data refresh
  handleRefresh = async () => {
    this.setState({ loading: true });
    const jwt_token = localStorage.getItem("accesstoken");
    const username = localStorage.getItem("user");

    const { data } = await axios.get(
      config.API_URL + "/dump?user=" + username + "&jwt=" + jwt_token
    );
    console.log("new state");
    this.setState({
      logData: data.slice(1),
      username: data[0].username,
      loading: false,
    });
  };

  state = {
    logData: [],
    username: "",
    loading: false,
  };
  render() {
    isLoggedIn();
    return (
      <React.Fragment>
        <React.Fragment>
          <NavbarComponent value={this.props} />

          {this.state.logData.length === 0 ? (
            <div>
              {this.state.loading === true ? (
                <>
                  <span className="badge badge-warning">Loading...</span>
                  <LottieComponent
                    value={{
                      data: loadingAnimationData,
                      height: 400,
                      width: 400,
                    }}
                  />
                </>
              ) : (
                <div className="jumbotron jumbotron-fluid">
                  <button
                    className="btn btn-sm btn-primary mr-1 float-right"
                    onClick={this.handleRefresh}
                  >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                  <div className="container  mb-0">
                    <h1 className="display-6">welcome {this.state.username}</h1>
                    <p className="lead  mb-0">
                      You dont have any logs, goto{" "}
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
                  <LottieComponent
                    value={{ data: animationData, height: null, width: null }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="row mr-0">
                <div className="col-sm-11 col-lg-11">
                  <p className="text-lowercase">
                    Showing logs for : {this.state.username}
                  </p>
                </div>
                <div className="col-sm-1 col-lg-1">
                  <button
                    className="btn btn-sm btn-primary float-right"
                    onClick={this.handleRefresh}
                  >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              {this.state.loading === true ? (
                <LottieComponent
                  value={{
                    data: loadingAnimationData,
                    height: 400,
                    width: 400,
                  }}
                />
              ) : (
                <TableComponent
                  data={this.state.logData}
                  onDelete={this.handleDelete}
                  onInfo={this.handleInfo}
                />
              )}
            </div>
          )}
        </React.Fragment>

        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default LogView;

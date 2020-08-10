import React, { Component } from "react";
import { UsernameValidator, PasswordValidator } from "../services/validator";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../config.json";
import LottieComponent from "../components/lottieComponent";
import animationData from "../lotties/homeLottie.json";
import { isLoggedIn } from "../services/auth";
class LoginView extends Component {
  state = {
    username: "",
    password: "",
    status: null,
  };

  componentDidMount = () => {
    const logged = isLoggedIn();
    if (logged) {
      console.log(logged, "user exists, sending to main view..");
      this.props.history.push("/alldata");
    }
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    let validated = true;
    if (!UsernameValidator(username)) {
      toast.error("only letter username");
      validated = false;
    }
    if (!PasswordValidator(password)) {
      toast.error("password size must be > 6");
      validated = false;
    }
    if (validated) {
      const params = { user: username, passw: password };
      // let response = {};
      try {
        const { data: resData } = await axios.post(
          config.API_URL + "/login",
          params
        );
        if (resData.accessToken) {
          //correct login details, store them in localstorage
          console.log("logged In");
          localStorage.setItem("accesstoken", resData.accessToken);
          localStorage.setItem("user", username);
          localStorage.setItem("api_key", resData.api);
          if (resData.new_user) {
            localStorage.setItem("newUser", "true");
          }
          // console.log(this.props);
          this.props.history.push("/allData");
        } else {
          toast.error(resData);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  handleInputChange = (e) => {
    const { id, value: val } = e.currentTarget;
    const name = id;
    const value = val;
    if (name === "username") {
      this.setState({ username: value });
    } else {
      this.setState({ password: value });
    }
  };

  render() {
    // isLoggedIn
    return (
      <div>
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
        />
        <div className="container-fluid m-0">
          <div className="row m-0">
            <div className="col-sm-3 col-md-6 col-lg-7">
              <div style={{ background: "transparent" }} className="jumbotron">
                <h1>Simplog</h1>
                <p>
                  A very simple and FREE REST-API to log data with interactive
                  WEBUI
                </p>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => this.props.history.push("/info")}
                >
                  docs
                </button>
              </div>
            </div>
            <div className="col-sm-9 col-md-6 col-lg-5 float-left">
              <LottieComponent
                value={{ data: animationData, height: 280, width: "100%" }}
              />
            </div>
          </div>
        </div>

        <form className="text-center border border-light p-5">
          <p>login with credentials or create a new account...</p>
          {/* <!-- Email --> */}
          <input
            type="username"
            id="username"
            className="form-control mb-4"
            value={this.state.username}
            placeholder="username"
            onChange={(event) => this.handleInputChange(event)}
          />

          {/* <!-- Password --> */}
          <input
            type="password"
            id="Password"
            className="form-control mb-4"
            placeholder="Password"
            value={this.state.password}
            onChange={(event) => this.handleInputChange(event)}
          />

          {/* <!-- Sign in button --> */}
          <button
            className="btn btn-info btn-block my-4"
            type="submit"
            onClick={(event) => this.handleLogin(event)}
          >
            Sign in
          </button>

          {/* <!-- Social login --> */}
          <p>View it on</p>

          <a
            href="https://github.com/rakeshseal0"
            className="mx-2"
            role="button"
          >
            <i className="fa fa-2x fa-github light-blue-text"></i>
          </a>
        </form>
      </div>
    );
  }
}

export default LoginView;

import React, { Component } from "react";
import { UsernameValidator, PasswordValidator } from "../services/validator";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../config.json";

// import axios from "axios";
class LoginView extends Component {
  state = {
    username: "",
    password: "",
    status: null,
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
          this.props.history.push("/");
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
    // if (this.state.status === "logged") {
    //   return <Redirect to="/" />;
    // }
    return (
      <div>
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
        />
        <form className="text-center border border-light p-5">
          <p className="h4 mb-4">Sign in</p>

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

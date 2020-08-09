import React, { Component } from "react";
import { UsernameValidator, PasswordValidator } from "../services/validator";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../config.json";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// import axios from "axios";
class LoginView extends Component {
  state = {
    username: "",
    password: "",
    status: null
  };

  handleLogin = async e => {
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
      let response = {};
      try {
        response = await axios.post(config.API_URL + "/login", params);
        if (response.status === 200) {
          //valid response handle error or redirect to homepage
          const data = response.data;
          console.log(data);
          if (data.indexOf("INVALID") !== -1) {
            toast.error("Invalid password");
            this.setState({ user: username, password: "" });
          } else if (data.length === 12) {
            //logged in, store some info in cookie
            const cookies = new Cookies();
            cookies.set(
              "vitals",
              { api: data, isAuth: true, user: username },
              { path: "/", expires: new Date(Date.now() + 2592000) }
            );
            console.log("logged in");
            this.setState({ status: "logged" });
          } else {
            toast("unknown error!");
          }
        } else {
          toast.error("critical error in database!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  handleInputChange = e => {
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
    if (this.state.status === "logged") {
      return <Redirect to="/" />;
    }
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
            onChange={event => this.handleInputChange(event)}
          />

          {/* <!-- Password --> */}
          <input
            type="password"
            id="Password"
            className="form-control mb-4"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.handleInputChange(event)}
          />

          {/* <!-- Sign in button --> */}
          <button
            className="btn btn-info btn-block my-4"
            type="submit"
            onClick={event => this.handleLogin(event)}
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

import React from "react";
import { Link } from "react-router-dom";
import logout from "../services/auth";

const NavbarComponent = props => {
  return (
    <nav className="navbar-expand navbar navbar-dark bg-info mb-2">
      <Link className="navbar-brand font-weight-bold" to="/">
        SimpLog
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/info">
              Info <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active ">
            <button
              className="btn btn-sm btn-warning nav-item mt-1 ml-1"
              onClick={e => logout(e, props)}
            >
              logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;

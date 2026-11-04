import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="nav nav-pills flex-column flex-sm-row w-25 mx-auto">
      <NavLink
        className={({ isActive }) =>
          `flex-sm-fill text-sm-center nav-link ${isActive ? "active" : ""}`
        }
        aria-current="page"
        to="/form/login"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex-sm-fill text-sm-center nav-link ${isActive ? "active" : ""}`
        }
        to="/form/signUp"
      >
        Sign Up
      </NavLink>
    </nav>
  );
};

export default Nav;

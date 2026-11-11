import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Nav = () => {
  const [activeLink, setActiveLink] = useState("login");
  return (
    <nav className="nav nav-pills flex-column flex-sm-row w-25 mx-auto">
      <NavLink
        className={({ isActive }) =>
          `flex-sm-fill text-sm-center nav-link ${activeLink === "login" ? "active" : ""}`
        }
        onClick={() => setActiveLink("login")}
        aria-current="page"
        to="/form/login"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex-sm-fill text-sm-center nav-link ${activeLink === "sign-up" ? "active" : ""}`
        }
        onClick={() => setActiveLink("sign-up")}
        to="/form/signUp"
      >
        Sign Up
      </NavLink>
    </nav>
  );
};

export default Nav;

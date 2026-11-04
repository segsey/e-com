import React from "react";
import LoginForm from "./loginForm";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./signUpForm";
import Nav from "./nav";

const Form = () => {
  return (
    <div className="container py-5">
      <Nav />
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};

export default Form;

import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;

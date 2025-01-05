import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login", formData);
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" name="email" className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" name="password" className="w-full p-2 border rounded" onChange={handleChange} required />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default LoginForm;

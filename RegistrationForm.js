import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input type="text" name="username" className="w-full p-2 border rounded" onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" name="email" className="w-full p-2 border rounded" onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" name="password" className="w-full p-2 border rounded" onChange={handleChange} required />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default RegistrationForm;

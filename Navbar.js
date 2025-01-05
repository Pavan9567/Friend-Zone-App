import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">FriendZone</h1>
        <div>
          <Link to="/" className="mx-2 hover:underline">Home</Link>
          <Link to="/login" className="mx-2 hover:underline">Login</Link>
          <Link to="/register" className="mx-2 hover:underline">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

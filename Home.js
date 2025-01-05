import React from "react";
import FriendRecommendations from "../components/FriendRecommendations";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Welcome to FriendZone</h1>
      <FriendRecommendations />
    </div>
  );
};

export default Home;

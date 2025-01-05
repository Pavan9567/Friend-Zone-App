import React, { useEffect, useState } from "react";
import axios from "axios";

const FriendRecommendations = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/friends/recommendations/${userId}");
        setFriends(response.data);
      } catch (err) {
        setError("Failed to load recommendations. Try again.");
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Friend Recommendations</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc ml-5">
        {friends.map((friend) => (
          <li key={friend.id} className="mb-2">
            <div className="flex items-center justify-between">
              <span>{friend.name}</span>
              <button className="bg-blue-500 text-white p-1 rounded" onClick={() => alert("Feature coming soon!")}>
                Add Friend
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRecommendations;

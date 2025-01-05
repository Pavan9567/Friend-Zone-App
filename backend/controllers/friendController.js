const User = require("../models/User");
const mongoose = require("mongoose");

exports.addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: "Already friends" });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add friend", details: error.message });
  }
};

exports.getFriendRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends");

    if (!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).json({message: "Invalid userId format" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //const userFriends = user.friends.map((friend) => friend.toString());
    const recommendations = new Set();

    for (const friendId of user.friends) {
      const friend = await User.findById(friendId).populate("friends");

      friend.friends.forEach((friendOfFriend) => {
        if (
          friendOfFriend.toString() !== userId &&
          !user.friends.includes(friendOfFriend.toString())
        ) {
          recommendations.add(friendOfFriend.toString());
        }
      });
    }

    const recommendedFriends = await User.find({ _id: { $in: Array.from(recommendations) } });

    res.status(200).json(recommendedFriends);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recommendations", details: error.message });
  }
};

exports.getFriendsList = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("friends", "username email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch friends list", details: error.message });
  }
};

exports.removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove friend", details: error.message });
  }
};

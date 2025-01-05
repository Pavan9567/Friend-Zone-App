const express = require("express");
const { addFriend, getFriendRecommendations, removeFriend, getFriendsList } = require("../controllers/friendController");

const router = express.Router();


router.post("/add", addFriend);

router.get("/recommendations/:userId", getFriendRecommendations);

router.post("/remove", removeFriend);

router.get("/:userId", getFriendsList);

module.exports = router;

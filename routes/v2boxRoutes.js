// routes/user.js
const express = require("express");
const router = express.Router();
const { generateKeyPair } = require("../controllers/v2boxController");

// Sample data
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

// GET all users
router.get("/test", (req, res) => {
  // generateKeyPair();
  res.json(users);
});

module.exports = router;

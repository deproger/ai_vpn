const express = require("express");
const { addClient } = require("../controllers/vpnController");

const router = express.Router();

router.post("/add-client", addClient);

module.exports = router;

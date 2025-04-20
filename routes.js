const express = require("express");
const router = express.Router();
const controller = require('./controllers/controller');

// Define your route here
router.get("/home", controller.home);

router.post("/register", controller.register);


module.exports = router;

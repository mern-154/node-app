const express = require("express");

const { auth } = require("../middlewares/Auth");
const { login, details, update, destroy, save } = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", login);

// router.post("/create", save);

// router.get("/:id", details);

// router.put("/:id", update);

// router.delete("/:id", destroy);

module.exports = router;

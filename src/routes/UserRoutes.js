const express = require("express");

const { list, details, update, destroy, save } = require("../controllers/UserController");

const router = express.Router();

router.get("/", list);

router.post("/create", save);

router.get("/:id", details);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;

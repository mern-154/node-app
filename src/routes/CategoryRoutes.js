const express = require("express");

const { list } = require("../controllers/CategoryController");

const router = express.Router();

router.get("/", list);

module.exports = router;

const express = require("express");

const { list, create, update, destroy, detail } = require("../controllers/CategoryController");

const router = express.Router();

router.get("/", list);
router.get("/:id", detail);
router.put("/:id", update);
router.post("/create", create);
router.delete("/:id", destroy);

module.exports = router;

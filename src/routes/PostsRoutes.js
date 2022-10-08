const express = require("express");

const { list, create, update, destroy, detail, home } = require("../controllers/PostsControllers");

const router = express.Router();

router.get("/", home);

router.get("/list", list);
router.get("/:id", detail);
router.put("/:id", update);
router.post("/create", create);
router.delete("/:id", destroy);

module.exports = router;


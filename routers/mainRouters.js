const express = require("express"),
router = express.Router(),
mainController = require("../controllers/mainController"),
imageController = require("../controllers/imageController");

router.get("/", mainController.index);
router.get("/image/:id", imageController.index);
router.post("/images", imageController.imageUpload);
router.post("/images/:id/like", imageController.like)
router.post("/images/:id/comment", imageController.comment)

module.exports = router;


const router = require("express").Router();

//collect all api endpoints
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./homeRoutes");

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;

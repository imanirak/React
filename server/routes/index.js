const router = require('express').Router();
const {auth} = require("./auth");

router.use('/community', require('./community'));
router.use('/post', require("./post"));
router.use("/auth", require("./auth"));

module.exports = router;
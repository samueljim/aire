const express = require('express');
const router = express.Router();

router.use(require("./submissions/router"));
router.use(require("./questions/router"));

module.exports = router;

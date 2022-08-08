const express = require('express');
const router = express.Router();

router.use(require("./users/router"));
router.use(require("./submissions/router"));

module.exports = router;

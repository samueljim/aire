const express = require('express');
const router = express.Router();

const controller = require('./controller');
const prefix = "submissions";

router.get(`/${prefix}`, controller.getAll);
router.post(`/${prefix}`, controller.addNew);
router.get(`/${prefix}/metrics`, controller.countAttempts);

module.exports = router;

const express = require('express');
const router = express.Router();

const controller = require('./controller');
const prefix = "submissions";

router.get(`/${prefix}`, controller.getAll);
router.get(`/${prefix}/:question`, controller.getForQuestion);
router.get(`/${prefix}/:question/metrics`, controller.countAttempts);
router.post(`/${prefix}/:question`, controller.answerQuestion);

module.exports = router;

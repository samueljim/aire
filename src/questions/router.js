const express = require('express');
const router = express.Router();

const controller = require('./controller');
const prefix = "questions";

router.get(`/${prefix}`, controller.getAll);

module.exports = router;

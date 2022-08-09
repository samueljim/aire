const express = require('express');
const router = express.Router();

const controller = require('./controller');
const prefix = "question";

router.get(`/${prefix}s`, controller.getAll);
router.get(`/${prefix}/:question`, controller.getOne);

module.exports = router;

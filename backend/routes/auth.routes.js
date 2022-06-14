const express = require('express');
const router = express.Router();

const service = require('../service/auth.service');

router.post("/",service.findUser);
router.post("/userexist",service.validateUser);
router.post("/newuser",service.createUser);


module.exports = router;    
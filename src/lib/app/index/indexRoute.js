const { indexPage, aboutPage, onLineStatus} = require('./index');

const express = require('express');
const router = express.Router();
const router_a = express.Router();


router.use('/index', router_a);
router.use('/index', indexPage);

//index router son router
router_a.use('/about', aboutPage);
router_a.use('/status', onLineStatus);

module.exports = router;

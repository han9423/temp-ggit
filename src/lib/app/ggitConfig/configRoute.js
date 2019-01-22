const express = require('express');
const  { initGit, configInformation }  = require('./ggitConfig');
const router = express.Router();

router.use('/initgit', initGit);

router.use('/information', configInformation);

module.exports = router;

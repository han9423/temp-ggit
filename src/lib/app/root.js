const express = require('express');
const router = express.Router();
const indexRoute = require('./index/indexRoute');
const ggitRoute = require('./ggitConfig/configRoute');


// 路由集合
router.use('/',  indexRoute);
router.use('/config',  ggitRoute);


router.use('/github', (req, res)=>{
    res.end('github');
})

// router.get('/index', (req, res)=>{res.send('fuck me')})
// router.use('/gitconfig')


module.exports = router;



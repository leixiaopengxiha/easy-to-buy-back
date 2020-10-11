const express = require('express');
let router = express.Router();
const admin = require('./loginregister/index')
const transaction = require('./transaction/index')
// 粉丝关注
const userfans = require('./userfans/index')
router.get('/', (req, res) => {
    res.json({
        code: '200',
        text: "欢迎进入8848"
    })
})
// 注册
router.post('/register', admin.Register)
// 登录
router.post('/login', admin.Logins)
// 获取当前登录用户信息
router.post('/getadmin', admin.Getadmin)
// 我买的接口
router.get('/getAllbuy', transaction.getAllbuy)
// 我卖的接口
// router.get('/getAllbuy',)
// 关注接口
router.post('/followbtn',userfans.followbtn)
// 获取关注的人接口
router.post('/allfollow',userfans.Allfollow)
module.exports = router
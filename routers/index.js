const express = require('express');
let router = express.Router();
const admin = require('./loginregister/index')
const mylieidle = require('./mylieidle/index')
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
// 我的闲置接口
// router.get('/mylieidle', mylieidle.getAll)

module.exports = router
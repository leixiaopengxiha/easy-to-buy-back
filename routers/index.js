const express = require('express');
let router = express.Router();
const admin = require('./loginregister/index')
const mylieidle = require('./mylieidle/index')
const home = require('./home/index')
const panning = require('./square/index')
const release = require('./release/index')

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
router.post('/swiper', home.Swipers)

// 我的闲置接口
// router.get('/mylieidle', mylieidle.getAll)

router.post('/register', admin.Register) // 注册
router.post('/login', admin.Logins) // 登录
router.post('/getadmin', admin.Getadmin) // 获取当前登录用户信息
router.post('/getpanning', panning.Allpanning) // 获取所有淘货
router.post('/thumbscount', panning.Thumbscount) // 更新点赞次数
router.post('/uploadphoto', release.Uploadphoto) // 上传照片
router.post('/cleararray', release.Cleararray) // 清空照片数组
router.post('/releasetopic', release.Releasetopic) // 发布话题

module.exports = router
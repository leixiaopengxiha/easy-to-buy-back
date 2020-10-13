const express = require('express');
let router = express.Router();
const admin = require('./loginregister/index')
const home = require('./home/index')
const panning = require('./square/index')
const release = require('./release/index')

const transaction = require('./transaction/index')
// 粉丝关注
const userfans = require('./userfans/index')
router.get('/', (req, res) => {
    res.json({
        code: '200',
        text: "欢迎进入8848"
    })
})
// 首页轮播
router.post('/swiper', home.Swipers)
// 首页搜索
router.post('/search', home.Search)
// 历史记录
router.post('/addhistorical', home.AddHistorical)
// 获取历史记录
router.post('/obhistorical', home.ObHistorical)

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

// 我买的接口
// router.get('/getAllbuy', transaction.getAllbuy)
// 我卖的接口
// router.get('/getAllbuy',)
// 关注接口
router.post('/followbtn', userfans.followbtn)
// 获取关注的人接口
router.post('/allfollow', userfans.Allfollow)
// 编辑资料接口
router.post('/editprofile', userfans.Editprofile)
module.exports = router
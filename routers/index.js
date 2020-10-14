const express = require('express');
let router = express.Router();
const admin = require('./loginregister/index')
const home = require('./home/index')
const square = require('./square/index')
const release = require('./release/index')
const userfans = require('./userfans/index')
const transaction = require('./transaction/index')
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
router.post('/squaregetpanning', square.SquareAllpanning) // 获取所有淘货
router.post('/squarepanningdetails', square.SquarePanningDetails) // 更新点赞次数
// router.post('/getsquaretopic', square.Allsquaretopic) // 获取所有话题
router.post('/squarethumbscount', square.SquareThumbscount) // 更新点赞次数
router.post('/uploadphoto', release.Uploadphoto) // 上传照片
router.post('/cleararray', release.Cleararray) // 清空照片数组
router.post('/releaseaside', release.Releaseaside) // 发布闲置
router.post('/releasetopic', release.Releasetopic) // 发布话题

// 我买的接口
router.post('/getAllbuy', transaction.GetAllbuy)
// 关注接口
router.post('/followbtn', userfans.Followbtn)
// 获取关注的人接口
router.post('/allfollow', userfans.Allfollow)
// 编辑资料接口
router.post('/editprofile', userfans.Editprofile)
module.exports = router
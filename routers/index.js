//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  - /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//           佛祖保佑       永不宕机     永无BUG
//
//       佛曰:
//               写字楼里写字间，写字间里程序员；
//               程序人员写程序，又拿程序换酒钱。
//               酒醒只在网上坐，酒醉还来网下眠；
//               酒醉酒醒日复日，网上网下年复年。
//               但愿老死电脑间，不愿鞠躬老板前；
//               奔驰宝马贵者趣，公交自行程序员。
//               别人笑我忒疯癫，我笑自己命太贱；
//               不见满街漂亮妹，哪个归得程序员？
//
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
// router.post('/getsquaretopic', square.Allsquaretopic) // 获取所有话题
router.post('/squarethumbscount', square.SquareThumbscount) // 更新点赞次数
router.post('/uploadphoto', release.Uploadphoto) // 上传照片
router.post('/cleararray', release.Cleararray) // 清空照片数组
router.post('/releaseaside', release.Releaseaside) // 发布闲置
router.post('/releasetopic', release.Releasetopic) // 发布话题

// 我买的接口
router.post('/getallbuy', transaction.GetAllbuy)
// 关注接口
router.post('/followbtn', userfans.Followbtn)
// 获取关注的人接口
router.post('/allfollow', userfans.Allfollow)
// 编辑资料接口
router.post('/editprofile', userfans.Editprofile)
module.exports = router
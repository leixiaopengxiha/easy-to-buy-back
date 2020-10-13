//操作数据库的逻辑
let mongoose = require('mongoose')
let {
  db_url
} = require('./config')
// connect里面的{ useNewUrlParser: true, useUnifiedTopology: true }必须加，否则不会报错但是有警告
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// 用户表 登录注册
let movieSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    required: true
  },
  nickname: String,
  photourl: String,
  signature: String,
  fans: Number, // 粉丝数
  follow: Number, // 关注数
  thumbs: Number // 点赞数
}, {
  collection: 'admin'
})
let Admin = mongoose.model('admin', movieSchema)

// 用户粉丝和关注详情
let userfansSchema = new mongoose.Schema({
  username: String, // 用户账号
  fans: Array, // 用户的粉丝详情
  follow: Array // 用户的关注详情
}, {
  collection: 'userfans'
})
let Userfans = mongoose.model('userfans', userfansSchema)


// // 轮播图表
// let loopSchema = new mongoose.Schema(
//   {
//     image: String
//   },
//   { collection: 'loop' }
// )
// let Loop = mongoose.model('loop', loopSchema)

// // 购物车表
// let orderSchema = new mongoose.Schema(
//   {
//     image: String,
//     name: String,
//     entryDate: String,
//     num: Number,
//     status: Number,
//     price: Number
//   },
//   { collection: 'order' }
// )
// let Order = mongoose.model('order', orderSchema)

// // 我的课程表
// let mycommoditySchema = new mongoose.Schema(
//   {
//     name:String, // 课程名称
//     image:String, // 课程图片
//     Price:Number, // 课程价格
//     details:String, // 课程详情介绍
//     author:String, // 课程作者
//     entryDate: String, // 上架时间
//     press:String, // 课程出版社
//     classification:String // 课程类别

//   },
//   { collection: 'mycommodity' }
// )
// let Mycommodity = mongoose.model('mycommodity', mycommoditySchema)


// 将表暴露出去
module.exports = {
  Admin, // 用户表
  Userfans,
  // Commodity, //商品表
  // Order, //购物车表
  // Mycommodity // 课程表
}
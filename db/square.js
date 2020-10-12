// 广场
let mongoose = require('mongoose')
let { db_url } = require('./config')

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })

// 广场 - 淘货（panning）
let panningSchema = new mongoose.Schema({
  label: String, // 推荐
  title: String, // 卡通金属文具盒
  sort: String, // 图书文具
  price: String, // 价格
  explain: String, // 说明
  imgurl: Array, // 图片路径
  username: String, // 获取用户账号
  time: String, // 发布时间
  fans: Number, // 粉丝
  see: Number, //查看
  thumbs: Number, // 点赞
  thumbsArr: Array, // 点赞用户列表
  transaction: Number, // 交易状态 1：买 2：卖
  buystate: Number, // 已买商品的状态 1：未签收 2：已签收 3：未评价 4：已评价
}, { collection: 'panning' })
let Panning = mongoose.model('panning', panningSchema)

// 广场 - 话题（topic）
// let squareTopicSchema = new mongoose.Schema({
//   label: String,
//   username: String,
// })


// 将表暴露出去
module.exports = {
  Panning, // 广场 - 淘货
}
//操作数据库的逻辑
let mongoose = require('mongoose')
let { db_url } = require('./config')
// connect里面的{ useNewUrlParser: true, useUnifiedTopology: true }必须加，否则不会报错但是有警告
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// 我买的和我卖的表
let transacSchema = new mongoose.Schema({
    imgurl: Array,      // 图片路径
    nickname: String,   // 卖家
    explain: String,    // 产品描述
    sort: String,       // 产品类型
    username: String,   // 用户账号
    transaction: Number,// 我买的
    goodsid: Number,    // 商品id
    business: Number,   // 交易状态(已签收:1/未签收:2/未评价:3/申请售后:4)
}, {
    collection: 'transaction'
})
let Transaction = mongoose.model('transaction', transacSchema)


// 将表暴露出去
module.exports = {
    Transaction, // 我买的
}
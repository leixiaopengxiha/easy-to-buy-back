// 发布
let mongoose = require('mongoose')
let { db_url } = require('./config')

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })

// 发布话题（Release topic）
let topicSchema = new mongoose.Schema({
    label: String, // 标签
    title: String, // 标题
    price: String, // 价格
    explain: String, // 说明
    imgurl: Array, // 图片路径
    username: String, // 获取用户账号
    time: String, // 发布时间
    fans: Number, // 粉丝
    see: Number, // 查看
    thumbs: Number, // 点赞
    comment: Number, // 评论总数
}, { collection: 'topic' })
let Topic = mongoose.model('topic', topicSchema)

// 将表暴露出去
module.exports = {
    Topic, // 发布话题
}

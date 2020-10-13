// 发布
let mongoose = require('mongoose')
let { db_url } = require('./config')

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })

// 发布闲置
let releaseAsideSchema = new mongoose.Schema({
    label: String, // 标签
    title: String, // 标题
    price: String, // 价格
    explain: String, // 说明
    imgurl: Array, // 图片路径
    username: String, // 获取用户账号
    time: String, // 发布时间
    see: Number, // 查看
    thumbs: Number, // 点赞
    thumbsArr: Array, // 点赞用户列表
    comment: Number, // 评论总数
    commentArr: Array, // 评论数组
}, { collection: 'releaseaside' })
let ReleaseAside = mongoose.model('releaseaside', releaseAsideSchema)

// 发布话题
let releaseTopicSchema = new mongoose.Schema({
    label: String, // 标签
    explain: String, // 说明
    imgurl: Array, // 图片路径
    username: String, // 获取用户账号
    time: String, // 发布时间
    see: Number, // 查看
    thumbs: Number, // 点赞
    thumbsArr: Array, // 点赞用户列表
    comment: Number, // 评论总数
    commentArr: Array, // 评论数组
}, { collection: 'releaseTopic' })
let ReleaseTopic = mongoose.model('releaseTopic', releaseTopicSchema)

// 将表暴露出去
module.exports = {
    ReleaseAside, // 发布闲置
    ReleaseTopic, // 发布话题
}

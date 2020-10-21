//操作数据库的逻辑
let mongoose = require('mongoose')
let { db_url } = require('./config')
// connect里面的{ useNewUrlParser: true, useUnifiedTopology: true }必须加，否则不会报错但是有警告
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// 消息活动
let NewsActivity = new mongoose.Schema({
    title: String,   // 用户账号
    text: String,// 我买的
    url: String,    // 商品id
    time: String,
	id:{
		type:String,
		// ref:NewsActivityDetail,
		// ref 关联detail消息活动详情页
	}
}, {
    collection: 'newsActivity'
})
// 消息他人主页我的数据
let HisChatMydata = new mongoose.Schema({
    url: String,   // 用户账号
    text: String,// 我买的
    price: String,    // 商品id
    collection1: String,
	_id:{
		type:String,
		// ref:NewsActivityDetail,
		// ref 关联detail消息活动详情页
	}
}, {
    collection: 'hischat-mydata'
})
// 消息帖子页数据
let HisChatTiezidata = new mongoose.Schema({
    url: String,   // 用户账号
    text: String,// 我买的
    collection1: String,
	_id:{
		type:String,
		// ref:NewsActivityDetail,
		// ref 关联detail消息活动详情页
	}
}, {
    collection: 'hischat-tiezidata'
})
let HisChatDongtaidata = new mongoose.Schema({
    url: String,   // 用户账号
    text: String,// 我买的
    shoucang: String,
	price:String,
	_id:{
		type:String,
		// ref:NewsActivityDetail,
		// ref 关联detail消息活动详情页
	}
}, {
    collection: 'hischatdongtaidata'
})
let News = mongoose.model('newsActivity', NewsActivity)
let NewsHisdata = mongoose.model('hischat-mydata', HisChatMydata)
let HisTiezidata = mongoose.model('hischat-tiezidata', HisChatTiezidata)
let HisDongtaidata = mongoose.model('hischatdongtaidata', HisChatDongtaidata)


// 将表暴露出去
module.exports = {
    News, // 消息活动
	NewsHisdata, // 消息页 聊天他人主页 我的页面数据
	HisTiezidata,
	HisDongtaidata
}
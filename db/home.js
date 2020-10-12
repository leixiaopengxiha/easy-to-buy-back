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
// 轮播
let swiperSchema = new mongoose.Schema({
    image: String,
}, {
    collection: 'swiper'
})
let Swiper = mongoose.model('swiper', swiperSchema)


// 将表暴露出去
module.exports = {
    Swiper // 轮播
}
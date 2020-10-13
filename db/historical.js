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
// 历史记录
let historicalSchema = new mongoose.Schema({
    username: String,
    histori: Array,
}, {
    collection: 'historical'
})
let Historical = mongoose.model('historical', historicalSchema)


// 将表暴露出去
module.exports = {
    Historical // 历史记录
}
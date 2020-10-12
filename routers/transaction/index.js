// 我买的接口
let { Transaction, Ceshibuy } = require("../../db/my")
// let { Admin } = require("../../db/user")
exports.getAllbuy = (req, res) => {
    const { username, transaction } = req.body
    Transaction.find({
        username: username,
        transaction: transaction
    }, (err, ret) => {
        if (err) {
            return res.json({
                code: 500,
                message: '服务器错误'
            })
        }
        if (ret) {
            res.json({
                code: 200,
                data: ret
            })
        }
    })
}
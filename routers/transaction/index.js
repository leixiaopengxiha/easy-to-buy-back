// 我买的接口
let { Transaction } = require("../../db/my")
// let { Admin } = require("../../db/user")
exports.getAllbuy = (req, res) => {
    const { username, transaction } = req.body
    Transaction.find({ username, transaction }).then(doc => {
        // console.log(doc.length)
        if (doc.length=="0") {
            res.json({
                code: 200,
                data: doc
            })
        } else {
            res.json({
                code: 201,
                msg: '没有查询到'
            })
        }
    })
}
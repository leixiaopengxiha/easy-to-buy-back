// 我买的接口
let { Transaction } = require("../../db/my")
let { ReleaseAside } = require("../../db/release")
// 话题的表
let { ReleaseTopic } = require('../../db/release')
// let { Admin } = require("../../db/user")
exports.GetAllbuy = (req, res) => {
    const {username,transaction} = req.body
    if(transaction==1){
        Transaction.find({...req.body}).then(doc => {
            // transaction:1为我买的 2为我卖的
            if (doc) {
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
    }else if(transaction==2){
        ReleaseAside.find({username:username}).then(doc => {
            // transaction:1为我买的 2为我卖的
            if (doc) {
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
}
exports.Getinvitation = (req, res) => {
    const { username } = req.body
    ReleaseTopic.find({ username }).then(doc => {
        if (doc.length !== 0) {
            res.json({
                code: 200,
                msg: "获取到" + doc.length + "条数据",
                data: doc
            })
        } else {
            res.json({
                code: 201,
                msg: '没有获取到数据'
            })
        }
    })
}
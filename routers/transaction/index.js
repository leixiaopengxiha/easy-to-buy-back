// 我买的接口
let {
    Transaction
} = require("../../db/my")
// let { Admin } = require("../../db/user")
exports.GetAllbuy = (req, res) => {
    let b = (JSON.stringify(req.body) === "{}");
    if(!b){
        Transaction.find(req.body).then(doc => {
            // transaction:1为我卖的 2为我买的
            if(doc){
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
    }else{
        res.json({
            code:'201',
            msg:"获取失败"
        })
    }
}
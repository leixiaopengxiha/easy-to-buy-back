// 淘货集合
let { Panning } = require('../../db/square')
// 登录注册集合
let { Admin } = require('../../db/user')

// 获取所有淘货数据
exports.Allpanning = (req,res) => {
    const { label } = req.body
    Panning.find({ label }).then(docs=>{
        if(docs.length == 0){
            res.json({
                code: -1,
                msg: "没有取到任何信息",
                data: []
            })
        }else{
            const data = [];
            for (let i = 0; i < docs.length; i++) {
                Admin.find({username: docs[i].username}).then(docss=>{
                    let {nickname,photourl} = docss[0]
                    let obj = {...docs[i]._doc, nickname, photourl}
                    data.push(obj)
                    if(i === docs.length - 1){
                        res.json({
                            code: 0,
                            msg: "成功取到" + docs.length + "条信息",
                            data
                        })
                    }
                })
            }
        }
    })
}

// 更新点赞次数
exports.Thumbscount = (req,res) => {
    const {id,username} = req.body
    Panning.findOne({ _id: id }).then(docs=>{
        if(docs){
            const flag = docs.thumbsArr.includes(username)
            if(!flag){
                const data = {thumbsArr: [...docs.thumbsArr,username],thumbs: docs.thumbsArr.length+1}
                Panning.updateMany({_id: id},{$set: data}).then(docss=>{
                    if(docss.ok == 1){
                        res.json({
                            code: 200,
                            msg: "点赞成功"
                        })
                    }else{
                        res.json({
                            code: 202,
                            msg: "点赞失败"
                        })
                    }
                })
            }else{
                res.json({
                    code: 201,
                    msg: "您已经点过赞了"
                })
            }
        }
    })
}

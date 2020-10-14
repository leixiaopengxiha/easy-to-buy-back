let {
    ReleaseAside,
    ReleaseTopic
} = require('../../db/release')
let {
    Admin
} = require('../../db/user')

// 获取所有淘货数据
exports.SquareAllpanning = (req,res) => {
    const { label } = req.body
    let labels = {}
    if (label) { 
        labels = { label }
    }
    ReleaseAside.find(labels).sort({time: -1}).then(docs => {
        if(docs.length == 0){
            res.json({
                code: 201,
                msg: "没有取到任何信息",
                data: []
            })
        } else {
            const data = [];
            for (let i = 0; i < docs.length; i++) {
                Admin.find({
                    username: docs[i].username
                }).then(docss => {
                    if (docss.length == 0) {
                        res.json({
                            code: 204,
                            msg: "没有该用户"
                        })
                    } else {
                        let {
                            nickname,
                            photourl,
                            fans,
                            follow
                        } = docss[0]
                        let obj = {
                            ...docs[i]._doc,
                            nickname,
                            photourl,
                            fans,
                            follow
                        }
                        data.push(obj)
                        if (i === docs.length - 1) {
                            res.json({
                                code: 200,
                                msg: "成功取到" + docs.length + "条信息",
                                data
                            })
                        }
                    }
                })
            }
        }
    })
}

// 广场淘货详情
exports.SquarePanningDetails = (req,res)=>{
    const { id } = req.body
    ReleaseAside.findOne({_id: id}).then(docs => {
        if(docs){
            Admin.find({username: docs.username}).then(docss => {
                if(docss.length == 0){
                    res.json({
                        code: 204,
                        msg: "没有该用户"
                    })
                }else{
                    let {nickname, photourl, fans, follow} = docss[0]
                    let obj = {...docs._doc, nickname, photourl, fans, follow}
                    res.json({
                        code: 200,
                        msg: '成功获取详情',
                        data: obj
                    })
                }
            })
        } else {
            res.json({
                code: 201,
                msg: '没有取到任何信息'
            })
        }
    })
}

// 更新点赞次数
exports.SquareThumbscount = (req, res) => {
    const {
        id,
        username
    } = req.body
    ReleaseAside.findOne({
        _id: id
    }).then(docs => {
        if (docs) {
            const flag = docs.thumbsArr.includes(username)
            if (!flag) {
                const data = {
                    thumbsArr: [...docs.thumbsArr, username],
                    thumbs: docs.thumbsArr.length + 1
                }
                ReleaseAside.updateMany({
                    _id: id
                }, {
                    $set: data
                }).then(docss => {
                    if (docss.ok == 1) {
                        res.json({
                            code: 200,
                            msg: "点赞成功"
                        })
                    } else {
                        res.json({
                            code: 202,
                            msg: "点赞失败"
                        })
                    }
                })
            } else {
                res.json({
                    code: 201,
                    msg: "您已经点过赞了"
                })
            }
        }
    })
}
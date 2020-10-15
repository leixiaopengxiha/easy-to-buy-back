let {
    ReleaseAside,
    ReleaseTopic
} = require('../../db/release')
let {
    Admin
} = require('../../db/user')

// 获取话题数据
exports.SquareAlltopic = (req,res)=>{
    const { flag, page } = req.body
    let flags = {}
    if(flag){
        flags = { flag }
    }
    if(flags.flag == '最热'){
        ReleaseTopic.find().sort({see: -1}).limit(3).then(docs => {
            getData(docs, res)
        })
    }else{
        ReleaseTopic.find(flags).sort({time: -1}).skip(page * 3).limit(10).then(docs => {
            getData(docs, res)
        })
    }
}

// 获取淘货数据
exports.SquareAllpanning = (req,res) => {
    const { label, page } = req.body
    let labels = {}
    if(label){ 
        labels = { label }
    }
    ReleaseAside.find(labels).sort({time: -1}).skip(page * 3).limit(10).then(docs => {
        getData(docs, res)
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

// 更新淘货点赞次数
exports.SquareThumbscount = (req, res) => {
    const {
        id,
        username,
        thumbs_flag
        // 0：取消点赞
        // 1：点赞
    } = req.body
    ReleaseAside.findOne({
        _id: id
    }).then(docs => {
        if (docs) {
            if(thumbs_flag == 1){
                const flag = docs.thumbsArr.includes(username)
                if(!flag){
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
            }else if(thumbs_flag == 0){
                const flag = docs.thumbsArr.includes(username)
                if(flag){
                    const data = {
                        thumbsArr: docs.thumbsArr.filter(item => item != username),
                        thumbs: docs.thumbsArr.length - 1
                    }
                    ReleaseAside.updateMany({
                        _id: id
                    }, {
                        $set: data
                    }).then(docss => {
                        if (docss.ok == 1) {
                            res.json({
                                code: 200,
                                msg: "取消成功"
                            })
                        } else {
                            res.json({
                                code: 202,
                                msg: "取消失败"
                            })
                        }
                    })
                } else {
                    res.json({
                        code: 201,
                        msg: "您已经取消过了"
                    })
                }
            }else{
                res.json({
                    code: 204,
                    msg: "该操作不符合规则"
                })
            }
        }else{
            res.json({
                code: 203,
                msg: "没有该数据"
            })
        }
    })
}

// 封装获取数据方法
function getData(docs, res){
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
}

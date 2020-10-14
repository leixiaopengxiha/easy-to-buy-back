let {
    Swiper
} = require("../../db/home")
let {
    ReleaseAside
} = require("../../db/release")
let {
    Historical
} = require("../../db/historical")
// 轮播接口
exports.Swipers = (req, res) => {
    Swiper.find({}, (err, ress) => {
        if (err) {
            console.log(err)
        } else {
            if (ress) {
                res.json({
                    code: 200,
                    data: ress
                })
            } else {
                res.json({
                    code: 202,
                    message: "请求失败!"
                })
            }
        }
    })
}

// search 搜索接口
exports.Search = (req, res) => {
    let {
        content
    } = req.body
    console.log(content)
    let label = JSON.parse(JSON.stringify({
        $regex: content
    }));
    let title = JSON.parse(JSON.stringify({
        $regex: content
    }));
    ReleaseAside.find({
        label
    }).then(docs => {
        if (docs.length == 0) {
            titles()
        } else {
            res.json({
                code: 200,
                data: docs
            })
        }
    })

    function titles() {
        ReleaseAside.find({
            title
        }).then(docs => {
            if (docs.length == 0) {
                res.json({
                    code: 200,
                    data: {
                        text: '暂无次数据'
                    }
                })
            } else {
                res.json({
                    code: 200,
                    data: docs
                })
            }
        })
    }
}

//添加历史记录

exports.AddHistorical = (req, res) => {
    let {
        content,
        username
    } = req.body
    console.log(content, username)
    Historical.find({
        username
    }).then((doce) => {
        if (doce.length === 0) {
            addh()
        } else {
            if (doce[0].histori.length >= 10) {
                let aa = JSON.parse(JSON.stringify(doce[0].histori))
                aa.pop()
                let histori = {
                    histori: [content, ...aa]
                }
                Historical.updateMany({
                    username
                }, {
                    $set: histori
                }).then((docu) => {
                    res.json({
                        code: 200
                    })
                })
            } else {
                let histori = {
                    histori: [content, ...doce[0].histori]
                }
                Historical.updateMany({
                    username
                }, {
                    $set: histori
                }).then((docu) => {
                    res.json({
                        code: 200
                    })
                })
            }

        }

    })

    function addh() {
        var historical = new Historical({
            username: username,
            histori: [content]
        })
        historical.save(function (err) {
            if (err) {
                return console.log(err)
            }
            res.json({
                code: 200
            })
        })
    }
}

// 获取历史记录
exports.ObHistorical = (req, res) => {
    let {
        username
    } = req.body
    Historical.find({
        username
    }).then((doc) => {
        res.json({
            code: 200,
            data: doc
        })
    })
}
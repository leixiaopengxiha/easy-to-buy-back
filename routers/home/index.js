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
            res.json({
                code: 200,
                data: docs
            })
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
            let aa = JSON.parse(JSON.stringify(doce[0].histori))
            aa = aa.filter(item => item != content)
            if (doce[0].histori.length >= 10) {
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

// 清空历史记录
exports.ReHistorical = (req, res) => {
    let {
        username
    } = req.body
    Historical.remove({
        username
    }).then(docs => {
        res.json({
            code: 200,
            data: '清楚成功'
        })
    })
}




// 获取全分类
exports.GetIfication = (req, res) => {
    let {
        label
    } = req.body
    let aa = {}
    if (label) {
        aa = {
            label
        }
    }
    ReleaseAside.find(aa).then(docs => {
        res.json({
            code: 200,
            data: docs
        })
    })
}
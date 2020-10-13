let {
    Swiper
} = require("../../db/home")
let {
    Topic
} = require("../../db/release")

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

    let label = JSON.parse(JSON.stringify({
        $regex: content
    }));
    let title = JSON.parse(JSON.stringify({
        $regex: content
    }));
    Topic.find({
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
        Topic.find({
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

//
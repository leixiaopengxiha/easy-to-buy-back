let {
    Swiper
} = require("../../db/home")

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
                    code: 201,
                    message: "请求失败!"
                })
            }
        }
    })
}
let {
    Admin,
    Userfans
} = require("../../db/user")
let jwt = require("jsonwebtoken") // jwt 持久化登录
const {
    json
} = require("body-parser")
// const multer = require("multer") // 上传头像
// 登录接口
exports.Logins = (req, res) => {
    const {
        username,
        password
    } = req.body
    if (username === '' || password === '') {
        return res.json({
            code: 202,
            message: "用户名或密码不能为空!"
        })
    }
    Admin.findOne({
        username: username
    }, (err, ret) => {
        if (err) {
            return console.log("查询失败!")
        }
        if (ret) {
            const {
                username
            } = ret
            if (ret.password === password)
                return res.json({
                    code: 200,
                    data: {
                        token: jwt.sign({
                            username: username
                        }, "abcd", {
                            // 过期时间
                            expiresIn: "2h"
                        })
                    },
                    message: "登录成功!"
                });
            res.json({
                code: 201,
                message: "密码不正确!"
            })
        } else {
            res.json({
                code: 203,
                message: "该用户未注册!"
            })
        }
    })
}
// 注册接口
exports.Register = (req, res) => {
    let {
        username,
        password
    } = req.body
    if (username === '' || password === '' || password == undefined) {
        return res.json({
            code: "201",
            message: "用户名或密码不能为空!"
        })
    }
    let myreg = /^1[3456789]\d{9}$/;
    if (!myreg.test(username)) {
        return res.json({
            code: "202",
            message: "手机号格式不正确"
        })
    }

    Admin.findOne({
        username: username
    }, (err, ret) => {
        if (err) {
            return console.log("查询失败!")
        }
        if (ret) {
            return res.json({
                code: "204",
                message: "该用户已存在!"
            });
        }
        var user = new Admin({
            username: username,
            password: password,
            nickname: username,
            photourl: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            signature: '你咋不上天呢？',
            fans: 0,
            follow: 0,
            thumbs: 0
        })
        user.save(function (err, ress) {
            if (err) {
                return console.log(err)
            }
            res.json({
                code: "200",
                message: '注册成功',
            })
        })
        // 在 userfans 表中添加该用户的信息
        let userfans = new Userfans({
            username,
            fans: [],
            follow: [],
        })
        userfans.save()
    })
}
//获取当前登录用户信息
exports.Getadmin = (req, res) => {
    let {
        token
    } = req.body
    jwt.verify(token, "abcd", function (err, decode) {
        if (err) {
            res.json({
                code: 201,
                data: "success",
                message: "登录时间已过期，请重新登录!"
            });
        } else {
            // 查询用户的基本信息
            Admin.findOne({
                username: decode.username
            }, (err, ret) => {
                if (err) {
                    return console.log("查询失败!")
                }
                if (ret) {
                    // 查询粉丝和关注数
                    Userfans.findOne({ username:decode.username }, (err, rett) => {
                        console.log(rett)
                        if (rett) {
                            res.json({
                                code: 200,
                                data: {
                                    nickname: ret.nickname,
                                    photourl: ret.photourl,
                                    username: ret.username,
                                    signature: ret.signature,
                                    fans: rett.fans.length,
                                    follow: rett.follow.length,
                                    thumbs: ret.thumbs,
                                    id: ret._id,
                                    token: jwt.sign({
                                        username: ret.username
                                    }, "abcd", {
                                        // 过期时间
                                        expiresIn: "1h"
                                    })
                                }
                            })
                        }
                    })

                } else {
                    res.json({
                        code: 202,
                        message: "Login failed, unable to get user details."
                    })
                }
            })
        }
    })
}
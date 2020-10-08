let {
    Admin
} = require("../../db/user")
let jwt = require("jsonwebtoken") // jwt 持久化登录
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
    if (username === '' || password === '') {
        return res.json({
            code: "201",
            message: "用户名或密码不能为空!"
        })
    }
    let myreg = /^1[3456789]\d{9}$/;
    console.log()
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

        // let regName = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){3,15}$/
        // let regPass = /^[a-z+A-Z+0-9+]{3,15}$/
        // if (regName.test(user.username)) {
        //     return res.json({
        //         code: "202",
        //         message: "4到16位(字母，数字，下滑线，减号)!"
        //     })
        // }


        // if (regPass.test(user.password)) {
        //     return res.json({
        //         code: "203",
        //         message: "密码最少6位，最多16位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符(指的是._-)!"
        //     })
        // }
        user.save(function (err, ress) {

            if (err) {
                return console.log(err)
            }
            res.json({
                code: "200",
                message: '注册成功',
            })
        })
    })
}
//获取当前登录用户信息
exports.Getadmin = (req, res) => {
    let {
        token,
        username
    } = req.body
    jwt.verify(token, "abcd", function (err, decode) {
        console.log(decode)
        if (err) {
            res.json({
                code: 201,
                data: "success",
                message: "登录时间已过期，请重新登录!"
            });
        } else {
            Admin.findOne({
                username: username
            }, (err, ret) => {
                if (err) {
                    return console.log("查询失败!")
                }
                if (ret) {
                    res.json({
                        code: 200,
                        data: {
                            nickname: ret.nickname,
                            photourl: ret.photourl,
                            username: ret.username,
                            signature: ret.signature,
                            fans: ret.fans,
                            follow: ret.follow,
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
                } else {
                    ress.json({
                        code: 202,
                        message: "Login failed, unable to get user details."
                    })
                }
            })
        }
    })
}













// app.post("/register", (req, res) => {
//     
//    
// })

// //登录
// app.post("/login", (req, ress) => {

// })

// //获取当前登录用户信息
// app.get("/getadmin", (req, res) => {
//     jwt.verify(req.query.token, "abcd", function (err, decode) {
//         if (err) {
//             res.json({
//                 code: 201,
//                 data: "success",
//                 message: "登录时间已过期，请重新登录!"
//             });
//         } else {
//             Admin.findOne({
//                 adminName: decode.username
//             }, (err, ret) => {
//                 if (err) {
//                     return console.log("查询失败!")
//                 }
//                 if (ret) {
//                     res.json({
//                         code: 200,
//                         data: {
//                             introduction: `I am an ${ret.adminName}`,
//                             avatar: ret.avatar,
//                             name: ret.adminName,
//                             id: ret._id,
//                             token: jwt.sign({
//                                 username: ret.adminName
//                             }, "abcd", {
//                                 // 过期时间
//                                 expiresIn: "1h"
//                             })
//                         }
//                     })
//                 } else {
//                     ress.json({
//                         code: 202,
//                         message: "Login failed, unable to get user details."
//                     })
//                 }
//             })
//         }
//     })
// })

// //修改密码
// app.post('/changepassword', (req, res) => {
//   const {
//     _id,
//     oldpassword,
//     newpassword
//   } = req.body
//   let upObj = {}
//   if (oldpassword && newpassword) {
//     upObj.password = newpassword
//   } else if (newpassword) {
//     upObj.password = newpassword
//   }
//   Admin.findOne({
//     _id
//   }, (err, ret) => {
//     if (err) {
//       return console.log(err)
//     };
//     if (oldpassword && newpassword) { //如果前端传的参数为oldpassword、newpassword，将修改密码
//       if (ret.password === oldpassword) { //验证输入的旧密码是否跟数据库的密码匹配
//         Admin.updateOne({
//           '_id': _id
//         }, upObj, (err, docs) => {
//           if (err) {
//             return console.log('更新数据失败!');
//           }
//           res.json({
//             code: 200,
//             msg: "密码修改成功!"
//           })
//         })
//       } else {
//         res.json({
//           code: 201,
//           msg: "旧密码错误!"
//         })
//       }
//     } else if (newpassword) { //如果前端传的参数只有新密码 newpassword，将修改密码
//       Admin.updateOne({
//         '_id': _id
//       }, upObj, (err, docs) => {
//         if (err) {
//           return console.log('更新数据失败!')
//         }
//         res.json({
//           code: 202,
//           msg: "密码修改成功!"
//         })
//       })
//     }
//   })
// })

// //获取轮播图
// app.get("/loop", async (req, res) => {
//   try {
//     Loop.find({}, (err, ress) => {
//       if (err) {
//         console.log(err)
//       } else {
//         if (ress) {
//           res.json({
//             code: 200,
//             data: ress
//           })
//         } else {
//           res.json({
//             code: 201,
//             msg: "连接失败!"
//           })
//         }
//       }
//     })
//   } catch (error) {
//     res.json({
//       code: 202,
//       msg: error
//     })
//   }
// })

// //获取全部商品和实现分页
// app.post("/commodity", async (req, res) => {
//   let {
//     page
//   } = req.body //当前页数
//   let pageSize = 10 //每页显示条目个数
//   try {
//     let commodityList = await Commodity.find({}) //获取所有商品的数据
//     let maxPageHome = Math.ceil(commodityList.length / pageSize) //最大页数
//     if (page > maxPageHome) {
//       res.json({
//         code: 201,
//         msg: "超过最大页数!"
//       })
//       return false
//     } else {
//       let pagelist = commodityList.slice((page - 1) * pageSize, page * pageSize)
//       res.json({
//         code: 200,
//         data: pagelist, // 截取的当前页的数据
//         total: commodityList.length, // 总数据的长度，
//         delpage: Math.ceil(commodityList.length / pageSize) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
//       })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })

// //增加购物车商品
// app.post("/addcommodity", async (req, res) => {
//   let user = req.body
//   let allcommodity = await Order.find({})
//   let maxPage = 10; //每页最大条数
//   let maxpages = Math.ceil(allcommodity.length / maxPage) //设置最大页数
//   try {
//     Order.findOne({
//       name: user.name
//     }, (err, ret) => {
//       if (err) {
//         return console.log("查询失败!")
//       }
//       if (ret) {
//         return res.json({
//           code: 203,
//           msg: "该商品已存在!"
//         })
//       }
//       Order.create(user, (err, ress) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.json({
//             code: 200,
//             msg: "添加成功!",
//             data: ress,
//             maxpages: maxpages //添加的时候要拿到最大的页数，添加完毕后跳转至最大页数
//           });
//         }
//       });
//     });
//   } catch (error) {
//     res.json({
//       code: 211,
//       msg: "连接失败!"
//     })
//   }
// })

// //根据商品名称查询商品(模糊查询)
// app.post("/selectcommodity", async (req, res) => {
//   let obj = req.body.obj
//   let page = req.body.page //查询出来的数据的当前页数 默认参数是1
//   let maxPage = 10 //每页最大条数
//   if (obj.name) {
//     obj["name"] = new RegExp(obj.name)
//   } //做一个姓名的模糊查询  加上这个判断和RegExp正则方法 拿到的obj如下 { name: /彭/ }
//   try {
//     let allstudentList = await Commodity.find({})
//     let maxPageHome = Math.ceil(allstudentList.length / maxPage); //设置最大页数
//     if (page > maxPageHome) {
//       res.json({
//         code: 202,
//         msg: "超过最大页数"
//       });
//       return false;
//     } else {
//       Commodity.find(obj, (err, ress) => {
//         if (err) {
//           return console.log(err)
//         }
//         if (ress) {
//           res.json({
//             code: 200,
//             data: ress.slice((page - 1) * maxPage, page * maxPage),
//             total: ress.length,
//             delpage: maxPageHome
//           });
//         } else {
//           res.json({
//             code: 211,
//             msg: "当前项不存在"
//           })
//         }
//       })
//     }
//   } catch (error) {
//     res.json({
//       code: 221,
//       msg: error
//     });
//   }
// })

// //删除购物车商品
// app.post("/delecommodity", async (req, res) => {
//   let Id = req.body
//   let commodityList = await Commodity.find(Id, (err, ress) => {
//     // 把你当前的_id值放到数据库里查找
//     if (err) {
//       console.log(err)
//     } else {
//       return ress
//     }
//   })
//   if (commodityList.length === 0) {
//     // 如果说你输入的_id值在数据库里面没有，就走这里
//     res.json({
//       code: 201,
//       msg: "没有当前项!"
//     })
//     return false
//   }
//   // 在数据库里能找到_id值 就进行删除
//   try {
//     Commodity.remove(Id, error => {
//       if (error) {
//         console.log(error)
//       } else {
//         res.json({
//           code: 200,
//           msg: "删除成功!"
//         })
//       }
//     });
//   } catch {
//     res.json({
//       code: 202,
//       msg: "连接删除接口失败!"
//     })
//   }
// })

// //获取全部课程和实现分页
// app.post("/mycommodity", async (req, res) => {
//   let {
//     page
//   } = req.body //当前页数
//   let pageSize = 10 //每页显示条目个数
//   try {
//     let mycommodity = await Mycommodity.find({}) //获取所有商品的数据
//     let maxPageHome = Math.ceil(mycommodity.length / pageSize) //最大页数
//     if (page > maxPageHome) {
//       res.json({
//         code: 201,
//         msg: "超过最大页数!"
//       })
//       return false
//     } else {
//       let pagelist = mycommodity.slice((page - 1) * pageSize, page * pageSize)
//       res.json({
//         code: 200,
//         data: pagelist, // 截取的当前页的数据
//         total: mycommodity.length, // 总数据的长度，
//         delpage: Math.ceil(mycommodity.length / pageSize) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
//       })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })

// //增加我的课程
// app.post("/addmycommodity", async (req, res) => {
//   let user = req.body
//   let allcommodity = await Mycommodity.find({})
//   let maxPage = 10; //每页最大条数
//   let maxpages = Math.ceil(allcommodity.length / maxPage) //设置最大页数
//   try {
//     Mycommodity.findOne({
//       name: user.name
//     }, (err, ret) => {
//       if (err) {
//         return console.log("查询失败!")
//       }
//       if (ret) {
//         return res.json({
//           code: 203,
//           msg: "该课程已存在!"
//         })
//       }
//       Mycommodity.create(user, (err, ress) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.json({
//             code: 200,
//             msg: "添加成功!",
//             data: ress,
//             maxpages: maxpages //添加的时候要拿到最大的页数，添加完毕后跳转至最大页数
//           });
//         }
//       });
//     });
//   } catch (error) {
//     res.json({
//       code: 211,
//       msg: "连接失败!"
//     })
//   }
// })

// //删除我的课程
// app.post("/delemycommodity", async (req, res) => {
//   let Id = req.body
//   let mycommodityList = await Mycommodity.find(Id, (err, ress) => {
//     // 把你当前的_id值放到数据库里查找
//     if (err) {
//       console.log(err)
//     } else {
//       return ress
//     }
//   })
//   if (mycommodityList.length === 0) {
//     // 如果说你输入的_id值在数据库里面没有，就走这里
//     res.json({
//       code: 201,
//       msg: "没有当前项!"
//     })
//     return false
//   }
//   // 在数据库里能找到_id值 就进行删除
//   try {
//     Mycommodity.remove(Id, error => {
//       if (error) {
//         console.log(error)
//       } else {
//         res.json({
//           code: 200,
//           msg: "删除成功!"
//         })
//       }
//     });
//   } catch {
//     res.json({
//       code: 202,
//       msg: "连接删除接口失败!"
//     })
//   }
// })

// //上传用户头像
// //配置diskStorage来控制文件存储的位置以及文件名字等
// let storage = multer.diskStorage({
//   //确定图片存储的位置
//   destination: function (req, file, cb) {
//     cb(null, '../public/avatars')
//   },
//   //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
// let upload = multer({
//   storage
// })

// //上传用户头像接口
// app.post('/headportrait', upload.single('files'), (req, res, next) => {
//   let _id = req.body.id
//   var url = 'http://132.232.89.22:3003/avatars/' + req.file.filename
//   if (req.file.filename) {
//     Admin.findByIdAndUpdate(
//       _id, {
//         avatar: url
//       },
//       (err, ret) => {
//         if (err) {
//           console.log("更新失败!")
//         } else {
//           res.json({
//             code: 200,
//             msg: "更新成功!"
//           });
//         }
//       }
//     )
//   }
// })
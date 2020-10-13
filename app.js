let express = require("express")
let path = require("path")
let bodyParse = require("body-parser")
let cors = require("cors") // 跨域
const router = require("./routers/index");
// let history = require('connect-history-api-fallback');// 路由模式为history时使用
// let jwt = require("jsonwebtoken") // jwt 持久化登录
// const multer = require("multer") // 上传头像
let app = express()

app.use(bodyParse.json())
app.use(cors()) // 跨域中间件
// app.use(history()); // 使用history中间件

// 设置静态资源目录
app.use(express.static(path.resolve("./public")));

// 将路由引入
app.use(router);

//监听是否启动
app.listen(8848, () => {
    console.log("http://localhost:8848")
})
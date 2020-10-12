// 发布集合
let { Topic } = require('../../db/release')
// 登录注册集合
let { Admin } = require('../../db/user')
const formidable = require("formidable");
const path = require("path");
const fs = require('fs')

// 上传图片
var dataList = []
var dataListImg =[]
exports.Uploadphoto = (req,res)=>{
	const form = new formidable.IncomingForm();
    form.uploadDir = path.resolve("./public/img/upload"); // 上传默认路径
    form.keepExtensions = true;// 保存扩展名
    form.parse(req, (err, fields, files) => {
        if (err) {throw err}
        // console.log('fields',fields)
        // console.log('files',files)
		let img = "http://132.232.89.22:8848/img/upload/" + path.parse(files.file.path).base;
		dataList.push({url: img})
		dataListImg.push({url:path.parse(files.file.path).base})
		res.json(dataList)
    })
}

// 清空数组
exports.Cleararray = (req,res)=>{
	if(dataList.length!==0&&dataListImg.length!==0){
		dataListImg.map((item,index)=>{
			fs.unlink(`public/img/upload/${item.url}`, function(err){
				if(err){ throw err}
				if(index==dataListImg.length-1){
					dataList = [];
					dataListImg=[]
				}
		   })
		})		
	}
}

// 发布
exports.Releasetopic = (req,res) => {
	const {username, inputVal, label} = req.body
	const data = {
	  imgurl: dataList,
	  username: username,
	  label: label,
	  title: label, // 标题
	  price: inputVal, // 价格
	  explain: '这个文具盒陪我很多年了，一直舍不得扔。忍痛卖出有要的联系我们', // 说明
	  time: new Date().getTime(), // 发布时间
	  fans: 0, // 粉丝
	  see: 0, // 查看
	  thumbs: 0, // 点赞
	  comment: 0, // 评论总数
	};
	Topic.insertMany([data]).then(docs=>{
		console.log(docs)
		res.json({
			code: 200,
			msg: '提交成功'
		})
	})
}

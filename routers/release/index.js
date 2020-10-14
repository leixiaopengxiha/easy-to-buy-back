// 发布闲置
let { ReleaseAside } = require('../../db/release')
// 发布话题
let { ReleaseTopic } = require('../../db/release')

const formidable = require("formidable");
const path = require("path");
const fs = require('fs')

// 上传图片
var dataList = {}
var dataListImg ={}
exports.Uploadphoto = (req,res)=>{
	const form = new formidable.IncomingForm();
    form.uploadDir = path.resolve("./public/img/upload"); // 上传默认路径
    form.keepExtensions = true;// 保存扩展名
    form.parse(req, (err, fields, files) => {
		let {username} = fields
        if (err) {throw err}
		// let img = "http://localhost:8848/img/upload/" + path.parse(files.file.path).base;
		let img = "http://132.232.89.22:8848/img/upload/" + path.parse(files.file.path).base;
		let imgurl =path.parse(files.file.path).base;
		if(!dataList[username]||!dataListImg[username]){
			dataList[username] =[]
			dataListImg[username] =[]
			dataList[username].push({url: img})
			dataListImg[username].push({url:imgurl})
			res.json(dataList[username])
		}else{
			dataList[username].push({url: img})
			dataListImg[username].push({url:imgurl})
			res.json(dataList[username])
		}
    })
}

// 清空数组
exports.Cleararray = (req,res)=>{
	let {username}=req.body
	if(dataList[username].length!==0&&dataListImg[username].length!==0){
		dataListImg[username].map((item,index)=>{
			fs.unlink(`public/img/upload/${item.url}`, function(err){
				if(err){ throw err}
				if(index==dataListImg[username].length-1){
					dataList[username] = [];
					dataListImg[username]=[]
				}
		   })
		})		
	}
}

// 发布闲置
exports.Releaseaside = (req,res) => {
	const {username, inputVal, label, typeInputVal, explainInputVal} = req.body
	const data = {
	  imgurl: dataList[username],
	  username: username,
	  label: label,
	  sort: label,
	  title: typeInputVal, // 标题
	  price: inputVal, // 价格
	  explain: explainInputVal, // 说明
	  time: new Date().getTime(), // 发布时间
	  see: 0, // 查看
	  thumbs: 0, // 点赞
	  thumbsArr: [], // 点赞用户列表
	  comment: 0, // 评论总数
	  commentArr: [], // 评论数组
	};
	ReleaseAside.insertMany([data]).then(docs=>{
		if(docs.length == 0){
			res.json({
				code: 201,
				msg: '提交失败'
			})
			dataList[username] = [];
			dataListImg[username]=[];
		}else{
			res.json({
				code: 200,
				msg: '提交成功'
			})
			dataList[username] = [];
			dataListImg[username]=[];
		}
	})
}

// 发布话题
exports.Releasetopic = (req,res) => {
	const {explain, username} = req.body
	const data = {
		// label
		explain: explain, // 说明
		imgurl: dataList[username], // 图片路径
		username: username, // 获取用户账号
		time: new Date().getTime(), // 发布时间
		see: 0, // 查看
		thumbs: 0, // 点赞
		thumbsArr: [], // 点赞用户列表
		comment: 0, // 评论总数
		commentArr: [], // 评论数组
	};
	ReleaseTopic.insertMany([data]).then(docs=>{
		if(docs.length == 0){
			res.json({
				code: 201,
				msg: '发布失败'
			})
			dataList[username] = [];
			dataListImg[username]=[];
		}else{
			res.json({
				code: 200,
				msg: '发布成功'
			})
			dataList[username] = [];
			dataListImg[username]=[];
		}
	})
}

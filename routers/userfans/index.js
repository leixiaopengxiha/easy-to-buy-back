// 用户的粉丝详情和关注详情
const { Admin } = require('../../db/user')
// 点击关注按钮的接口
exports.Followbtn = (req, res) => {
	const {
		username,
		tousername
	} = req.body
	// username: 点击关注的那个人
	// tousername: 被关注的那个人
	// 关注接口
	Admin.findOne({
		username: tousername
	}).then(doc => {
		if (doc) {
			// 判断受否关注过此人
			let flagfans = doc.fans.includes(username)
			if (!flagfans) {
				Admin.updateOne({
					username: tousername
				}, {
					$set: {
						fans: [...doc.fans, username]
					}
				}).then(docs => {
					if (docs) {
						Admin.findOne({ username: username }).then(undoc => {
							Admin.updateOne({
								username: username
							}, {
								$set: {
									follow: [...undoc.follow, tousername]
								}
							}).then(docss => {
								if (docss) {
									res.json({
										code: "200",
										msg: "关注成功"
									})
								} else {
									res.json({
										code: "501",
										msg: "关注失败"
									})
								}
							})
						})
					} else {
						res.json({
							code: "501",
							msg: "关注失败"
						})
					}
				})

			} else {
				res.json({
					code: "400",
					msg: "你已经关注过了"
				})
			}
		} else {
			res.json({
				code: "400",
				msg: "没有该用户"
			})
		}
	})
}
// 获取粉丝接口
exports.Allfans = (req, res) => {
	const {
		username
	} = req.body
	Admin.findOne({ username }).then(doc => {
		if (doc.fans.length == 0) {
			return res.json({
				code: 204,
				msg: "该用户没有粉丝"
			})
		}
		let data = []
		for (let i = 0; i < doc.fans.length; i++) {
			Admin.find({ username: doc.fans[i] }).then(docss => {
				if (docss.length == 0) {
					res.json({
						code: 204,
						msg: "没有该用户"
					})
				} else {
					let {
						nickname,
						photourl,
						signature,
						fans,
						follow
					} = docss[0]
					let obj = {
						nickname,
						photourl,
						signature,
						fans: fans.length,
						follow: follow.length
					}
					data.push(obj)
					if (i === doc.fans.length - 1) {
						res.json({
							code: 200,
							msg: "成功取到" + doc.fans.length + "条信息",
							data
						})
					}
				}
			})
		}
	})
}
// 获取关注的人接口
exports.Allfollow = (req, res) => {
	const {
		username
	} = req.body
	Admin.findOne({ username }).then(doc => {
		if (doc.follow.length == 0) {
			return res.json({
				code: 204,
				msg: "该用户没有关注的人"
			})
		}
		let data = []
		for (let i = 0; i < doc.follow.length; i++) {
			Admin.find({ username: doc.follow[i] }).then(docss => {
				if (docss.length == 0) {
					res.json({
						code: 204,
						msg: "没有该用户"
					})
				} else {
					let {
						nickname,
						photourl,
						signature,
						fans,
						follow
					} = docss[0]
					let obj = {
						nickname,
						photourl,
						signature,
						fans: fans.length,
						follow: follow.length
					}
					data.push(obj)
					if (i === doc.follow.length - 1) {
						res.json({
							code: 200,
							msg: "成功取到" + doc.follow.length + "条信息",
							data
						})
					}
				}
			})
		}
	})
}
// 编辑资料
exports.Editprofile = (req, res) => {
	const { username, signature, nickname } = req.body
	Admin.updateOne({ username: username }, { $set: { signature, nickname } }).then(doc => {
		if (doc) {
			res.json({
				code: 200,
				msg: "修改成功"
			})
		} else {
			res.json({
				code: 501,
				msg: "修改失败"
			})
		}
	})
}
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
			// let flagfans = doc.fans.includes(username)
			// 判断受否关注过此人
			function findElem(arrayToSearch, attr, val) {
				for (var i = 0; i < arrayToSearch.length; i++) {
					if (arrayToSearch[i][attr] == val) {
						return i;
					}
				}
				return -1;
			}
			// console.log(findElem(doc.fans, 'username', username))
			if (findElem(doc.fans, 'username', username) == -1) {
				Admin.findOne({ username: tousername }).then(tundoc => {
					if (tundoc) {
						let data = {
							nickname: tundoc.nickname,
							fans: tundoc.fans.length,
							photourl: tundoc.photourl,
							signature: tundoc.signature,
							username: tundoc.username
						}
						Admin.updateOne({
							username: username
						}, {
							$set: {
								follow: [...doc.follow, data]
							}
						}).then(docs => {
							if (docs) {
								Admin.findOne({ username: username }).then(undoc => {
									let data = {
										nickname: undoc.nickname,
										fans: undoc.fans.length,
										photourl: undoc.photourl,
										signature: undoc.signature,
										username: undoc.username
									}
									Admin.updateOne({
										username: tousername
									}, {
										$set: {
											fans: [...doc.fans, data]
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
// 获取关注的人和粉丝接口
exports.Allfollow = (req, res) => {
	const {
		username
	} = req.body
	Admin.findOne({ username }).then(doc => {
		if (doc) {
			res.json({
				code: '200',
				mag: '成功',
				data: {
					fans: doc.fans,
					follow: doc.follow,
					username: doc.username
				}
			})
		} else {
			res.json({
				code: '500',
				mag: '服务器错误'
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
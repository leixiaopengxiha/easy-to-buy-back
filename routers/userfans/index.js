// 用户的粉丝详情和关注详情
const {
	Userfans, Admin
} = require('../../db/user')
// 点击关注按钮的接口
exports.Followbtn = (req, res) => {
	const {
		username,
		tousername
	} = req.body
	// username: 点击关注的那个人
	// tousername: 被关注的那个人
	// 关注接口
	Userfans.findOne({
		username: tousername
	}).then(doc => {
		if (doc) {
			let flagfans = doc.fans.includes(username)
			// let flagfollow = doc.follow.includes(tousername)
			if (!flagfans) {
				Admin.findOne({ username: tousername }).then(tundoc => {
					if (tundoc) {
						let data = {};
						data.fans = tundoc.fans;
						data.nickname = tundoc.nickname;
						data.photourl = tundoc.photourl;
						data.signature = tundoc.signature;
						data.username = tundoc.username;
						Userfans.updateOne({
							username: username
						}, {
							$set: {
								follow: [...doc.follow, data]
							}
						}).then(docs => {
							if (docs) {
								Admin.findOne({ username: username }).then(undoc => {
									let todata = {};
									todata.fans = undoc.fans;
									todata.nickname = undoc.nickname;
									todata.photourl = undoc.photourl;
									todata.signature = undoc.signature;
									todata.username = undoc.username;
									Userfans.updateOne({
										username: tousername
									}, {
										$set: {
											fans: [...doc.fans, todata]
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
		}else{
			res.json({
				code: "400",
				msg: "没有该用户"
			})
		}
	})
	// 关注的人
}
// 获取关注的人和粉丝接口
exports.Allfollow = (req, res) => {
	const {
		username
	} = req.body
	Userfans.findOne({
		username: username
	}).then(doc => {
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
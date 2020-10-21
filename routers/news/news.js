const { News,NewsHisdata,HisTiezidata,HisDongtaidata } = require('../../db/news.js');
exports.getnewsdata = (req,res)=>{
 News.find().then(doc=>{
  // console.log(doc)
  res.json(doc)
 })
}
exports.newshismydata = (req,res)=>{
 NewsHisdata.find().then(doc=>{
  // console.log(doc)
  res.json(doc)
 })
}
exports.newstiezidata = (req,res)=>{
 HisTiezidata.find().then(doc=>{
  // console.log(doc)
  res.json(doc)
 })
}
exports.newsdongtaidata = (req,res)=>{
 HisDongtaidata.find().then(doc=>{
  // console.log(doc)
  res.json(doc)
 })
}
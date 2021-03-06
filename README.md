# 服务器接口地址 http://132.232.89.22:8848/

### 1. 登录

- 接口名称: login
- Url: http://132.232.89.22:8848/login
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
    "password": 用户密码
}
```

```
输出参数:
data: 存放 token 信息
code: 存放状态码
message: 说明信息
输出状态码:
200: 登录成功
201: 密码不正确
202: 用户名或密码不能为空
203: 该用户未注册
```

### 2. 注册

- 接口名称: register
- Url: http://132.232.89.22:8848/register
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
    "password": 用户密码
}
```

```
输出参数:
code: 存放状态码
message: 说明信息
输出状态码:
200: 注册成功
201: 用户名或密码不能为空
202: 手机号格式不正确
204: 该用户已存在
```

### 3. 获取用户信息

- 接口名称: getadmin
- Url: http://132.232.89.22:8848/getadmin
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "token": 登录时返回的token
}
```

```
输出参数:
code: 状态码,
nickname: 用户昵称,
photourl: 头像地址,
username: 用户账号,
signature: 个性签名,
fans: 粉丝数,
follow: 关注数,
thumbs: 点赞数,
id: 数据库中此条数据的 id,
token: jwt 生成的 token，
message: 说明信息
输出状态码:
200: 获取成功
201: 登录时间已过期，请重新登录!
202: 用户信息获取失败
```

### 4. 获取关注的人接口

- 接口名称: allfollow
- Url: http://132.232.89.22:8848/allfollow
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号
}
```

```
输出参数:
code: 状态码,
mag: 说明,
data: 数据
输出状态码:
200: 获取成功
500: 获取失败
```

### 5. 获取关注的人接口

- 接口名称: allfans
- Url: http://132.232.89.22:8848/allfans
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号
}
```

```
输出参数:
code: 状态码,
mag: 说明,
data: 数据
输出状态码:
200: 获取成功
500: 获取失败
```

### 6. 点击关注按钮的接口

- 接口名称: followbtn
- Url: http://132.232.89.22:8848/followbtn
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
    "tousername": 被关注者的账号
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 关注成功
501: 服务器错误
400: 已经关注过了
```

### 7. 编辑个人资料接口

- 接口名称: editprofile
- Url: http://132.232.89.22:8848/editprofile
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
    "signature": 个性签名,
    "nickname": 用户昵称
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 修改成功,
501: 修改失败
```

### 8. 上传图片

（发布闲置最多上传 3 张，发布话题最多上传 1 张）

- 接口名称: uploadphoto
- Url: http://132.232.89.22:8848/uploadphoto
- 请求协议: http
- 请求方式: post

```js
{
    "username": 用户账号
}
```

### 9. 清空照片数组

- 接口名称: cleararray
- Url: http://132.232.89.22:8848/cleararray
- 请求协议: http
- 请求方式: post

```js
{
    "username": 用户账号
}
```

### 10. 发布闲置

- 接口名称: releaseaside
- Url: http://132.232.89.22:8848/releaseaside
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "label": 标签,
    "username": 用户账号,
    "inputVal": 价格,
    "typeInputVal": 标题,
    "explainInputVal": 标签类型（说明）
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 提交成功,
201: 提交失败
```

### 11. 发布话题

- 接口名称: releasetopic
- Url: http://132.232.89.22:8848/releasetopic
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "explain": 简介（说明）,
    "username": 用户账号
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 发布成功,
201: 发布失败
```

### 12. 广场 - 获取所有淘货

- 接口名称: squaregetpanning
- Url: http://132.232.89.22:8848/squaregetpanning
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "label": 标签（推荐、最新不传label）,
    "page": 页数（必传，从零开始，每页10条，page+1，数据加10条）
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
201: 没有取到任何信息,
204: 没有该用户,
200: 成功取到信息
```

### 13. 广场 - 更新点赞次数

- 接口名称: squarethumbscount
- Url: http://132.232.89.22:8848/squarethumbscount
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "id": 自动生成的_id,
    "username": 用户账号
    "thumbs_flag": 0或1（0：取消点赞 1：点赞）
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 点赞成功 / 取消成功
202: 点赞失败 / 取消失败
201: 您已经点过赞了 / 您已经取消过了
203: 没有该数据
```

### 14. 首页轮播接口

- 接口名称: swiper
- Url: http://132.232.89.22:8848/swiper
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
}
```

```
输出参数
code: 状态码,
data: 内容
输出状态
200: 请求成功
202: 请求失败
400: 已经关注过了
```

### 15. 首页搜索接口

- 接口名称: search
- Url: http://132.232.89.22:8848/search
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
    {
      "content" : 字符串搜索的内容
    }
```

```
输出参数
code: 状态码,
data: 内容
输出状态
200: 请求成功
501: 服务器错误
```

### 16. 广场 - 淘货详情

- 接口名称: squarepanningdetails
- Url: http://132.232.89.22:8848/squarepanningdetails
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "id": 数据库自动生成的id
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 成功获取详情
201: 没有取到任何信息
204: 没有该用户
```

### 17. 添加历史记录

- 接口名称: addhistorical
- Url: http://132.232.89.22:8848/addhistorical
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
    "content": 搜索的内容
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 获取成功
```

### 18. 获取历史记录

- 接口名称: obhistorical
- Url: http://132.232.89.22:8848/obhistorical
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 获取成功
```

### 19. 清空历史记录

- 接口名称: rehistorical
- Url: http://132.232.89.22:8848/rehistorical
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号,
}
```

```
输出参数
    code: 状态码,
    data: 说明
输出状态
    200: 获取成功
```

### 20. 广场 - 获取话题

- 接口名称: squaregettopic
- Url: http://132.232.89.22:8848/squaregettopic
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "flag": 标签（推荐、最新不传label，最热需要传 "flag": "最新"）,
    "page": 页数（从零开始，每页3条）
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
201: 没有取到任何信息,
204: 没有该用户,
200: 成功取到信息
```

### 21. 广场 - 话题详情

- 接口名称: squaretopicdetails
- Url: http://132.232.89.22:8848/squaretopicdetails
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "id": 数据库自动生成的id
}
```

```
输出参数
code: 状态码,
msg: 说明
输出状态
200: 成功获取详情
201: 没有取到任何信息
204: 没有该用户
```

### 22. 获取我卖的和我买的全部订单

- 接口名称: getallbuy
- Url: http://132.232.89.22:8848/getallbuy
- 请求协议: http
- 请求方式: post
- 请求参数: json 格式

```js
{
    "username": 用户账号，
    "transaction": number类型 1为我买的 2为我卖的

    "business": 交易状态(除我卖的和我买的里全部外,都要带上.1为已签收界面,2为订单评价,3为申请售后)
}
```

```
输出参数
    code: 状态码,
    data: 数据
    imgurl: 图片路径
    _id: 商品id
    nickname: 商家名字
    explain: 商品简介
    username: 当前用户的账号
    business: 交易状态
    transaction: 1买的/2卖的
    money: 商品价格
输出状态
    200: 获取成功
```

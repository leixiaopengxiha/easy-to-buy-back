# 服务器接口地址  http://132.232.89.22:8848/
### 1. 登录
* 接口名称: login
* Url: http://132.232.89.22:8848/login
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
{
    "username": 用户账号,
    "password": 用户密码
}
```
输出参数: 
    data: 存放token信息
    code: 存放状态码
    message: 说明信息
输出状态码: 
    200: 登录成功
    201: 密码不正确
    202: 用户名或密码不能为空
    203: 该用户未注册
### 2. 注册
* 接口名称: register
* Url: http://132.232.89.22:8848/register
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
{
    "username": 用户账号,
    "password": 用户密码
}
```
输出参数: 
    code: 存放状态码
    message: 说明信息
输出状态码: 
    200: 注册成功
    201: 用户名或密码不能为空
    202: 手机号格式不正确
    204: 该用户已存在
### 3. 获取用户信息
* 接口名称: getadmin
* Url: http://132.232.89.22:8848/getadmin
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
{
    "token": 登录时返回的token
}
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
    id: 数据库中此条数据的id,
    token: jwt生成的token，
    message: 说明信息
输出状态码:
    200: 获取成功
    201: 登录时间已过期，请重新登录!
    202: 用户信息获取失败
### 4. 获取粉丝和关注接口
* 接口名称: allfollow
* Url: http://132.232.89.22:8848/allfollow
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
{
    "username": 用户账号
}
```
输出参数:
    code: 状态码,
    mag: 说明,
    fans: 粉丝的 username,
    follow: 关注者的 username,
    username: 当前用户的 usernmae
输出状态码:
    200: 获取成功
    500: 获取失败
### 5. 点击关注按钮的接口
* 接口名称: followbtn
* Url: http://132.232.89.22:8848/followbtn
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
{
    "username": 用户账号,
    "tousername": 被关注者的账号
}
```
输出参数
    code: 状态码,
    msg: 说明
输出状态
    200: 关注成功
    501: 服务器错误
    400: 已经关注过了
### 6. 编辑个人资料接口
* 接口名称: editprofile
* Url: http://132.232.89.22:8848/editprofile
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
{
    "username": 用户账号,
    "signature": 个性签名,
    "nickname": 用户昵称
}
```
输出参数
    code: 状态码,
    msg: 说明
输出状态
    200: 修改成功,
    501: 修改失败

### 7. 首页轮播接口
* 接口名称: swiper
* Url: http://132.232.89.22:8848/swiper
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
    {}
```
输出参数
    code: 状态码,
    data: 内容
输出状态
    200: 请求成功
    202: 请求失败
    400: 已经关注过了
### 8. 首页搜索接口


* 接口名称: search
* Url: http://132.232.89.22:8848/search
* 请求协议: http
* 请求方式: post
* 请求参数: json格式
```js
    {
      "content" : 字符串搜索的内容 
    }
```

输出参数
    code: 状态码,
    data: 内容
输出状态
    200: 请求成功
    501: 服务器错误
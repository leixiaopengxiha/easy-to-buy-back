# 服务器接口地址  http://132.232.89.22:8848/
### 1. 登录
    * 接口名称: login
    * Url: http://132.232.89.22:8080/login
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
    * Url: http://132.232.89.22:8080/register
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
    * Url: http://132.232.89.22:8080/getadmin
    * 请求协议: http
    * 请求方式: post
    * 请求参数: json格式
```js
    {
        "username": 用户账号,
        "token": 登录时返回的token
    }
```
    输出参数: 
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
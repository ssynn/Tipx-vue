# API总览

## 注意事项
- API根目录 /api
- 用户目录 /user
- 任务委托目录 /tasks
- 校园攻略目录 /tips
- 社团活动目录 /acts
- 校园公告目录 /notice
- 企业信息目录 /works
* 注1：用户API下的login为 /api/user/login 其他API以此类推
* 注2：除login不需要token，其他所有api均需要token

## 参数传递方式
- 传统GET传参 eg. GET /api/tasks?pn (参数 pn＝0)-> /api/tasks?pn=0 
- 占位符传参 eg. GET /api/user/:id/info (参数 id=shinian9712)-> /api/user/shinian9712/info 
- POST JSON传参 eg. POST /api/user/login (参数 JSON数据)
- 返回格式 eg. POST /login
```
HTTP 1.1/ 200 OK
Content-Type: application/json
{
    "status":"success",
    "data":
    {
        "error":0,
        "msg":"Token Generated!",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxleCIsImlhdCI6MTU0ODc0NTM3MiwiZXhwIjoxNTQ4NzQ1NDMyfQ.aC7MdUlYe7NgVZk9O-E6LBOU1C9bI6PK-KEDyurgvMs" 
    }       
}
```

## HTTP状态码
### 2XX 操作成功
- 200 OK 成功
- 201 Created 已创建
- 202 Accepted 接受但未更改，即将更改。

### 3XX 重定向
- 301 永久重定向
- 302 暂时重定向

### 4XX 客户端错误
- 400 错误请求(参数错误)
- 401 未验证(token无效)
- 403 无权限(无权访问)
- 404 资源不存在
- 405 无权使用对应HTTP操作(token有效，但是无对应HTTP操作权限)
- 429 访问请求超过服务器限额

### 5XX 服务器端错误
- 500 服务器内部错误
- 503 服务器维护


## 错误码
### 0XX 服务器错误码
- 000 成功
- 001 数据库错误
- 002 文件读取错误


### 1XX User错误码
- 101 无此用户id
- 102 密码错误
- 103 用户id格式错误
- 104 密码格式错误
- 105 用户信息格式错误
- 106 用户信息未完善
- 107 无权操作
- 108 此id已存在
- 109 无效token
- 110 参数错误

### 2XX Task错误码
- 201 任务格式错误
- 202 任务已被其他人接受
- 203 任务已被锁定（任务状态码检测异常）
- 204 任务已被取消
- 205 任务已被接受，无法删除
- 206 无效操作
- 207 无此任务
- 208 不能为本人接受任务

## 任务状态码
- 0 已发布，未接受
- 1 已接受
- 2 申请完成
- 3 申请修改
- 4 申请放弃
- 5 已完成
- 6 已失效


## 用户API
|名称|HTTP动词|URL|参数|返回|功能|
|---|--------|---|---|---|----|
|注册|POST|/register|reginfo:注册信息|res:返回信息|注册|
|登录|POST|/login|logininfo:登录信息|token:token|登录并获取token|
|修改密码|POST|/:id/psw|chpswinfo:修改密码信息|res:返回信息|修改密码|
|详细信息|GET|/:id/info|无|userinfo:用户信息|查询用户信息|
|修改信息|POST|/:id/info|chuserinfo:用户信息|userinfo:新用户信息|修改用户信息|

### 参数说明
```json
// URL占位符
{
    "id":"String" //用户id
}

// POST JSON
{
    "reginfo":
    {
        "id":"String", //用户id
        "psw":"String", //密码
        "name":"String", //用户昵称
        "intro":"String" //用户简介
    },

    "logininfo":
    {
        "id":"String", //用户id
        "psw":"String" //密码
    },

    "chpswinfo":
    {
        "id":"String", //用户id
        "oldpsw":"String", //旧密码
        "newpsw":"String" //新密码
    },

    "chuserinfo":
    {
        "id":"String", //用户id
        "name":"String", //用户昵称
        "intro":"String", //用户简介
    }
}

//服务器返回JSON
{
    "token":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "token":"String" //token
        }       
    },

    "res":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String" //信息
        }   
    },

    "userinfo":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "user":
            {
                "id":"String", //用户id
                "name":"String", //用户昵称
                "intro":"String", //用户简介
                "credit":"Number" //用户信誉
            }
        }
    }
}

```

## 任务委托Task API
|名称|HTTP动词|URL|参数|返回|功能|
|---|--------|---|---|---|----|
|告示板|GET|/notice|无|note:告示|查询告示板内容|
|所有任务|GET|/f|pn:页码|tasklist|查看所有任务|
|发布任务|POST|/f|task:任务内容|taskid:地址|发布任务|
|查看任务|GET|/:taskid|无|task:任务内容|查看详细信息|
|接受任务|POST|/:taskid/accept|无|res:结果|接受任务|
|申请完成|POST|/:taskid/complete/req|无|res:结果|申请完成任务|
|确认完成|POST|/:taskid/complete/cfm|无|res:结果|确认完成任务|
|提出修改|POST|/:taskid/edit/req|task:任务内容|res:结果|申请提出修改|
|确认修改|POST|/:taskid/edit/cfm|无|res:结果|确认任务修改|
|申请放弃|POST|/:taskid/abd/req|无|res:结果|申请放弃任务|
|确认放弃|POST|/:taskid/abd/cfm|无|res:结果|确认放弃任务|
|删除任务|DELETE|/:taskid|无|res:结果|删除任务|
|查看更新|GET|/:taskid/update|无|updatedtask:更新任务|查看任务更新|
|*查看证据|GET|/:taskid/e|无|evidencelist:证据列表|查看当前任务证据|


### 参数说明
```json
// GET参数
{
    "pn":"Number" // 任务列表页码
}


// URL占位符
{
    "taskid":"String" //任务id
}


// POST JSON
// 内容请使用markdown
{

    "task":
    {
        "type":"Number", //任务类型
        "title":"String", //任务标题
        "content":"String", // markdown内容
    },
}


// 服务器返回JSON
{
    "note":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "note":"String" // markdown内容
        }   
    },
    
    "res":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String" //信息
        }   
    },

    "taskid":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "taskid":"String" //任务id
        }   
    },

    "task":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "task":
            {
                "type":"Number", //任务类型
                "status":"String", // 状态
                "title":"String", //任务标题
                "postername":"String", //发布人昵称
                "posterid":"String",//发布人ID
                "time":"Time", //发布时间
                "content":"String", // markdown内容
                "doername":"String",//任务执行人昵称
                "doerid":"String" // 任务执行人ID
            }
        }   
    },

    "updatedtask":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "task":
            {
                "type":"Number", //任务类型
                "title":"String", //任务标题
                "postername":"String", //发布人昵称
                "posterid":"String",//发布人ID
                "edittime":"Time", //发布时间
                "content":"String", // markdown内容
            }
        }   
    },

    "tasklist":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "tasks":
            [
                {"id":"Number","type":"Number", "title":"String", "intro":"String"} // id:任务id title:任务名称 intro:任务简介，50字
            ]
        }   
    }
}

```

## 攻略Tips API
|名称|HTTP动词|URL|参数|返回|功能|
|---|--------|---|---|---|----|
|告示板|GET|/notice|无|note:告示|查询告示板内容|
|查看手册|GET|/book|无|content:目录|查询手册目录|
|查看对应章节|GET|/book/s|id:手册id|section:章节|查看对应文章|
|查看所有攻略|GET|/tips|pn:页码|tiplist:攻略列表|查看攻略|
|发布攻略|POST|/tips|tip:攻略|res:结果|发布攻略|
|查看攻略|GET|/p/:id|无|tip:攻略|查看攻略|
|修改攻略|POST|/p/:id|tip:攻略|res:结果|修改攻略|
|删除攻略|DELETE|/p/:id|无|res:结果|删除攻略|
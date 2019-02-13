# API总览

## 注意事项
- API根目录 /api
- 用户目录 /user
- 任务委托目录 /tasks
- 校园攻略目录 /tips
- 社团活动目录 /acts
- 校园公告目录 /notice
- 企业信息目录 /works
- 系统目录 /sys
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
- 003 文件写入错误


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

### 3XX Tip错误码
- 301 无此Tip
- 302 不是本人

### 5XX Work错误码
- 501 无此Work
- 502 不是本人

### 6XX Sys错误码
- 601 文件类型错误

## 任务状态码
- 0 已发布，未接受
- 1 已接受
- 2 申请完成
- 3 申请修改
- 4 申请放弃
- 5 已完成
- 6 已失效

## Work类型码
- 0 兼职
- 1 外包


## 用户API
|名称|HTTP动词|URL|参数|返回|功能|状态|
|---|--------|---|---|---|----|----|
|注册|POST|/register|reginfo:注册信息|res:返回信息|注册|OK|
|登录|POST|/login|logininfo:登录信息|token:token|登录并获取token|OK|
|修改密码+|POST|/u/:id/psw|chpswinfo:修改密码信息|res:返回信息|修改密码|OK|
|详细信息+|GET|/u/:id/info|无|userinfo:用户信息|查询用户信息|OK|
|查看已发布任务+|GET|/u/:id/ptask|无|tasklist:任务列表|查看已发布任务|OK|
|查看已接受任务+|GET|/task/accepted|无|tasklist:任务列表|查看已接受任务|OK|
|查看已发布的Tip|GET|/tip|无|tiplist:Tip列表|查看已发布的Tip|OK|
|查看已发布的Work|GET|/work|无|tiplist:Work列表|查看已发布的Work|OK|
|修改信息+|POST|/u/:id/info|chuserinfo:用户信息|userinfo:新用户信息|修改用户信息|OK|

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
        "name":"String", //用户昵称
        "intro":"String" //用户简介
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
                {"id":"String","type":"Number", "title":"String", "intro":"String"} // id:任务id title:任务名称 intro:任务简介，50字
            ]
        }   
    },

    "tiplist":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "tips":
            [
                {"id":"String", "title":"String", "intro":"String"} // id:tip id title:标题 intro:简介，50字
            ]
        }  
    },

    "worklist":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "works":
            [
                {"id":"String","type":"Number" ,"title":"String", "intro":"String"} // id:work id title:标题 intro:简介，50字
            ]
        }  
    },
}

```

## 任务委托Task API
|名称|HTTP动词|URL|参数|返回|功能|状态|
|---|--------|---|---|---|----|---|
|告示板|GET|/notice|无|note:告示|查询告示板内容|OK|
|所有任务|GET|/f|pn:页码|tasklist|查看所有任务|OK|
|发布任务|POST|/f|task:任务内容|taskid:地址|发布任务|OK|
|查看任务+|GET|/p/:taskid|无|task:任务内容|查看详细信息|OK|
|接受任务+|POST|/p/:taskid/accept|无|res:结果|接受任务|OK|
|申请完成+|POST|/p/:taskid/complete/req|无|res:结果|申请完成任务|OK|
|确认完成+|POST|/p/:taskid/complete/cfm|无|res:结果|确认完成任务|OK|
|提出修改+|POST|/p/:taskid/edit/req|task:任务内容|res:结果|申请提出修改|OK|
|确认修改+|POST|/p/:taskid/edit/cfm|无|res:结果|确认任务修改|OK|
|申请放弃+|POST|/p/:taskid/abd/req|无|res:结果|申请放弃任务|OK|
|确认放弃+|POST|/p/:taskid/abd/cfm|无|res:结果|确认放弃任务|OK|
|删除任务+|DELETE|/p/taskid|无|res:结果|删除任务|OK|
|查看更新+|GET|/p/:taskid/update|无|updatedtask:更新任务|查看任务更新|OK|
|*查看证据|GET|/:taskid/e|无|evidencelist:证据列表|查看当前任务证据|未完成|


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
                {"id":"String","type":"Number", "title":"String", "intro":"String"} // id:任务id title:任务名称 intro:任务简介，50字
            ]
        }   
    }
}

```

## 攻略Tips API
|名称|HTTP动词|URL|参数|返回|功能|状态|
|---|--------|---|---|---|----|---|
|告示板|GET|/notice|无|note:告示|查询告示板内容|OK|
|查看所有攻略|GET|/f|pn:页码|tiplist:攻略列表|查看攻略|OK|
|发布攻略|POST|/f|tip:攻略|res:结果|发布攻略|OK|
|查看攻略|GET|/p/:id|无|tip:攻略|查看攻略|OK|
|修改攻略|POST|/p/:id/edit|tip:攻略|res:结果|修改攻略|OK|
|删除攻略|DELETE|/p/:id|无|res:结果|删除攻略|OK|
|*查看手册|GET|/book|无|content:目录|查询手册目录|未完成|
|*查看对应章节|GET|/book/s|id:手册id|section:章节|查看对应文章|未完成|

### 参数说明
```json
// GET参数
{
    "pn":"Number" // 页码
}

// URL占位符
{
    "id":"String" // 攻略id
}
// POST JSON
{
    "tip":
    {
        "title":"String", // 标题
        "content":"String" // 内容
    }
}


// 服务器返回JSON
{
    "res":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String" //信息
        }   
    },

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

    "tip":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "tip":
            {
                "title":"String", // 标题  
                "poster":"String", // 发布者ID
                "content":"String", // 内容
                "time":"String" //时间  
            }
        }   
    },

    "tiplist":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "tips":
            [
                {"id":"String", "title":"String", "intro":"String"} // id:tip id title:标题 intro:简介，50字
            ]
        }  
    }
}
```

## 活动Acts API (未完成) 
|名称|HTTP动词|URL|参数|返回|功能|状态|
|---|--------|---|---|---|----|---|
|*查看活动|GET|/a/f|pn:页码|actlist:活动列表|返回十项活动|未完成|
|*发布活动|POST|/a/f|act:活动|res:结果|发布活动|未完成|
|*查看活动|GET|/a/p/:actid|无|act:活动|查看活动|未完成|
|*修改活动|POST|/a/p/:actid/edit|act:活动|res:结果|修改活动|未完成|
|*删除活动|DELETE|/a/p/:actid|无|res:结果|删除活动|未完成|
|*查看社团列表|GET|/club/f|pn:页码|clublist:社团列表|查看社团列表|未完成|
|*查看社团|GET|/club/p/:clubid|无|club|查看社团|未完成|
|*搜索社团|GET|/club/search|clubname:社团名称|搜索社团|未完成|

### 参数说明
``` json
// GET参数
{
    "pn":"Number" // 页码
}

// URL占位符
{
    "actid":"String", //活动id
}

// POST参数
{
    "act":
    {
        "title":"String", // 标题
        "content":"String", //内容
        "time":"Date", //时间
        "place":"String", //地点
        "number":"Number" //人数
    }
}

// 服务器返回JSON
{
    "res":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String" // 信息
        }
    },

    "actlist":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", //错误码
            "msg":"String", //信息
            "acts":
            [
                {"id":"String","title":"String","intro":"String","empty":"Number"} // id:act id,title:标题 intro:简介，50字, empty:还需多少人
            ]
        }
    }
}

```

## 工作 Works API
|名称|HTTP动词|URL|参数|返回|功能|状态|
|---|--------|---|---|---|----|---|
|企业信息告示板|/notice|无|显示企业信息告示|未测试|
|查看兼职信息列表|GET|/f/w|pn:页码|worklist:信息列表|返回十项信息|未测试|
|查看外包信息列表|GET|/f/o|pn:页码|outlist:信息列表|返回十项信息|未测试|
|发布工作信息|POST|/f|work:兼职信息|res:结果|发布信息|未测试|
|查看工作信息|GET|/p/:workid|无|work:工作信息|查看信息|未测试|
|修改工作信息|POST|/p/:workid/edit|work:工作信息|res:结果|修改信息|未测试|
|删除工作信息|DELETE|/p/:workid|无|res:结果|删除信息|未测试|

### 参数说明
``` json
// GET 参数
{
    "pn":"Number" // 页码
}

// POST JSON
{
    "work":
    {
        "title":"String", //标题
        "type":"Number", // 0为兼职，1为外包
        "content":"String", //内容，可为JSON
    },
}

// 服务器返回 JSON
{
    "res":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String" // 信息
        }
    },
    "worklist":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "works":
            [
                {"id":"String", "title":"String", "intro":"String"} // id:work id title:标题 intro:简介，50字
            ]
        }  
    },

    "work":
    {
        "status":"String", // failure/success
        "data":
        {
            "error":"Number", // 错误码
            "msg":"String", //信息
            "work":
            {
                "title":"String", // 标题  
                "poster":"String", // 发布者ID
                "content":"String", // 内容
                "time":"String" //时间  
            }
        }   
    },
}


```

## 系统 API
|名称|HTTP动词|URL|参数|返回|功能|状态|
|---|--------|---|---|---|----|---|
|上传图片|POST|/upload/img|imgFile:文件|imgaddr:地址|返回图片地址|OK|

### 参数说明
``` json
// POST 表单，Content-Type: multipart/form-data
{
    "imgFile":"File" //上传的文件
}


// 服务器返回JSON
{
    "imgaddr":
    {
        "status":"String", // success/failure
        "data":
        {
            "error":0,
            "msg":"上传成功",
            "imgaddr":"String" // 图片地址
        }
    }
}
```
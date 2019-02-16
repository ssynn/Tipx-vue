# 任务
* |告示板|GET|/notice|无|note:告示|查询告示板内容|
  * ~~|告示板|GET|/notice|无|note:告示|查询告示板内容|OK|~~
  * ~~|所有任务|GET|/f|pn:页码|tasklist|查看所有任务|OK|~~
  * ~~|发布任务|POST|/f|task:任务内容|taskid:地址|发布任务|OK|~~
  * ~~|查看任务+|GET|/p/:taskid|无|task:任务内容|查看详细信息|OK|~~
  * ~~|接受任务+|POST|/p/:taskid/accept|无|res:结果|接受任务|OK|~~
  * ~~|申请完成+|POST|/p/:taskid/complete/req|无|res:结果|申请完成任务|OK|~~
  * ~~|确认完成+|POST|/p/:taskid/complete/cfm|无|res:结果|确认完成任务|OK|~~
  * ~~|提出修改+|POST|/p/:taskid/edit/req|task:任务内容|res:结果|申请提出修改|OK|~~
  * ~~|确认修改+|POST|/p/:taskid/edit/cfm|无|res:结果|确认任务修改|OK|~~
  * ~~|申请放弃+|POST|/p/:taskid/abd/req|无|res:结果|申请放弃任务|OK|~~
  * ~~|确认放弃+|POST|/p/:taskid/abd/cfm|无|res:结果|确认放弃任务|OK|~~
  * ~~|删除任务+|DELETE|/p/taskid|无|res:结果|删除任务|OK|~~
  * |查看更新+|GET|/p/:taskid/update|无|updatedtask:更新任务|查看任务更新|OK|
  * |*查看证据|GET|/:taskid/e|无|evidencelist:证据列表|查看当前任务证据|未完成|

# 用户
* |名称|HTTP动词|URL|参数|返回|功能|状态|
  * ~~|注册|POST|/register|reginfo:注册信息|res:返回信息|注册|OK|~~
  * ~~|登录|POST|/login|logininfo:登录信息|token:token|登录并获取token|OK|~~
  * ~~|修改密码+|POST|/u/:id/psw|chpswinfo:修改密码信息|res:返回信息|修改密码|OK|~~
  * ~~|详细信息+|GET|/u/:id/info|无|userinfo:用户信息|查询用户信息|OK|~~
  * ~~|查看已发布任务+|GET|/u/:id/ptask|无|tasklist:任务列表|查看已发布任务|OK|~~
  * ~~|查看已接受任务+|GET|/task/accepted|无|tasklist:任务列表|查看已接受任务|OK|~~
  * |查看已发布的Tip|GET|/tip|无|tiplist:Tip列表|查看已发布的Tip|OK|
  * |查看已发布的Work|GET|/work|无|tiplist:Work列表|查看已发布的Work|OK|
  * ~~|修改信息+|POST|/u/:id/info|chuserinfo:用户信息|userinfo:新用户信息|修改用户信息|OK|~~
  
# 攻略Tips API api/tips
* |名称|HTTP动词|URL|参数|返回|功能|状态|
  * |告示板|GET|/notice|无|note:告示|查询告示板内容|OK|
  * ~~|查看所有攻略|GET|/f|pn:页码|tiplist:攻略列表|查看攻略|OK|~~
  * ~~|发布攻略|POST|/f|tip:攻略|res:结果|发布攻略|OK|~~
  * ~~|查看攻略|GET|/p/:id|无|tip:攻略|查看攻略|OK|~~
  * ~~|修改攻略|POST|/p/:id/edit|tip:攻略|res:结果|修改攻略|OK|~~
  * ~~|删除攻略|DELETE|/p/:id|无|res:结果|删除攻略|OK|~~
  * |*查看手册|GET|/book|无|content:目录|查询手册目录|未完成|
  * |*查看对应章节|GET|/book/s|id:手册id|section:章节|查看对应文章|未完成|

# 工作 Works API
* |名称|HTTP动词|URL|参数|返回|功能|状态|
  * |企业信息告示板|/notice|无|显示企业信息告示|未测试|
  * |查看兼职信息列表|GET|/f/w|pn:页码|worklist:信息列表|返回十项信息|未测试|
  * |查看外包信息列表|GET|/f/o|pn:页码|outlist:信息列表|返回十项信息|未测试|
  * |发布工作信息|POST|/f|work:兼职信息|res:结果|发布信息|未测试|
  * |查看工作信息|GET|/p/:workid|无|work:工作信息|查看信息|未测试|
  * |修改工作信息|POST|/p/:workid/edit|work:工作信息|res:结果|修改信息|未测试|
  * |删除工作信息|DELETE|/p/:workid|无|res:结果|删除信息|未测试|
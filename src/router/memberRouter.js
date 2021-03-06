// 这个文件构把所有的组件引入

import Vue from 'vue'
import VueRouter from 'vue-router'
import memberHome from '@/components/memberHome'                            // 界面框架组件       
import activityIndex from '@/components/member/activities/activityIndex'    // 任务委托组件
import activityDetail from '@/components/member/activities/activityDetail'  // 任务详情页组件
import groupCourses from '@/components/member/groupCourses/groupCourses'    // 校园攻略组件
import personalCourses from '@/components/member/personalCourses/personalCourses'           // 校园活动组件
import personalCourseDetail from '@/components/member/personalCourses/personalCourseDetail' // 预约任务组件
import temp from '@/components/member/temp/temp'

// 个人信息
import mine from '@/components/member/mine/mine'
import editUserInfo from '@/components/member/mine/editUserInfo'
import newPassword from '@/components/member/mine/newPassword'

// 登录
import login from '@/components/member/login/login'

// 任务
import tasks from '@/components/member/tasks/tasks'
import newTask from '@/components/member/tasks/newTask'
import tasksDetail from '@/components/member/tasks/tasksDetail'
import postedTasks from '@/components/member/tasks/postedTasks'
import receivedTasks from '@/components/member/tasks/received'
import editTask from '@/components/member/tasks/editTask'

// 攻略
import tips from '@/components/member/tips/tips'
import newTip from '@/components/member/tips/newTip'
import tipDetail from '@/components/member/tips/tipDetail'
import editTip from '@/components/member/tips/editTip'
import postedTips from '@/components/member/tips/postedTips'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  //路由映射map
  routes: [
    {
      path: '/',
      redirect: '/memberHome/mine'
    },
    {
      path: '*',
      redirect: '/memberHome/mine'
    },
    {
      path: '/memberHome',
      name: 'memberHome',
      component: memberHome,
      children: [
        {
          path: '/memberHome/activityIndex',
          name: 'activityIndex',
          component: activityIndex
        },
        {
          path: '/memberHome/activityDetail/:activityId',
          name: 'activityDetail',
          component: activityDetail
        },
        {
          path: '/memberHome/groupCourses',
          name: 'groupCourses',
          component: groupCourses
        },
        {
          path: '/memberHome/personalCourses',
          name: 'personalCourses',
          component: personalCourses
        },
        {
          path: '/memberHome/personalCourseDetail/:courseId/:date',
          name: 'personalCourseDetail',
          component: personalCourseDetail
        },
        // 个人信息界面
        {
          path: '/memberHome/mine',
          name: 'mine',
          component: mine
        },
        {
          path: 'memberHome/editUserInfo',
          name: 'editUserInfo',
          component: editUserInfo
        },
        {
          path: 'memberHome/newPassword',
          name: 'newPassword',
          component: newPassword
        },
        // 测试界面
        {
          path: '/memberHome/temp',
          name: 'temp',
          component: temp
        },
        // 登录
        {
          path: '/memberHome/login',
          name: 'login',
          component: login
        },
        // tasks
        {
          path: '/memberHome/tasks',
          name: 'tasks',
          component: tasks
        },
        {
          path: '/memberHome/tasksDetail/:taskID',
          name: 'tasksDetail',
          component: tasksDetail
        },
        {
          path: '/memberHome/newTask',
          name: 'newTask',
          component: newTask
        },
        {
          path: 'memberHome/postedTasks',
          name: 'postedTasks',
          component: postedTasks
        },
        {
          path: 'memberHome/received',
          name: 'received',
          component: receivedTasks
        },
        {
          path: 'memberHome/editTask/:taskID',
          name: 'editTask',
          component: editTask
        },
        // 攻略
        {
          path: '/memberHome/tips',
          name: 'tips',
          component: tips
        },
        {
          path: '/memberHome/newTip',
          name: 'newTip',
          component: newTip
        },
        {
          path: '/memberHome/tipDetail/:tipID',
          name: 'tipDetail',
          component: tipDetail
        },
        {
          path: '/memberHome/editTip/:tipID',
          name: 'editTip',
          component: editTip
        },
        {
          path: '/memberHome/postedTips',
          name: 'postedTips',
          component: postedTips
        }
      ]
    },

  ]
});

export default router;      //暴露出去的接口自动由router-view标签使用, router-view显示对应路径返回的组件内容

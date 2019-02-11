// 这个文件构把所有的组件引入

import Vue from 'vue'
import VueRouter from 'vue-router'
import memberHome from '@/components/memberHome'                            // 界面框架组件       
import activityIndex from '@/components/member/activities/activityIndex'    // 任务委托组件
import activityDetail from '@/components/member/activities/activityDetail'  // 任务详情页组件
import groupCourses from '@/components/member/groupCourses/groupCourses'    // 校园攻略组件
import personalCourses from '@/components/member/personalCourses/personalCourses'           // 校园活动组件
import personalCourseDetail from '@/components/member/personalCourses/personalCourseDetail' // 预约任务组件
import mine from '@/components/member/mine/mine'                            // 个人详情页组件
import temp from '@/components/member/temp/temp'
import login from '@/components/member/login/login'
import tasks from '@/components/member/tasks/tasks'
import newTask from '@/components/member/tasks/newTask'
import tasksDetail from '@/components/member/tasks/tasksDetail'
import strategy from '@/components/member/strategy/strategy'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  //路由映射map
  routes: [
    {
      path: '/',
      redirect: '/memberHome/tasks'
    },
    {
      path: '*',
      redirect: '/memberHome/tasks'
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
          path: '/memberHome/mine',
          name: 'mine',
          component: mine
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
        {
          path: '/memberHome/temp',
          name: 'temp',
          component: temp
        },
        {
          path: '/memberHome/login',
          name: 'login',
          component: login
        },
        {
          path: '/memberHome/tasks',
          name: 'tasks',
          component: tasks
        },
        {
          path: '/memberHome/tasksDetial/:taskID',
          name: 'tasksDetail',
          component: tasksDetail
        },
        {
          path: '/memberHome/newTask',
          name: 'newTask',
          component: newTask
        },
        {
          path: '/memberHome/strategy',
          name: 'strategy',
          component: strategy
        }
      ]
    },

  ]
});

export default router;      //暴露出去的接口自动由router-view标签使用, router-view显示对应路径返回的组件内容

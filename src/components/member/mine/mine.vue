<template>
  <div class="mine">
    <div>
      <img class="avatar" src="../../../assets/images/avatar.png"> 
    </div>
    <router-link v-show="showLogin" to="/memberHome/login">
      <p class="loginOrSignin">
        登录/注册
      </p>
    </router-link>

    <div class="userInfo" v-show="showUserInfo">
      <h2>{{userName}}</h2>
      <p class="idStyle">{{id}}</p>
      <p class="introStyle">{{intro}}</p>
      <button class="logout" v-on:click="logoutFunction">注销</button>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
// 先获取cookie
// 如果未登录
// 加载登录按钮
// 否则
// 加载用户信息
import axios from 'axios'

export default {
  mounted() {
    this.$store.commit('UPDATE_PAGE_TITLE', '个人信息')
    this.showLogin = true;
    this.showUserInfo = false;
    if (this.$cookies.get('id')){
      this.id = this.$cookies.get('id');
      this.token = this.$cookies.get(this.id);
      axios({
        method: 'get',
        url: '/api/user/' + this.id + '/info'
      })
      .then((res) => {
        this.userName = res.data.data.user.name;
        this.intro = res.data.data.user.intro;
        this.showLogin = false;
        this.showUserInfo = true;
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  },
  methods: {
    logoutFunction: function () {
      this.$cookies.remove(this.id);
      this.$cookies.remove('id');
      this.showLogin = true;
      this.showUserInfo = false;
    }
  },
  data() {
    return {
      showUserInfo: false,
      showLogin: true,
      id: null,
      token: null,
      userName: null,
      intro: null
    }
  },
}
</script>

<style>
.mine {
  text-align: center;
}

.avatar {
  width: 7rem;
  height: 7rem;
  margin-top: 2rem;
}

.loginOrSignin {
  font-size: 1.5rem;
  color: #888;
}

.idStyle {
  color: #888;
}

.introStyle {
  text-align: left;
  width: 80%;
  margin-left: 10%;
  background-color: #DDD;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.logout {
  height: 2rem;
  width: 4rem;
  border: 0;
  margin-top: 2rem;
  background-color: tomato;
  color: white;
  border-radius: 0.5rem;
}
</style>

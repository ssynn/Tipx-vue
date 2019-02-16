<template>
  <div class="loginandsignin">
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <p :style="tishiStyle" v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入ID" v-model="id">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button class="confirm" v-on:click="loginFunction">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <p :style="tishiStyle" v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入ID" v-model="id">
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <input type="password" placeholder="请重复密码" v-model="repPassword">
      <textarea class="brief" placeholder="说几句描述你自己吧。" v-model="intro"></textarea>
      <button class="confirm" v-on:click="registerFunction">注册</button>
      <span v-on:click="ToLogin">已有账号? 马上登录</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    ToRegister: function() {
      this.showLogin = false;
      this.showRegister = true;
      this.$store.commit("UPDATE_PAGE_TITLE", "用户注册");
    },
    ToLogin: function() {
      this.showLogin = true;
      this.showRegister = false;
      this.$store.commit("UPDATE_PAGE_TITLE", "用户登录");
    },
    loginFunction() {
      if (this.id == "" || this.password == "") {

        this.tishi = "ID和密码不能为空！";
        this.showTishi = true;
      } else {
        /*接口请求*/
        axios({
          method: "post",
          url: "/api/user/login",
          data: {
            logininfo: JSON.stringify({
              id: this.id,
              psw: this.password
            })
          }
        })
        .then(res => {
          // 处理登录数据
          if (res.data.status == 'success'){
            this.$cookies.set('id', this.id, 3600);
            this.$cookies.set(this.id,  " Bearer " + res.data.data.token, 3600);
            this.tishiStyle.color = 'green';
            this.tishi = '登录成功';
            this.showTishi = true;
            this.$router.push('/memberHome/mine');
          } else {
            this.tishiStyle.color = 'red';
            this.tishi = res.data.data.msg;
            this.showTishi = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    registerFunction: function() {
      if (this.id == "" || this.username == "" || this.password == "") {
        this.tishi = "ID和用户名和密码不能为空！";
        this.showTishi = true;
      } else if (this.password != this.repPassword) {
        this.tishi = "两次密码输入不一致！";
        this.showTishi = true;
      } else {
        /*接口请求*/
        axios({
          method: "post",
          url: "/api/user/register",
          data: {
            reginfo: JSON.stringify({ 
              id: this.id,
              name: this.username,
              psw: this.password,
              intro: this.intro
            })
          }
        })
        .then(res => {
          if (res.data.status == 'success'){
            this.tishiStyle.color = 'green';
            this.tishi = res.data.data.msg;
            this.showTishi = true;
          } else {
            this.tishiStyle.color = 'red';
            this.tishi = res.data.data.msg;
            this.showTishi = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  },
  data() {
    let temp = {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishiStyle: {color: 'red'},
      tishi: "",
      id: "",
      username: "",
      password: "",
      repPassword: "",
      intro: "",
      newUsername: "",
      newPassword: ""
    };
    return temp;
  },
  mounted() {
    if (this.$cookies.get(this.username)) {
      console.log("用户已登录");
    }
    this.$store.commit("UPDATE_PAGE_TITLE", "用户登录");
  }
};
</script>

<style>
.login-wrap {
  text-align: center;
}
.register-wrap {
  text-align: center;
}
.login-wrap > input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
.brief {
  width: 250px;
  height: 120px;
  border: 1px solid #888;
  box-sizing: border-box;
}
.confirm {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}


</style>

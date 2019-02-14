<template>
  <div class="newPassword-wrap">
    <h3>修改密码</h3>
    <p :style="tishiStyle" v-show="showTishi">{{tishi}}</p>
    <input type="password" placeholder="请输入原始密码" v-model="oldPassword">
    <input type="password" placeholder="请输入密码" v-model="password">
    <input type="password" placeholder="请重复密码" v-model="repPassword">
    <button class="confirm" v-on:click="submit">提交</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    submit() {
      if (this.oldPassword == "" || this.password == "") {
        this.tishi = "密码不能为空！";
        this.showTishi = true;
        return;
      }
      if (this.password != this.repPassword) {
        this.tishi = "两次密码输入不一致！";
        this.showTishi = true;
        return;
      }
      /*接口请求*/
      axios({
        method: "post",
        url: "/api/user/u/" + this.id + "/psw",
        data: {
          chpswinfo: JSON.stringify({
            id: this.id,
            oldpsw: this.oldPassword,
            newpsw: this.password
          })
        },
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.status == "success") {
            this.tishiStyle.color = "green";
            this.tishi = res.data.data.msg;
            this.showTishi = true;
            this.$cookies.remove(this.id);
            this.$cookies.remove("id");
          } else {
            this.tishiStyle.color = "red";
            this.tishi = res.data.data.msg;
            this.showTishi = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    let temp = {
      showTishi: false,
      tishiStyle: { color: "red" },
      tishi: "",
      oldPassword: "",
      password: "",
      repPassword: "",
      id: ""
    };
    return temp;
  },
  mounted() {
    this.id = this.$cookies.get("id");
    this.token = this.$cookies.get(this.id);
    this.$store.commit("UPDATE_PAGE_TITLE", "用户信息修改");
  }
};
</script>

<style>
.newPassword-wrap {
  text-align: center;
}
.newPassword-wrap > input {
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

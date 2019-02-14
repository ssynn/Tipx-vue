<template>
  <div class="editUserInfo-wrap">
    <h3>修改个人信息</h3>
    <p :style="tishiStyle" v-show="showTishi">{{tishi}}</p>
    <input type="text" placeholder="请输入ID" v-model="id">
    <input type="text" placeholder="请输入用户名" v-model="name">
    <textarea class="brief" placeholder="说几句描述你自己吧。" v-model="intro"></textarea>
    <button class="confirm" v-on:click="submit">提交</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    submit() {
      /*接口请求*/
      axios({
        method: "post",
        url: "/api/user/u/" + this.id + "/info",
        data: {
          chuserinfo: JSON.stringify({
            id: this.id,
            name: this.name,
            intro: this.intro
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
    },
    loadData() {
      this.id = this.$cookies.get("id");
      this.token = this.$cookies.get(this.id);
      axios({
        method: "get",
        url: "/api/user/u/" + this.id + "/info"
      })
        .then(res => {
          this.id = res.data.data.user.id;
          this.name = res.data.data.user.name;
          this.intro = res.data.data.user.intro;
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
      name: "",
      intro: "",
      id: ""
    };
    return temp;
  },
  mounted() {
    this.loadData();
    this.$store.commit("UPDATE_PAGE_TITLE", "用户信息修改");
  }
};
</script>

<style>
.editUserInfo-wrap {
  text-align: center;
}

.editUserInfo-wrap > input {
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

<template>
  <div class="newTipInput">
    <br>
    <input type="text" placeholder="请输入攻略标题" v-model="title">
    <textarea type="text" placeholder="请输入攻略描述" v-model="content"></textarea>
    <button class="newTipSubmit" v-on:click="newTip">发布攻略</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  mounted() {
    this.id = this.$cookies.get("id");
    this.token = this.$cookies.get(this.id);
    this.$store.commit("UPDATE_PAGE_TITLE", "创建新的攻略");
  },
  methods: {
    newTip() {
      if (this.title == "" || this.content == "") {
        alert("标题|攻略描述不能为空！");
        return;
      }
      
      axios({
        method: "post",
        url: "api/tips/f",
        data: {
          tip: JSON.stringify({
            title: this.title,
            content: this.content
          })
        },
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.status == 'success') {
            alert('发布成功！');
            this.$router.push({name: 'tips'});
        } else {
            alert(res.data.data.msg);
        }
      });
    }
  }
};
</script>

<style>
.newTipInput > input {
  width: 70%;
  margin-left: 15%;
  margin-top: 1rem;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}

.newTipInput > textarea {
  width: 70%;
  margin-left: 15%;
  margin-top: 1rem;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
  height: 7rem;
}

.newTipSubmit {
  position: absolute;
  bottom: 3.6rem;
  left: 35%;
  border: 0px;
  border-radius: 0.7rem;
  color: white;
  height: 2rem;
  width: 30%;
  background: #e64a19;
}
</style>
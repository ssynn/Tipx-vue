<template>
  <div class="newTipInput">
    <br>
    <input type="text" placeholder="请输入攻略标题" v-model="title">
    <textarea type="text" placeholder="请输入攻略描述" v-model="content"></textarea>
    <button class="editTipSubmit" v-on:click="submitEdit">提交修改</button>
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
    this.loadInfo();
    this.$store.commit("UPDATE_PAGE_TITLE", "编辑当前的攻略");
  },
  methods: {
    submitEdit() {
      if (this.title == "" || this.content == "") {
        alert("标题|攻略描述不能为空！");
        return;
      }
      axios({
        method: "post",
        url: "api/tips/p/" + this.tipID + "/edit",
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
        if (res.data.status == "success") {
          alert("修改成功！");
          this.$router.push({
            name: "tipDetail",
            params: { tipID: this.tipID }
          });
        } else {
          alert(res.data.data.msg);
        }
      });
    },
    loadInfo() {
      this.tipID = this.$route.params.tipID;
      this.id = this.$cookies.get("id");
      this.token = this.$cookies.get(this.id);
      axios({
        method: "get",
        url: "/api/tips/p/" + this.tipID,
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          let mainData = res.data.data.tip;
          this.title = mainData.title;
          this.content = mainData.content;
        })
        .catch(err => {
          console.log(err);
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

.editTipSubmit {
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
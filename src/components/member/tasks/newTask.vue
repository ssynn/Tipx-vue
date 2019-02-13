<template>
  <div class="newTaskInput">
    <br>
    <input type="text" placeholder="请输入任务标题" v-model="title">
    <input type="text" placeholder="请输入任务类型(数字)" v-model="type">
    <textarea type="text" placeholder="请输入任务描述" v-model="content"></textarea>
    <button class="newTaskSubmit" v-on:click="newTask">发布任务</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      type: "",
      content: ""
    };
  },
  mounted() {
    this.$store.commit("UPDATE_PAGE_TITLE", "创建新的任务");
  },
  methods: {
    newTask() {
      if (this.title == "" || this.type == "" || this.content == "") {
        alert("标题|类型|任务描述不能为空！");
        return;
      }
      this.id = this.$cookies.get("id");
      let token = this.$cookies.get(this.id);
      axios({
        method: "post",
        url: "api/tasks/f",
        data: {
          task: JSON.stringify({
            type: Number(this.type),
            title: this.title,
            content: this.content
          })
        },
        headers: {
          Authorization: token
        }
      }).then(res => {
        if (res.data.status == 'success') {
            alert('发布成功！');
            this.$router.push({name: 'tasks'});
        } else {
            alert(res.data.data.msg);
        }
      });
    }
  }
};
</script>

<style>
.newTaskInput > input {
  width: 70%;
  margin-left: 15%;
  margin-top: 1rem;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}

.newTaskInput > textarea {
  width: 70%;
  margin-left: 15%;
  margin-top: 1rem;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
  height: 7rem;
}

.newTaskSubmit {
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
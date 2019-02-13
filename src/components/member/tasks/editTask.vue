<template>
  <div class="newTaskInput">
    <br>
    <input type="text" placeholder="请输入任务标题" v-model="title">
    <input type="text" placeholder="请输入任务类型(数字)" v-model="type">
    <textarea type="text" placeholder="请输入任务描述" v-model="content"></textarea>
    <button class="editTaskSubmit" v-on:click="submitEdit">提交修改</button>
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
    this.loadInfo();
    this.$store.commit("UPDATE_PAGE_TITLE", "编辑当前的任务");
  },
  methods: {
    submitEdit() {
      if (this.title == "" || this.type === "" || this.content == "") {
        alert("标题|类型|任务描述不能为空！");
        return;
      }
      axios({
        method: "post",
        url: "api/tasks/p/"+this.taskID+"/edit/req",
        data: {
          task: JSON.stringify({
            type: Number(this.type),
            title: this.title,
            content: this.content
          })
        },
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.status == 'success') {
            alert('修改成功！');
            this.$router.push({name: 'tasksDetail', params: {taskID: this.taskID}});
        } else {
            alert(res.data.data.msg);
        }
      });
    },
    loadInfo() {
      this.taskID = this.$route.params.taskID;
      this.id = this.$cookies.get("id");
      this.token = this.$cookies.get(this.id);
      axios({
        method: "get",
        url: "/api/tasks/p/" + this.taskID,
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          let mainData = res.data.data.task;
          this.title = mainData.title;
          this.type = mainData.type;
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

.editTaskSubmit {
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
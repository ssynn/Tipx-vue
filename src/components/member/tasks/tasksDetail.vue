<template>
  <div class="activityDetail">
    <div class="newsImg">
      <img src="../../../assets/images/news-img.jpg">
    </div>
    <div class="detail-box">
      <div class="text-top">
        <p class="title">{{mainData.title}}</p>
        <div class="sDate">
          <flexbox>
            <flexbox-item>发布时间：{{mainData.time}}</flexbox-item>
            <flexbox-item>发布者：{{mainData.posterid}}</flexbox-item>
          </flexbox>
        </div>
      </div>
      <div class="detail-text">
        <p v-html="mainData.content">{{mainData.content}}</p>
      </div>
    </div>

    <div class="confimButton">
      <button v-if="status==2" @click="agreeComplete">同意完成</button>
      <button v-if="status==4" @click="agreeGiveup">同意放弃</button>
    </div>
    <button class="acceptTaskButton" v-if="canAccept==0" v-on:click="acceptTask">{{message}}</button>
    <button class="canNotAcceptTaskButton" v-else-if="canAccept==1">{{message}}</button>
    <div class="optButtons" v-else-if="canAccept==2">
      <button style="background:#448AFF;" @click="editTask">修改</button>
      <button style="background:#D32F2F;" @click="deleteTask">删除</button>
    </div>
    <div class="optButtons" v-else-if="canAccept==3">
      <button style="background:#E64A19;" @click="giveup">放弃</button>
      <button style="background:#4CAF50;" @click="complete">完成</button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XImg } from "vux";
import axios from "axios";

export default {
  mounted() {
    this.loadDetail();
    this.$store.commit("UPDATE_PAGE_TITLE", "任务详情");
  },
  data() {
    return {
      mainData: {},
      canAccept: null, // 0可以接受，1显示信息，2可以修改|删除，3可以放弃|完成, 4等待确认，5已完成
      status: 0,
      message: ''
    };
  },
  methods: {
    loadDetail() {
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
          this.mainData = res.data.data.task;
          this.mainData.time = this.mainData.time.substr(0, 10);
          console.log(this.mainData);
          let capacity = 3; // 0发布者，1执行者，2路人
          // 确定身份
          if (this.mainData.posterid == this.id) {
            capacity = 0;
          } else if (this.mainData.doerid == this.id) {
            capacity = 1;
          } else {
            capacity = 2;
          }
          if (this.mainData.status == 5) {
            this.message = '任务已完成';
            this.canAccept = 1;
          } else if (this.mainData.status == 6) {
            this.message = '任务已失效';
            this.canAccept = 1;
          } else if (capacity == 1) {
            // 任务接受者
            if (this.mainData.status == 1) {
              this.canAccept = 3;
            } else if(this.mainData.status == 3) {
              this.canAccept = 0;
              this.message = '确认修改';
            } else {
              this.canAccept = 1;
              this.message = this.mainData.status == 2?'等待确认完成':'等待确认放弃';
            }
          } else if (capacity == 2) {
            if (this.mainData.status == 0) {
              this.canAccept = 0;
              this.message = '接受任务';
            } else {
              this.canAccept = 1;
              this.message = '不可接受任务';
            }
          } else {
            this.canAccept = 2;
            this.status = this.mainData.status;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    acceptTask() {
      axios({
        method: "post",
        url: "/api/tasks/p/" + this.taskID + "/accept",
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.status == "success") {
            this.canAccept = 3;
          }
          alert(res.data.data.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask() {
      axios({
        method: "delete",
        url: "/api/tasks/p/" + this.taskID,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.status == "success") {
          alert("申请删除成功!");
          this.$router.push({ name: "tasks" });
        } else {
          alert(res.data.data.msg);
        }
      });
    },
    editTask() {
      if (this.mainData.status == 3){
        alert('需要等待对方确认修改！');
        return;
      }
      this.$router.push({ name: "editTask", params: { taskID: this.taskID } });
    },
    giveup() {
      axios({
        method: "post",
        url: "/api/tasks/p/" + this.taskID + "/abd/req",
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.status == "success") {
            alert("申请放弃成功!");
            this.$router.go(0);
          } else {
            alert(res.data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    complete() {
      axios({
        method: "post",
        url: "/api/tasks/p/" + this.taskID + "/complete/req",
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.status == "success") {
            alert("申请完成成功!");
            this.$router.go(0);
          } else {
            alert(res.data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    agreeGiveup() {
      axios({
        method: "post",
        url: "/api/tasks/p/" + this.taskID + "/abd/cfm",
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.status == "success") {
            alert("确认放弃成功!");
            this.$router.go(0);
          } else {
            alert(res.data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    agreeComplete() {
      axios({
        method: "post",
        url: "/api/tasks/p/" + this.taskID + "/complete/cfm",
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          if (res.data.status == "success") {
            alert("确认完成成功!");
            this.$router.go(0);
          } else {
            alert(res.data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  components: {
    Flexbox,
    FlexboxItem,
    XImg
  }
};
</script>

<style>
.activityDetail .newsImg {
  height: 180px;
  overflow: hidden;
}

.activityDetail .title {
  font-size: 16px;
  line-height: 22px;
}

.activityDetail .detail-text {
  color: #666;
  padding: 10px 15px;
}

.detail-text {
  width: 90%;
}

.activityDetail .detail-text > p {
  text-indent: 28px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.activityDetail .newsImg > img {
  width: 100%;
  min-height: 180px;
}

.activityDetail .sDate {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.activityDetail .text-top {
  border-bottom: 1px solid #eee;
  padding: 10px 15px 15px 15px;
}

.acceptTaskButton {
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

.canNotAcceptTaskButton {
  position: absolute;
  bottom: 3.6rem;
  left: 35%;
  border: 0px;
  border-radius: 0.7rem;
  color: white;
  height: 2rem;
  width: 30%;
  background: #757575;
}

.optButtons {
  position: absolute;
  bottom: 3.6rem;
  left: 30%;
  width: 40%;
  color: white;
}

.optButtons > button {
  width: 48%;
  border: 0px;
  height: 1.8rem;
  border-radius: 0.5rem;
  color: white;
}

.confimButton > button {
  position: absolute;
  bottom: 5.6rem;
  left: 30%;
  width: 40%;
  border: 0px;
  height: 1.8rem;
  border-radius: 0.5rem;
  background: #e91e63;
  color: white;
}
</style>
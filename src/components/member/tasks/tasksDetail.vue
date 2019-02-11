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

    <button class="acceptTaskButton" v-if="canAccept==0" v-on:click="acceptTask">接受任务</button>
    <button class="canNotAcceptTaskButton" v-else-if="canAccept==1">任务已被领取</button>
    <div class="optButtons" v-else-if="canAccept==2">
      <button style="background:#448AFF;">修改</button>
      <button style="background:#D32F2F;" @click="deleteTask">删除</button>
    </div>
    <div class="optButtons" v-else>
      <button style="background:#E64A19;">放弃</button>
      <button style="background:#4CAF50;">完成</button>
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
      mainData: "",
      canAccept: null // 0可以接受，1不能接受，2可以修改|删除，3可以放弃|完成
    };
  },
  methods: {
    loadDetail() {
      let id = this.$route.params.taskID;
      this.id = this.$cookies.get("id");
      var token = this.$cookies.get(this.id);
      axios({
        method: "get",
        url: "/api/tasks/" + id,
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.mainData = res.data.data.task;
        this.mainData.time = this.mainData.time.substr(0, 10);
        console.log(this.id);
        console.log(this.mainData);
        // 是发布者
        if (this.mainData.posterid == this.id) {
          this.canAccept = 2;
          return;
        }
        // 是任务接受者
        if (this.mainData.doerid == this.id) {
          this.canAccept = 3;
          return;
        }
        // 可以接受任务
        if (this.mainData.doerid == null && this.id != this.mainData.posterid) {
          this.canAccept = 0;
          return;
        }
        // 不是发布者也不是接受者不能接受任务
        if (this.mainData.doerid != this.id && this.id != this.mainData.posterid) {
          this.canAccept = 1;
          return;
        }
        
      })
      .catch(err => {
        console.log(err);
      });
    },
    acceptTask() {
      let id = this.$route.params.taskID;
      this.id = this.$cookies.get("id");
      let token = this.$cookies.get(this.id);
      axios({
        method: "post",
        url: "/api/tasks/" + id + "/accept",
        headers: {
          Authorization: token
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
      let id = this.$route.params.taskID;
      let token = this.$cookies.get(this.id);
      console.log('delete');
      // axios({
      //   method: "delete",
      //   url: "/api/tasks/"+id,
      //   headers: {
      //     Authorization: token
      //   }
      // })
      // .then(res => {
      //   if (res.data.status == 'success') {
      //     alert('申请删除成功!');
      //   } else {
      //     alert(res.data.data.msg);
      //   }
      // })
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

</style>
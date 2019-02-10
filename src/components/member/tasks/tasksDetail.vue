<template>
  <div class="activityDetail">
    <div class="newsImg">
      <img src="../../../assets/images/news-img.png">
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
    
    <button class="acceptTaskButton" v-if="canAccept" v-on:click="acceptTask" >接受任务</button>
    <button class="canNotAcceptTaskButton" v-else>任务已被领取</button>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, XImg } from "vux";
import axios from 'axios'

export default {
  mounted() {
    this.loadDetail();
    this.$store.commit("UPDATE_PAGE_TITLE", "任务详情");
  },
  data() {
    return {
      mainData: "",
      canAccept: true
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
          "Authorization": token
        }
      })
      .then(res => {
        this.mainData = res.data.data.task;
        console.log(this.mainData);
        this.mainData.time = this.mainData.time.substr(0, 10);
        // 根据是否有人接受任务修改按钮的显示内容
        if (this.mainData.doerid != null) {
          this.canAccept = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    acceptTask() {
      console.log(122);
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

.activityDetail .detail-text p {
  text-indent: 28px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}

.activityDetail .newsImg img {
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
  background: #E64A19;
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
</style>
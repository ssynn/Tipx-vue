<template>
  <div class="tipDetail">
    <div class="newsImg">
      <img src="../../../assets/images/news-img.jpg">
    </div>
    <div class="detail-box">
      <div class="text-top">
        <p class="title">{{mainData.title}}</p>
        <div class="sDate">
          <flexbox>
            <flexbox-item>发布时间：{{mainData.time}}</flexbox-item>
            <flexbox-item>发布者：{{mainData.poster}}</flexbox-item>
          </flexbox>
        </div>
      </div>
      <div class="detail-text">
        <p v-html="mainData.content">{{mainData.content}}</p>
      </div>
    </div>
    <div class="optButtons" v-if="status==1">
      <button style="background:#448AFF;" @click="editTip">修改</button>
      <button style="background:#D32F2F;" @click="deleteTip">删除</button>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XImg } from "vux";
import axios from "axios";

export default {
  mounted() {
    this.loadDetail();
    this.$store.commit("UPDATE_PAGE_TITLE", "攻略详情");
  },
  data() {
    return {
      mainData: {},
      status: 0 // 1可以修改|删除
    };
  },
  methods: {
    loadDetail() {
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
          this.mainData = res.data.data.tip;
          this.mainData.time = this.mainData.time.substr(0, 10);
          console.log(this.mainData);
          // 确定身份
          if (this.mainData.poster == this.id) {
            this.status = 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTip() {
      axios({
        method: "delete",
        url: "/api/tips/p/" + this.tipID,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.status == "success") {
          alert("删除成功!");
          this.$router.push({ name: "tips" });
        } else {
          alert(res.data.data.msg);
        }
      });
    },
    editTip() {
      this.$router.push({ name: "editTip", params: { tipID: this.tipID } });
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
.tipDetail .newsImg {
  height: 180px;
  overflow: hidden;
}

.tipDetail .title {
  font-size: 16px;
  line-height: 22px;
}

.tipDetail .detail-text {
  color: #666;
  padding: 10px 15px;
}

.detail-text {
  width: 90%;
}

.tipDetail .detail-text > p {
  text-indent: 28px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.tipDetail .newsImg > img {
  width: 100%;
  min-height: 180px;
}

.tipDetail .sDate {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.tipDetail .text-top {
  border-bottom: 1px solid #eee;
  padding: 10px 15px 15px 15px;
}

.acceptTipButton {
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

.canNotAcceptTipButton {
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
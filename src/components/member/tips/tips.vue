<template>
  <div class="activityIndex page">
    <!-- 标签，遍历itemList生成列表 -->
    <div class="activeItem" v-for="item in itemList">
      <!-- 跳转按钮，按下以后会跳转到指定页面 -->
      <router-link :to="'/memberHome/tipDetail/'+item.id">
        <div class="newsImg">
          <img src="../../../assets/images/news-img.jpg">
        </div>
        <div class="sbottom">
          <p class="taskTitle">{{item.title}}</p>
          <p class="taskIntro">{{item.intro}}</p>
        </div>
      </router-link>
    </div>
    <router-link to="/memberHome/newTip">
      <img class="newTaskButton" src="../../../assets/images/icons/new.png">
    </router-link>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, XHeader, XButton, XImg } from "vux";
import axios from "axios";
export default {
  mounted() {
    this.id = this.$cookies.get("id");
    if (this.id) {
      this.token = this.$cookies.get(this.id);
      this.loadLatest(0);
    }

    this.$store.commit("UPDATE_PAGE_TITLE", "所有攻略");
  },
  data() {
    return {
      itemList: ""
    };
  },
  methods: {
    // 加载数据方法从json中读取项目列表，把数据存入itemList
    loadLatest(page) {
      /*接口请求*/
      axios({
        method: "get",
        url: "/api/tips/f",
        headers: {
          "Authorization": this.token
        },
        data: {
          pn: String(page)
        }
      })
      .then(res => {
        console.log(res.data.data);
        this.itemList = res.data.data.tips;
        for (let index = 0; index < this.itemList.length; index++) {
          if (this.itemList[index].intro.length>20){
            this.itemList[index].intro = this.itemList[index].intro.substr(0, 20) + '...';
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    XButton,
    XImg
  }
};
</script>
<style>
.activityIndex .activeItem {
  margin: 10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px;
}

.activityIndex .activeItem .sbottom {
  color: white;
  position: absolute;
  bottom: 10px;
  padding: 10px;
  width: 85%;
}
s .activityIndex .activeItem .title {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activityIndex .time-line {
  font-size: 14px;
  width: 100%;
  height: 20px;
}

.activityIndex .activeItem .view {
  float: right;
  font-size: 14px;
}

.activityIndex .activeItem .newsImg img {
  width: 100%;
  min-height: 180px;
}

.activityIndex .sbottom img {
  width: 16px;
  height: 12px;
  padding-right: 5px;
}

.newTaskButton{
  position: absolute;
  bottom: 4rem;
  left: 45%;
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
  background: #FF5252;
}
</style>



<template>
  <div class="memberHome" style="height: 100%">
    <!-- 整个页面 -->
    <view-box ref="viewbox" body-padding-top="46px">
      <!-- 标题 -->
      <div class="vux-demo-header-box" slot="header">
        <x-header :left-options="{backText: ''}" v-show="headShow">{{pageTitle}}</x-header>
      </div>
      <!-- 加载中的提示 -->
      <div v-transfer-dom class="loading-box">
        <loading :show="loading" position="absolute"></loading>
      </div>
      <!-- 详细信息 -->
      <router-view></router-view>
      <!-- 底部导航栏 -->
      <tabbar v-show="footerShow">
        <tabbar-item selected link="/memberHome/tasks">
          <img slot="icon" src="../assets/images/icons/news_icon.png">
          <span slot="label">任务委托</span>
        </tabbar-item>
        <tabbar-item link="/memberHome/strategy">
          <img slot="icon" src="../assets/images/icons/guide_icon.png">
          <span slot="label">校园攻略</span>
        </tabbar-item>
        <tabbar-item link="/memberHome/activityIndex">
          <img slot="icon" src="../assets/images/icons/private_icon.png">
          <span slot="label">校园活动</span>
        </tabbar-item>
        <tabbar-item link="/memberHome/mine">
          <img slot="icon" src="../assets/images/icons/mine_icon.png">
          <span slot="label">我的信息</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, Icon, TabbarItem, XHeader, Loading, ViewBox } from "vux";
import { TransferDomDirective as TransferDom } from "vux";

import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["headShow", "loading", "footerShow", "pageTitle"]),
  data() {
    let data = {};
    return data;
  },
  mounted() {},
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    Loading,
    ViewBox,
    Icon
  }
};
</script>
<style>
.memberHome .vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.memberHome .weui-tabbar__icon img {
  width: auto;
  height: 90%;
}

.memberHome .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #dd5858;
}
</style>


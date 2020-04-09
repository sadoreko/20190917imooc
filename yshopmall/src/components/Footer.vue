<template>
  <div id="footer" class="acea-row row-middle">
    <router-link
      :to="item.url"
      class="item"
      :class="{ on: item.url === $route.path }"
      v-for="(item, index) in footerList"
      :key="index"
    >
      <div
        class="iconfont"
        :class="item.icon1 + ' ' + (item.url === $route.path ? item.icon2 : '')"
      ></div>
      <div>{{ item.name }}</div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Footer",
  props: {},
  data: function() {
    return {
      footerList: [
        {
          name: "首页",
          // icon1: "icon-shouye-xianxing",
          // icon2: "icon-shouye",
          icon1: "icon-index",
          icon2: "icon-index-focus",
          url: "/"
        },
        {
          name: "商城",
          // icon1: "icon-yingyongchengxu-xianxing",
          // icon2: "icon-yingyongchengxu",
          icon1: "icon-mall",
          icon2: "icon-mall-focus",
          url: "/category"
        },
        {
          name: "活动",
          // icon1: "icon-caigou-xianxing",
          // icon2: "icon-caigou",
          icon1: "icon-activity",
          icon2: "icon-activity-focus",
          // url: "/cart"
          url: "/sales"
        },
        {
          name: "我的",
          // icon1: "icon-yonghu-xianxing",
          // icon2: "icon-yonghu",
          icon1: "icon-mine",
          icon2: "icon-mine-focus",
          url: "/user"
        }
      ]
    };
  },
  methods: {}
};
</script>

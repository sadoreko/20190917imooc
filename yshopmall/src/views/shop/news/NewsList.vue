<template>
  <div class="newsList" ref="container">
    <div class="list" v-for="(item, index) in articleList" :key="index">
      <router-link
        :to="{ path: '/news_detail/' + item.id }"
        class="item acea-row row-between-wrapper"
      >
        <div class="text acea-row row-column-between">
          <div class="name line2">{{ item.title }}</div>
          <div>{{ item.addTime }}</div>
        </div>
        <div class="pictrue"><img :src="item.imageInput" /></div>
      </router-link>
    </div>

    <!--暂无新闻-->
    <div class="noCommodity" v-if="articleList.length === 0 && page > 1">
      <div class="noPictrue">
        <img src="@assets/images/noNews.png" class="image" />
      </div>
    </div>
    <!--</Tab>-->
    <!--</Tabs>-->
  </div>
</template>
<script>
import "@assets/css/swiper.min.css";
import { getArticleList } from "@api/public";

export default {
  name: "NewsList",
  components: {},
  props: {},
  data: function() {
    return {
      page: 1,
      limit: 20,
      loadTitle: "",
      loading: false,
      loadend: false,
      imgUrls: [],
      navLsit: [],
      articleList: [],
      active: 0,
      cid: 0,
      swiperNew: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      }
    };
  },
  mounted: function() {
    // this.articleBanner();
    //this.articleCategory();
    this.getArticleLists();
    //   this.$scroll(this.$refs.container, () => {
    //     !this.loading && this.getArticleLists();
    //   });
  },
  methods: {
    getArticleLists: function() {
      let that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      let q = {
        page: that.page,
        limit: that.limit
      };
      getArticleList(q).then(res => {
        that.loading = false;
        //apply();js将一个数组插入另一个数组;
        console.log(res.data);
        that.articleList.push.apply(that.articleList, res.data);
        that.loadend = res.data.length < that.limit; //判断所有数据是否加载完成；
        that.page = that.page + 1;
      });
    },
    onClick: function(name) {
      if (name === 0) this.articleHotList();
      else {
        this.cid = this.navLsit[name].id;
        this.articleList = [];
        this.page = 1;
        this.loadend = false;
        this.loading = false;
        this.getArticleLists(name);
      }
    }
  }
};
</script>

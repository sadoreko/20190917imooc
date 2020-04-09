<template>
  <div class="index" v-cloak>
    <!-- wongxiao 20200407 顶端不需要搜索功能 -->
    <!-- <div class="header acea-row row-center-wrapper">
      <router-link :to="'/search'" class="search acea-row row-middle">
        <span class="iconfont icon-xiazai5"></span>搜索商品
      </router-link>
    </div> -->

    <!-- <div class="slider-banner banner">
      <swiper :options="swiperOption" v-if="banner.length > 0">
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <router-link
            :to="item.url ? item.url : ''"
            class="search acea-row row-middle"
          >
            <img :src="item.pic" />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div> -->
    <div class="slider-banner banner">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="@assets/images/testBanner.png" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- wongxiao 20200407 目前没有后台接口取banner图片数据 -->
    <div class="news acea-row row-between-wrapper">
      <div class="pictrue">
        <img src="@assets/images/news.png" />
      </div>
      <div class="swiper-no-swiping new-banner">
        <swiper
          class="swiper-wrapper"
          :options="swiperRoll"
          v-if="roll.length > 0"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, index) in roll"
            :key="index"
          >
            <router-link
              :to="item.url ? item.url : ''"
              class="acea-row row-between-wrapper "
            >
              <div class="text acea-row row-between-wrapper">
                <div class="label" v-if="item.show === '是'">最新</div>
                <div class="newsTitle line1">{{ item.info }}</div>
              </div>
              <div class="iconfont icon-xiangyou"></div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="nav acea-row">
      <router-link
        :to="item.url ? item.url : ''"
        class="item"
        v-for="(item, index) in menus"
        :key="index"
      >
        <div class="pictrue">
          <img :src="item.pic" />
        </div>
        <div>{{ item.name }}</div>
      </router-link>
    </div>
    <div class="hotList" v-if="likeInfo.length > 0">
      <div class="hot-bg">
        <div class="title acea-row row-between-wrapper">
          <div class="text line1">
            <span class="label">热门榜单</span>
          </div>
          <router-link :to="{ path: '/hot_new_goods/' + 2 }" class="more">
            更多
            <span class="iconfont icon-jiantou"></span>
          </router-link>
        </div>
      </div>
      <div class="list acea-row row-middle">
        <router-link
          :to="{ path: '/detail/' + item.id }"
          class="item"
          v-for="(item, index) in likeInfo"
          :key="index"
        >
          <div class="pictrue">
            <img :src="item.image" />
            <img
              src="@assets/images/one.png"
              class="numPic"
              v-if="index === 0"
            />
            <img
              src="@assets/images/two.png"
              class="numPic"
              v-else-if="index === 1"
            />
            <img
              src="@assets/images/three.png"
              class="numPic"
              v-else-if="index === 2"
            />
          </div>
          <div class="name line1">{{ item.storeName }}</div>
          <div class="money font-color-red">
            ￥
            <span class="num">{{ item.price }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="wrapper" v-if="bastList.length > 0">
      <div class="title acea-row row-between-wrapper">
        <div class="text">
          <div class="name line1">精品推荐</div>
        </div>
        <router-link :to="{ path: '/hot_new_goods/' + 1 }" class="more">
          更多
          <span class="iconfont icon-jiantou"></span>
        </router-link>
      </div>
      <Good-list :good-list="bastList" :is-sort="false"></Good-list>
    </div>
    <div class="wrapper" v-if="firstList.length > 0">
      <div class="title acea-row row-between-wrapper">
        <div class="text">
          <div class="name line1">
            首发新品
            <span class="new font-color-red">NEW~</span>
          </div>
        </div>
        <router-link :to="{ path: '/hot_new_goods/' + 3 }" class="more">
          更多
          <span class="iconfont icon-jiantou"></span>
        </router-link>
      </div>
      <div class="newProducts">
        <swiper class="swiper-wrapper" :options="swiperProducts">
          <swiper-slide
            class="swiper-slide"
            v-for="(item, index) in firstList"
            :key="index"
          >
            <router-link :to="{ path: '/detail/' + item.id }">
              <div class="img-box">
                <img :src="item.image" />
              </div>
              <div class="pro-info line1">{{ item.storeName }}</div>
              <div class="money font-color-red">￥{{ item.price }}</div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="wrapper" v-if="benefit.length > 0">
      <div class="title acea-row row-between-wrapper">
        <div class="text">
          <div class="name line1">促销单品</div>
        </div>
        <router-link :to="'/promotion'" class="more">
          更多
          <span class="iconfont icon-jiantou"></span>
        </router-link>
      </div>
    </div>
    <Promotion-good :benefit="benefit"></Promotion-good>
    <div style="height:1.2rem;"></div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "@assets/css/swiper.min.css";
import GoodList from "@components/GoodList";
import PromotionGood from "@components/PromotionGood";
import { getHomeData, getShare } from "@api/public";
import { openShareAll } from "@libs/wechat";
import { isWeixin } from "@utils/index";

export default {
  name: "Index",
  components: {
    swiper,
    swiperSlide,
    GoodList,
    PromotionGood
  },
  props: {},
  data: function() {
    return {
      showCoupon: false,
      logoUrl: "",
      banner: [],
      menus: [],
      roll: [],
      activity: [],
      activityOne: {},
      bastList: [],
      firstList: [],
      info: {
        fastList: [],
        bastBanner: [],
        bastList: []
      },
      likeInfo: [],
      lovely: [],
      benefit: [],
      swiperOption: {
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
      },
      swiperRoll: {
        direction: "vertical",
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      },
      swiperScroll: {
        freeMode: true,
        freeModeMomentum: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true
      },
      swiperBoutique: {
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
      },
      swiperProducts: {
        freeMode: true,
        freeModeMomentum: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true
      }
    };
  },
  mounted: function() {
    let that = this;
    getHomeData().then(res => {
      that.logoUrl = res.data.logoUrl;
      that.$set(that, "banner", res.data.banner);
      that.$set(that, "menus", res.data.menus);
      that.$set(that, "roll", res.data.roll);
      that.$set(that, "activity", res.data.activity);
      var activityOne = res.data.activity.shift();
      that.$set(that, "activityOne", activityOne);
      that.$set(that, "info", res.data.info);
      that.$set(that, "firstList", res.data.firstList);
      that.$set(that, "bastList", res.data.bastList);
      that.$set(that, "likeInfo", res.data.likeInfo);
      that.$set(that, "lovely", res.data.lovely);
      that.$set(that, "benefit", res.data.benefit);
    });
  },
  watch: {
    menus() {
      this.setOpenShare();
    }
  },
  methods: {
    setOpenShare: function() {
      if (isWeixin()) {
        getShare().then(res => {
          var data = res.data.data;
          var configAppMessage = {
            desc: data.synopsis,
            title: data.title,
            link: location.href,
            imgUrl: data.img
          };
          openShareAll(configAppMessage);
        });
      }
    }
  }
};
</script>
<style scoped>
.index {
  background-color: #fff;
}
</style>

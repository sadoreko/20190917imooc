<template>
  <div class="activityList">
    <div class="activityList-list">
      <div class="listWrap">
        <div class="listPic">
          <img src="@assets/images/testActivity1.png" />
          <p class="title">315预售票&nbsp;电影小镇老长沙门票</p>
        </div>
        <div class="listText">
          <div class="leftPart">
            <div class="price">
              <p class="priceIcon">快抢价</p>
              <p class="currentPrice">¥135</p>
              <p class="originalPrice">¥458</p>
            </div>
            <p class="sold"><span>9878</span> 人已付款</p>
          </div>
          <div class="rightPart">
            <p class="validTime">7天 11：22：08 后结束</p>
            <a href="javascript:;" class="buyNow">立即抢购</a>
          </div>
        </div>
      </div>

      <div class="listWrap">
        <div class="listPic">
          <img src="@assets/images/testActivity2.png" />
          <p class="title">315预售票&nbsp;电影小镇老长沙门票</p>
        </div>
        <div class="listText">
          <div class="leftPart">
            <div class="price">
              <p class="priceIcon">快抢价</p>
              <p class="currentPrice">¥135</p>
              <p class="originalPrice">¥458</p>
            </div>
            <p class="sold"><span>9878</span> 人已付款</p>
          </div>
          <div class="rightPart">
            <p class="validTime">7天 11：22：08 后结束</p>
            <a href="javascript:;" class="buyNow">立即抢购</a>
          </div>
        </div>
      </div>

      <div class="listWrap">
        <div class="listPic">
          <img src="@assets/images/testActivity3.png" />
          <p class="title">315预售票&nbsp;电影小镇老长沙门票</p>
        </div>
        <div class="listText">
          <div class="leftPart">
            <div class="price">
              <p class="priceIcon">快抢价</p>
              <p class="currentPrice">¥135</p>
              <p class="originalPrice">¥458</p>
            </div>
            <p class="sold"><span>9878</span> 人已付款</p>
          </div>
          <div class="rightPart">
            <p class="validTime">7天 11：22：08 后结束</p>
            <a href="javascript:;" class="buyNow">立即抢购</a>
          </div>
        </div>
      </div>
      <!-- 从接口取数据显示 -->
      <div class="listWrap" v-for="(item, index) in activityList" :key="index">
        <router-link
          :to="{ path: item.link }"
          class="item acea-row row-between-wrapper"
        >
          <div class="listPic">
            <img :src="item.imageHost + item.imageUrl" />
            <p class="title">{{ item.title }}</p>
          </div>
          <div class="listText">
            <div class="leftPart">
              <div class="price">
                <p class="priceIcon">快抢价</p>
                <p class="currentPrice">¥{{ item.currentPrice }}</p>
                <p class="originalPrice" v-if="item.originalPrice">
                  ¥{{ item.originalPrice }}
                </p>
              </div>
              <p class="sold" v-if="item.sold">
                <span>{{ item.sold }}</span> 人已付款
              </p>
            </div>
            <!-- <div class="rightPart">
              <p class="validTime">
                {{ countValidTime(item.validTimeStart, item.validTimeEnd) }}
              </p>
              <a href="javascript:;" class="buyNow">立即抢购</a>
            </div> -->
            <div
              class="rightPart"
              v-html="countValidTime(item.validTimeStart, item.validTimeEnd)"
            ></div>
          </div>
        </router-link>
      </div>
      <!-- 从接口取数据显示 END -->
    </div>
  </div>
</template>
<script>
import { getSalesActivityList } from "@api/sales";

export default {
  name: "ActivityList",
  components: {},
  props: {},
  data: function() {
    return {
      page: 1,
      limit: 20,
      loadend: false,
      activityList: [],
      imgUrls: []
    };
  },
  watch: {},
  mounted: function() {
    this.getActivityList();
  },
  methods: {
    countValidTime: function(startTime, endTime) {
      /**
       * 计算活动还剩多少时间
       * currentTime 单位是s, 注意endTime的单位
       */
      let currentTime = Math.round(new Date() / 1000);
      if (endTime - currentTime <= 0) {
        return `<p class="validTime">活动已结束</p><a href="javascript:;" class="buyNow">已结束</a>`;
      } else if (currentTime - startTime < 0) {
        let t0 = startTime - currentTime;
        let dd = Math.floor(t0 / 86400),
          t1 = t0 % 86400,
          h1 = Math.floor(t1 / 3600),
          hh = h1 > 10 ? h1 : `0${h1}`,
          t2 = t1 % 3600,
          m1 = Math.floor(t2 / 60),
          mm = m1 > 10 ? m1 : `0${m1}`,
          ss = t2 % 60;
        return `<p class="validTime">${dd}天 ${hh} : ${mm} : ${ss} 后开始</p><a href="javascript:;" class="buyNow">立即抢购</a>`;
      } else {
        let t0 = endTime - currentTime;
        let dd = Math.floor(t0 / 86400),
          t1 = t0 % 86400,
          h1 = Math.floor(t1 / 3600),
          hh = h1 > 10 ? h1 : `0${h1}`,
          t2 = t1 % 3600,
          m1 = Math.floor(t2 / 60),
          mm = m1 > 10 ? m1 : `0${m1}`,
          ss = t2 % 60;
        return `<p class="validTime">${dd}天 ${hh} : ${mm} : ${ss} 后结束</p><a href="javascript:;" class="buyNow">立即抢购</a>`;
      }
    },
    getActivityList: function() {
      let that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      let q = {
        page: that.page,
        limit: that.limit
      };
      getSalesActivityList(q).then(res => {
        that.loading = false;
        //apply();js将一个数组插入另一个数组;
        console.log(res.data);
        that.activityList.push.apply(that.activityList, res.data);
        that.loadend = res.data.length < that.limit; //判断所有数据是否加载完成；
        that.page = that.page + 1;
      });
    }
  }
};
</script>
<style>
/* v-html里的样式不能用, style标签里的scope需要去掉 */
.activityList .activityList-list {
  padding: 0 0.3rem 1.3rem;
}
.activityList .listWrap {
  margin-top: 0.3rem;
  width: 100%;
  background: #fff;
  border: 1px solid #fff;
  box-shadow: 0px 0px 15px 0px rgba(139, 131, 111, 0.75);
  border-radius: 0.2rem;
}
.activityList .listWrap .listPic {
  width: 100%;
  height: 3.25rem;
  position: relative;
  overflow: hidden;
}
.activityList .listWrap .listPic img {
  width: 100%;
  height: auto;
}
.activityList .listWrap .listPic .title {
  width: 100%;
  height: 0.8rem;
  line-height: 1rem;
  position: absolute;
  bottom: 0;
  color: #fff;
  font-size: 0.34rem;
  font-weight: bold;
  padding-left: 0.4rem;
  background: linear-gradient(0deg, #000 0%, transparent 100%);
}
.activityList .listWrap .listText {
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.activityList .listWrap .listText .leftPart {
  padding: 0.2rem 0 0 0.4rem;
}
.activityList .listWrap .listText .leftPart .price {
  width: 3.2rem;
  display: flex;
  justify-content: left;
  align-items: center;
}
.activityList .listWrap .listText .leftPart .price .priceIcon {
  width: 1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  background: linear-gradient(90deg, #592b1e, #c3b688);
  border-radius: 0.4rem;
  color: #fff;
  font-size: 0.2rem;
}
.activityList .listWrap .listText .leftPart .price .currentPrice {
  padding: 0 0.2rem;
  font-size: 0.5rem;
  font-family: Alcubierre;
  color: #000;
}
.activityList .listWrap .listText .leftPart .price .originalPrice {
  padding-top: 0.1rem;
  font-size: 0.3rem;
  font-family: Alcubierre;
  text-decoration: line-through;
  color: #939297;
}
.activityList .listWrap .listText .leftPart .sold {
  font-size: 0.2rem;
  color: #757575;
  font-weight: 500;
}
.activityList .listWrap .listText .leftPart .sold span {
  color: #6c3824;
  font-weight: 400;
}
.activityList .listWrap .listText .rightPart {
  text-align: right;
  padding: 0.1rem 0.3rem 0 0.3rem;
}
.activityList .listWrap .listText .rightPart .validTime {
  font-size: 0.2rem;
  color: #6c3824;
}
.activityList .listWrap .listText .rightPart .buyNow {
  display: inline-block;
  background: linear-gradient(90deg, #df903b, #cfac70);
  border: none;
  border-radius: 30px;
  color: #fff;
  text-align: center;
  font-size: 0.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  width: max-content;
  padding: 0 0.3rem;
  margin-top: 0.1rem;
}
</style>

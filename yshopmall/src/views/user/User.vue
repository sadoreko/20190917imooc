<template>
  <div class="user">
    <div class="header bg-color-red acea-row row-between-wrapper">
      <div class="picTxt acea-row row-between-wrapper">
        <div class="pictrue"><img :src="userInfo.avatar" /></div>
        <div class="text">
          <div class="acea-row row-middle">
            <div class="name line1">{{ userInfo.nickname }}</div>
            <div class="member acea-row row-middle" v-if="userInfo.vip">
              <img :src="userInfo.vipIcon" />{{ userInfo.vipName }}
            </div>
          </div>
          <router-link :to="'/user/data'" class="id" v-if="userInfo.phone">
            ID：{{ userInfo.uid || 0
            }}<span class="iconfont icon-bianji1"></span>
          </router-link>
          <router-link :to="'/user/binding'" class="binding" v-else>
            <span>绑定手机号</span>
          </router-link>
        </div>
      </div>
      <span
        class="iconfont icon-shezhi"
        @click="$router.push({ path: '/user/data' })"
      ></span>
    </div>

    <!-- wongxiao 20200407 -->
    <div class="headerBottom">
      <div class="annualCardWrap" v-if="hasAnnualCard">
        <p class="annualMain">尊享会员</p>
        <p class="annualSub">电子年卡办理仅需497元</p>
        <a href="javascript:;" class="annualBtn">立即购买</a>
      </div>
      <div class="annualCardWrap" v-else>
        <p class="annualMain">尊享会员</p>
        <p class="annualSub">有效期至2021-04-05</p>
      </div>
    </div>

    <div class="wrapper">
      <!-- <div class="nav acea-row row-middle">
        <router-link :to="{ path: '/user/account' }" class="item">
          <div>我的余额</div>
          <div class="num">{{ userInfo.nowMoney || 0 }}</div>
        </router-link>
        <router-link
          :to="'/user/user_promotion'"
          class="item"
          v-if="userInfo.isPromoter === 1 || userInfo.statu === 2"
        >
          <div>当前佣金</div>
          <div class="num">{{ userInfo.brokeragePrice || 0 }}</div>
        </router-link>
        <router-link :to="'/user/integral'" class="item" v-else>
          <div>当前积分</div>
          <div class="num">{{ userInfo.integral || 0 }}</div>
        </router-link>
        <router-link :to="'/user/user_coupon'" class="item">
          <div>优惠券</div>
          <div class="num">{{ userInfo.couponCount || 0 }}</div>
        </router-link>
      </div> -->

      <!-- wongxiao 20200407 -->
      <div class="couponWrap acea-row row-between-wrapper">
        <div class="couponTit">我的优惠券</div>
        <router-link :to="'/order/list/'" class="allOrder">
          <span class="iconfont icon-jiantou"></span>
        </router-link>
      </div>

      <!-- <div class="myOrder">
        <div class="title acea-row row-between-wrapper">
          <div>我的订单</div>
          <router-link :to="'/order/list/'" class="allOrder">
            全部订单<span class="iconfont icon-jiantou"></span>
          </router-link>
        </div>
        <div class="orderState acea-row row-middle">
          <router-link :to="{ path: '/order/list/' + 0 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dfk.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.unpaidCount > 0"
                >{{ orderStatusNum.unpaidCount }}</span
              >
            </div>
            <div>待付款</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 1 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dfh.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.unshippedCount > 0"
                >{{ orderStatusNum.unshippedCount }}</span
              >
            </div>
            <div>待发货</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 2 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dsh.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.receivedCount > 0"
                >{{ orderStatusNum.receivedCount }}</span
              >
            </div>
            <div>待收货</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 3 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/dpj.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.evaluatedCount > 0"
                >{{ orderStatusNum.evaluatedCount }}</span
              >
            </div>
            <div>待评价</div>
          </router-link>
          <router-link :to="'/order/refund_list'" class="item">
            <div class="pictrue">
              <img src="@assets/images/sh.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.refundCount > 0"
                >{{ orderStatusNum.refundCount }}</span
              >
            </div>
            <div>售后/退款</div>
          </router-link>
        </div>
      </div> -->

      <!-- wongxiao 20200408 -->
      <div class="myOrder">
        <div class="orderState acea-row row-middle">
          <router-link :to="{ path: '/order/list/' + 0 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/testMy1.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.unpaidCount > 0"
                >{{ orderStatusNum.unpaidCount }}</span
              >
            </div>
            <div>待付款</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 1 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/testMy2.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.unshippedCount > 0"
                >{{ orderStatusNum.unshippedCount }}</span
              >
            </div>
            <div>未使用</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 2 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/testMy3.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.receivedCount > 0"
                >{{ orderStatusNum.receivedCount }}</span
              >
            </div>
            <div>待评价</div>
          </router-link>
          <router-link :to="{ path: '/order/list/' + 3 }" class="item">
            <div class="pictrue">
              <img src="@assets/images/testMy4.png" />
              <span
                class="order-status-num"
                v-if="orderStatusNum.evaluatedCount > 0"
                >{{ orderStatusNum.evaluatedCount }}</span
              >
            </div>
            <div>全部订单</div>
          </router-link>
        </div>
      </div>

      <!-- <div class="myService">
        <div class="title acea-row row-middle">我的服务</div>
        <div class="serviceList acea-row row-middle">
          <template v-for="(item, index) in MyMenus">
            <div
              class="item"
              :key="index"
              @click="goPages(index)"
              v-if="item.url"
            >
              <div class="pictrue">
                <img :src="item.pic" />
              </div>
              <div>{{ item.name }}</div>
            </div>
          </template>
        </div>
      </div> wongxiao 20200408 注释掉, 目前用不上  -->
    </div>
    <!-- <p style="text-align: center;margin-top: 1rem">By@Yshop2.0</p> wongxiao 目前用不上 -->
    <div class="footer-line-height"></div>
    <SwitchWindow
      v-on:changeswitch="changeswitch"
      :switchActive="switchActive"
      :login_type="userInfo.login_type"
    ></SwitchWindow>
  </div>
</template>
<script>
import { getUser, getMenuUser } from "@api/user";
import { isWeixin } from "@utils";
import SwitchWindow from "@components/SwitchWindow";

const NAME = "User";

export default {
  name: NAME,
  components: {
    SwitchWindow
  },
  props: {},
  data: function() {
    return {
      // 是否已购年卡
      hasAnnualCard: false,
      userInfo: {},
      MyMenus: [],
      orderStatusNum: {},
      switchActive: false,
      isWeixin: false
    };
  },
  watch: {
    $route(n) {
      if (n.name === NAME) this.User();
    }
  },
  mounted: function() {
    this.User();
    this.MenuUser();
    this.isWeixin = isWeixin();
  },
  methods: {
    changeswitch: function(data) {
      this.switchActive = data;
    },
    User: function() {
      let that = this;
      getUser().then(res => {
        that.userInfo = res.data;
        that.orderStatusNum = res.data.orderStatusNum;
      });
    },
    MenuUser: function() {
      let that = this;
      getMenuUser().then(res => {
        that.MyMenus = res.data.routine_my_menus;
      });
    },
    goPages: function(index) {
      let url = this.MyMenus[index].url;
      //console.log('user:'+this.userInfo.statu)
      if (url === "/user/user_promotion" && this.userInfo.statu === 1) {
        if (!this.userInfo.isPromoter)
          return this.$dialog.toast({ mes: "您还没有推广权限！！" });
      }

      if (url === "/customer/index" && !this.userInfo.adminid) {
        return this.$dialog.toast({ mes: "您还不是管理员！！" });
      }

      if (url === "/order/order_cancellation" && !this.userInfo.adminid) {
        return this.$dialog.toast({ mes: "您还不是管理员！！" });
      }

      this.$router.push({ path: this.MyMenus[index].url });
    }
  }
};
</script>

<style scoped>
.footer-line-height {
  height: 1rem;
}
.order-status-num {
  min-width: 0.33rem;
  background-color: #fff;
  color: #73cbb6;
  border-radius: 15px;
  position: absolute;
  right: -0.14rem;
  top: -0.15rem;
  font-size: 0.2rem;
  padding: 0 0.08rem;
  border: 1px solid #73cbb6;
}

.pictrue {
  position: relative;
}
.switch-h5 {
  margin-left: 0.2rem;
}
.binding {
  padding: 0.05rem 0.2rem;
  background-color: #ca1f10;
  border-radius: 50px;
  font-size: 0.14rem;
  border: 1px solid #e8695e;
  color: #ffffff;
}
/* 个人中心 */
.user .header {
  padding: 0 0.3rem;
  height: 2rem;
  position: relative;
  background: linear-gradient(0deg, #be9e6d 0%, #e9e2d9 50%, #f7f7f7 100%);
}
.user .headerBottom {
  padding: 0 0.3rem;
  background-color: #be9e6d;
  height: 1rem;
  overflow: hidden;
  border-radius: 0 0 40% 40%;
}
.user .annualCardWrap {
  padding: 0 0.4rem;
  width: 100%;
  height: 100%;
  background: #040302;
  border-radius: 0.2rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  color: #be9e6d;
  justify-content: space-between;
  align-items: center;
}
.user .annualCardWrap .annualMain {
  font-size: 0.3rem;
  font-weight: bold;
}
.user .annualCardWrap .annualSub {
  font-size: 0.2rem;
  font-weight: bold;
}
.user .annualCardWrap .annualBtn {
  font-size: 0.2rem;
  font-weight: bold;
  color: #be9e6d;
  display: block;
  border: 1px solid #be9e6d;
  border-radius: 0.2rem;
  padding: 0.02rem 0.2rem;
}
.user .couponWrap {
  padding: 0 0.3rem 0 0.6rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.user .wrapper .myOrder .orderState .item:last-child {
  border-left: 1px solid #ebebe5;
}
</style>

<template>
  <div>
    <div class="header_box">黑马程序员·Vue项目
      <span class="back" @click="goBack" v-if="this.$route.path.length>9||this.$route.path=='/addgoods'"><van-icon name="arrow-left" />返回</span>
      <span class="right" @click="addBrand" v-if="this.$route.path=='/search'">添加</span>
    </div>

   <!-- 滑动动画 -->
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>


    <!-- 尾部 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye"></use>
        </svg>
        <span>首页</span>
      </van-tabbar-item >
      <van-tabbar-item dot  to="/member">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode"></use>
        </svg>
        <span>会员</span>
      </van-tabbar-item >
      <van-tabbar-item :info="totalNum" to="/shopping">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-gouwuche"></use>
        </svg>
        <span>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item info="20" to="/search">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-chazhao"></use>
        </svg>
        <span>搜索</span>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 加载动画 -->
    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>


  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      active:'',
      transitionName:'',
    }
  },
  computed:{
    ...mapState(['totalNum','isLoading'])
  },
  methods:{
    goBack(){
      // this.$router.go(-1)
      this.$router.goBack()
    },
    addBrand(){
      this.$router.push('/addgoods')
    }
  },
  watch: {
    $route(to, from){
      let isBack = this.$router.isBack;

      if(isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  },

  created(){
    let ids = JSON.parse(localStorage.getItem('ids'))
    // console.log(typeof ids)
    ids = ids.toString()
    // console.log(ids)
    this.$store.dispatch('getShopCarList',ids)
    console.log(this.$route.path=='/search')

  }
}
</script>


<style lang="less">
.header_box{
  position: fixed;
  top:0;
  width:100%;
  z-index: 999;
  height:40px;
  line-height: 40px;
  text-align: center;
  color:#fff;
  background: #26a2ff;
}
.back{
  position: absolute;
  left:4px;
  top:0;
}
.right{
  position: absolute;
  top:0;
  right:6px;
}
.van-tabbar{
  position: fixed;
}

/* 动画滑动 */
.child-view {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: auto;
    margin-bottom: 50px;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: 0.5s translate(50px, 0);
    transform:all 0.5s translate(50px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: 0.5s translate(-50px, 0);
    transform:all 0.5s translate(-50px, 0);
}
</style>

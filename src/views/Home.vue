<template>
  <div>
    <swiper-cart></swiper-cart>
    <van-grid>
      <van-grid-item v-for="(item,index) in photoList" :key="index" text="文字" :to="item.url">
        <img src="../assets/images/menu2.png" />
        <span>{{item.text}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoList: [
        { src: "../assets/images/menu1.png", url: "/home/newslist", text: "新闻资讯" },
        { src: "../assets/images/menu2.png", url: "/home/photolist", text: "图片分享" },
        { src: "../assets/images/menu3.png", url: "/home/goodslist", text: "商品购买" },
        { src: "../assets/images/menu4.png", url: "/home", text: "留言反馈" },
        { src: "../assets/images/menu5.png", url: "/home", text: "视频专区" },
        { src: "../assets/images/menu6.png", url: "/home", text: "联系我们" },
      ]
    };
  },

  methods: {

  },

  created() {
    // 获取轮播图片
    this.$store.dispatch("getSwiperList");
  }
};
</script>

<style lang='less' scoped>
.van-grid-item {
  flex-basis: 33.333%!important;
  img {
    width: 60%;
  }
  span {
    margin: 10px 0;
  }
}
</style>


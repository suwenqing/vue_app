<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data() {
    return {

    };
  },

  methods: {},

  created() {

  },
  computed:{
      ...mapState(['swiperList'])

  },
};
</script>

<style lang='less' scoped>
.van-swipe{
  height: 50vw;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>

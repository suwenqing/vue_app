<template>
  <div>
    <van-loading color="#1989fa" ref="loading"/>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-card
        @click="toDetail(item.id)"
        v-for="(item,index) in newsList"
        :key="index"
        :title="item.title"
        :thumb="item.img_url"
        centered
      >
        <div slot="num" style="color:#26a2ff">点击:{{item.click}}次</div>
        <div slot="price" style="color:#26a2ff">发表时间:{{item.add_time|dataFormat()}}</div>
      </van-card>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      isLoading: false
    };
  },

  methods: {
    async getNewsList() {
      const res = await this.axios.get("/api/getnewslist");
      if (res.status !== 0) {
        return this.$toast("获取信息错误");
      }
      this.newsList = res.message;
      console.log(this.newsList);
    },
    toDetail(id) {
      this.$router.push(`/home/newsinfo/${id}`);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  },

   mounted(){
    console.log(this.$refs.loading)
     this.$refs.loading.style.display = 'none'
  },

  created() {
    this.getNewsList();
  }
};
</script>

<style lang='less'>
.van-card {
  white-space: nowrap;
  padding: 5px 10px;
  margin-top: 0 !important;
  .van-card__header {
    border-bottom: 1px solid #ccc;
  }
}
.van-card__header {
  height: 60px;
  .van-card__thumb {
    height: 100%;
    width: 50px;
    margin-right: 10;
  }
  .van-card__content {
    min-height: 10px;
  }
}
.van-image {
  width: 100% !important;
  // img {
  //   width: 20px !important;
  //   height: 15px !important;
  // }
}
</style>

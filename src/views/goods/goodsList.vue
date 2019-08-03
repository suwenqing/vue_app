<template>
  <div>
    <div class="include">
      <van-cell-group v-for="item in goodsList" :key="item.id" @click="showGoodsDetail(item.id)">
        <img :src="item.img_url" alt />
        <p v-html="item.title"></p>
        <van-cell label="热卖中">
          <template slot="title">
            <span class="custom-title">￥{{item.sell_price}}</span>
            <del>￥{{item.market_price}}</del>
          </template>
          <template slot="label">
            <span >热卖中</span>
            <span class="account">剩余：{{item.stock_quantity}}</span>
          </template>

        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },

  methods: {
    // 获取所有商品信息
    async getGoodsList() {
      const res = await this.axios.get("/api/getgoods?pageindex=1");
      if (res.status == 0) {
        this.goodsList = res.message;
      }
      console.log(this.goodsList);
    },

    showGoodsDetail(id){
        this.$router.push(`/home/goodsinfo/${id}`)
    }
  },

  created() {
    this.getGoodsList();
  }
};
</script>

<style lang='less' scoped>
.include {
  padding: 10px;
  .van-cell-group {
    width: 45vw;
    float: left;
    margin-left: 2vw;
    margin-bottom: 2vw;
    box-shadow: 0 0 4px #999;
    p {
      height: 10vw;
    }
    img {
      width: 100%;
    }
    .van-cell {
      position: relative;
      background-color: #ddd;
      .custom-title {
        color: red;
      }
      del {
        margin-left: 20px;
        color: #888;
      }
      .account{
          position: absolute;
          right:0;
      }
    }
  }
}
</style>

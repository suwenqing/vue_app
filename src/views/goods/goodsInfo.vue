<template>
  <div>
    <div class="container">
      <div class="lunbo">
        <swiper-cart></swiper-cart>
      </div>

      <van-cell-group>
        <van-cell :title="goodsInfoList.title" />

        <van-cell >
          <template slot="title">
            <span class="custom-title">市场价：<del>￥{{goodsInfoList.market_price}}</del></span>
            <span type="danger" class="second">
              销售价：
              <span>￥{{goodsInfoList.sell_price}}</span>
            </span>
          </template>

          <template slot="label">
            <div>
              购买数量：<van-stepper integer v-model="num" />
            </div>
            <van-button size="small" type="danger">立即购买</van-button>
            <van-button size="small" type="info" @click="addGoods">加入购物车</van-button>
          </template>

        </van-cell>
      </van-cell-group>


      <van-cell-group>
        <van-cell title="商品参数" />

        <van-cell >
          <template slot="title">
            <span class="custom-title">商品货号：{{goodsInfoList.goods_no}}</span>
            <p type="danger">
              库存情况：
              <span>{{goodsInfoList.stock_quantity}}</span>
            </p>
            <p type="danger">
              上架时间：
              <span>{{goodsInfoList.add_time|dataFormat()}}</span>
            </p>
          </template>

          <template slot="label">
            <div></div>
            <van-button class="btn" plain size="small" type="info" @click="showDesc">图文介绍</van-button>
            <van-button class="btn" plain size="small" type="danger" @click="showComm">商品评论</van-button>
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
      gid: this.$route.params.id,
      goodsInfoList: [],
      num:1,
    };
  },

  methods: {
    async getGoodsInfo() {
      const res = await this.axios.get("/api/goods/getinfo/" + this.gid);
      if (res.status !== 0) {
        return false;
      }
      this.goodsInfoList = res.message[0];
      console.log(this.goodsInfoList);
    },
    showDesc(){
        this.$router.push(`/home/goodsdesc/${this.gid}`)
    },
    showComm(){
        this.$router.push(`/home/goodscmt/${this.gid}`)
    },
    addGoods(){
      let ids = JSON.parse(localStorage.getItem('ids'))
      console.log(ids)
      ids.push(this.gid-0)
      console.log(ids)
      localStorage.setItem('ids',JSON.stringify(ids))
      // this.totalNum += this.num
      this.$store.dispatch('getShopCarList',ids.toString())
    }
  },

  created() {
    this.$store.dispatch("getGoodsSwiperList", this.gid);
    this.getGoodsInfo();
  }
};
</script>

<style lang='less' scoped>
body {
  background-color: #ddd;
}
.container {
  overflow: hidden;
  margin: 8px auto;
  width: 96vw;
  box-shadow: 0 0 3px #ccc;
  .lunbo {
    width: 50vw;
    margin: 0 auto;
  }
  .van-cell-group {
    box-shadow: 0 0 3px #ccc;
    margin-top: 20px;
    padding: 8px;
  }
}
.second {
  margin-left: 20px;
  span {
    color: red;
  }
}
.van-button{
    margin-left: 5px;
    border-radius: 5px;
}
.btn{
    width:100%;
    height:40px;
    margin-top: 10px;
    font-size: 20px;
}
</style>

<template>
  <div>
    <div class="container" v-for="(item,index) in shopCarList" :key="item.id">
      <!-- 左侧按钮区域 -->
      <van-switch size="24px" v-model="item.status"  @change="changeStatus()"/>
      <!-- 右侧信息区域 -->
      <van-card :price="item.sell_price" :title="item.title" centered>
        <div slot="thumb" class="thumb">
          <img :src="item.thumb_path" alt />
        </div>

        <div slot="num" class="thumb2">
          <van-stepper integer v-model="item.cou" @change="caltotal"/>
          <a href="javascript:;" @click="delGood(index)">删除</a>
        </div>
      </van-card>
    </div>

    <van-cell-group>
      <van-cell title="总计（不含运费）" >
        <template slot="label">
          <span class="tp">已勾选商品 <span class="acc">{{totalNum}}</span>件 总价：<span class="acc">{{totalPrice}}</span></span>
        </template>
          <van-button round type="danger">圆形按钮</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      shopCarList: [],
      totalNum: 0,
      totalPrice:0,
      // ids:[87,88,89],
    };
  },

  methods: {
    async getShopCarList() {
      let ids = JSON.parse(localStorage.getItem('ids'))
      console.log(ids)
      const res = await this.axios.get(`/api/goods/getshopcarlist/${ids.toString()}`);
      if (res.status != 0) {
        return false;
      }
      this.shopCarList = res.message;
      console.log(this.shopCarList);
      this.shopCarList.forEach(item=>{
        this.totalNum+=item.cou
        this.totalPrice += item.cou*item.sell_price
        item.status = true
      })
      // console.log(this.totalNum,this.totalPrice)
      console.log(this.shopCarList)
      // this.$store.commit('initTotal',this.totalNum,this.totalPrice)

    },
    delGood(index) {
      this.shopCarList.splice(index,1)
      let ids =JSON.parse(localStorage.getItem('ids'))
      ids.splice(index,1)
      localStorage.setItem('ids',JSON.stringify(ids))
      console.log(ids)

      this.caltotal()
    },
    caltotal(){

      this.totalNum = 0
      this.totalPrice = 0
      this.shopCarList.forEach(item=>{
        if(item.status){
          this.totalNum+=item.cou
          this.totalPrice += item.cou*item.sell_price
        }
      })
      // console.log(this.shopCarList)
      // console.log(this.totalNum,this.totalPrice)

      this.$store.commit('initTotal',this.totalNum,this.totalPrice)
    },
    changeStatus(){
      this.caltotal()
    }
  },

  computed:{
    // ...mapState(['ids'])

  },

  created() {
    this.getShopCarList();

  }
};
</script>

<style lang='less' scoped>
.container,
.van-cell-group {
  position: relative;
  height: 60px;
  padding: 10px;
  margin: 15px;
  box-shadow: 0 0 4px #ccc;
}
.thumb {
  margin-right: 20px;
}
.thumb2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 20px;
  font-size: 16px;
}
.van-switch {
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  top: 10px;
  left: 0;
}
.van-card {
  position: absolute;
  width: 84%;
  background-color: #fff;
  top: 0;
  right: 0;
}
img {
  width: 60px;
}
.acc{
  color:red;
}
.van-cell {
  padding: 0px!important;
}
.tp{
  width:100px;
}
.van-cell__title{
  width: 40vw;
}
</style>

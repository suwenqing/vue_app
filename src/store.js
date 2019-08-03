import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    swiperList:[],
    commentList:[],
    totalNum:0,
    totalPrice:0,
    isLoading:true
  },
  mutations: {
    // 获取轮播图片
    initSwiperList(state,list){
      state.swiperList = list
      // console.log(state.swiperList)
    },
    // 获取总数量和总价
    initTotal(state,num,price){
      state.totalNum = num,
      state.totalPrice = price
    },
    // 获取评论信息
    initCommentList(state, list) {
      state.commentList = list
    },

    // 改变loading的状态
    changeLoadingFalse(state,status){
      state.isLoading = status
    },
  },
  actions: {
    // 获取首页轮播图
    async getSwiperList(context) {
      const res = await axios.get('/api/getlunbo')
      if (res.status !== 0) {
        // console.log(res)
        return false
      }
      // console.log(res.message)
      context.commit('initSwiperList', res.message)
    },
    // 获取商品详情页轮播图
    async getGoodsSwiperList(context,id){
      console.log(id)
      const res = await axios.get('/api/getthumimages/'+id)
      if (res.status !== 0) {
        // console.log(res)
        return false
      }
      let arr = []
      // console.log(res.message)
      res.message.forEach(item=>{
        arr.push({"img":item.src})
      })

      context.commit('initSwiperList', arr)
    },
    // 获取评论信息
    async getCommentList(context,id){
      const res = await axios.get(`/api/getcomments/${id}?pageindex=1`)
      if(res.status==0){
        context.commit('initCommentList',res.message)
      }
    },

    // 计算商品总数量和总价
    async getShopCarList(context,ids) {
      // console.log(state.ids.toString())
      // console.log(ids)
      const res = await axios.get(`/api/goods/getshopcarlist/${ids}`);
      if (res.status != 0) {
        return false;
      }
      let totalNum = 0
      let totalPrice = 0
      const shopCarList = res.message;
      console.log(shopCarList);
      shopCarList.forEach(item => {
        totalNum += item.cou
         totalPrice += item.cou * item.sell_price
      })
      // console.log(this.totalNum,this.totalPrice)
      console.log(totalNum,totalPrice)
      context.commit('initTotal',totalNum, totalPrice)

    },
  }
})

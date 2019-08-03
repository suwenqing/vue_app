import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import NewsList from './views/news/newsList.vue'
import NewsInfo from './views/news/newsInfo.vue'

import Photo from './views/photo/PhotoList.vue'
import PhotoInfo from './views/photo/PhotoInfo.vue'

import GoodsList from './views/goods/goodsList.vue'
import GoodsInfo from './views/goods/goodsInfo.vue'
import GoodsDesc from './views/goods/goodsDesc.vue'
import GoodsComm from './views/goods/goodsComm.vue'

import Member from './views/Member.vue'
import Shopping from './views/Shopping.vue'

import Search from './views/search/Search.vue'
import AddGoods from './views/search/addGoods.vue'

Vue.use(Router)

//路由滑动相关
Router.prototype.goBack = function () {
  this.isBack = true   //判断是否是返回操作
  window.history.go(-1)
}

export default new Router({
  routes: [
    { path: '/',redirect:'/home'},
    { path: '/home',component:Home },
    { path: '/home/newslist',component:NewsList },
    { path: '/home/newsinfo/:id',component:NewsInfo},
    { path: '/home/photolist',component:Photo},
    { path: '/home/photoinfo/:id',component:PhotoInfo},
    { path: '/home/goodslist',component:GoodsList},
    { path: '/home/goodsinfo/:id',component:GoodsInfo},
    { path: '/home/goodsdesc/:id',component:GoodsDesc},
    { path: '/home/goodscmt/:id',component:GoodsComm},
    { path: '/member', component: Member },
    { path: '/shopping', component: Shopping },
    { path: '/search', component: Search },
    { path: '/addgoods', component: AddGoods },
  ],
})

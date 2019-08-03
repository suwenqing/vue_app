import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swiper from './components/swiper'
import Comment from './components/comment'
import Loading from './components/loading'
import Vant from './plugins/vant'
import '@/assets/css/main.css'
import './assets/iconfont/iconfont.js'
import axios from 'axios'

Vue.use(Swiper)
Vue.use(Comment)
Vue.use(Loading)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.filter('dataFormat', function (time) {
  var date = new Date(time)
  var y = (date.getFullYear() + '').padStart(2, 0)
  var m = (date.getMonth() + 1 + '').padStart(2, 0)
  var d = (date.getDate() + '').padStart(2, 0)
  var h = (date.getHours() + '').padStart(2, 0)
  var minute = (date.getMinutes() + '').padStart(2, 0)
  var s = (date.getSeconds() + '').padStart(2, 0)
  return `${y}-${m}-${d} ${h}:${minute}:${s}`
})

// 设置请求前缀
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

axios.interceptors.request.use(res=>{
  store.commit('changeLoadingFalse',true)
  return res
})

// 响应拦截
axios.interceptors.response.use(res=>{
  store.commit('changeLoadingFalse',false)
  return res.data
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

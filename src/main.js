import Vue from 'vue'
import App from './App.vue'
import  router from './router'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//添加时间总线
Vue.prototype.$bus = new Vue()
//解决的移动端300毫秒延迟
FastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

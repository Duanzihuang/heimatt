import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局过滤器
import '@/filters/timeFilter'

// 集成Vant
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

// 集成Vant中的图片懒加载功能
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

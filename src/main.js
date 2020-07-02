import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'

//引入阿里iconfont.css
import './assets/iconfont/iconfont.css'

var axios = require('axios')
axios.defaults.baseURL = 'https://autumnfish.cn';
Vue.prototype.$axios = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

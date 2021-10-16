import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/antd.js'
import './plugins/editor.js'
import './plugins/echarts.js'

Vue.config.productionTip = false

import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

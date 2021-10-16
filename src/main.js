import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/antd.js'
import './plugins/editor.js'
import './plugins/echarts.js'
import './plugins/vcolorpicker.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

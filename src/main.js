import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false
Vue.use(Antd);

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

import VueMarkdownEditor from '@kangc/v-md-editor';
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';

VueMarkdownEditor.use(createTipPlugin());

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdEditor);

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

VueMarkdownEditor.use(createLineNumbertPlugin());

new Vue({
  router,
  store,
  Antd,
  render: h => h(App)
}).$mount('#app')

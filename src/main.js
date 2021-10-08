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
import hljs from 'highlight.js/lib/core';

import javascript from 'highlight.js/lib/languages/javascript';
import sql from 'highlight.js/lib/languages/sql';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);


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

import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

new Vue({
  router,
  store,
  Antd,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';

//引入基本模板
let echarts = require('echarts/lib/echarts');

// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')

// // 引入提示框和title组件，图例
// require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')

require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例翻译滚动
// import * as echarts from 'echarts';
require('echarts-wordcloud');

Vue.prototype.$echarts = echarts;

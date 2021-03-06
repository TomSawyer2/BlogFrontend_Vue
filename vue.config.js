const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const IS_PROD = process.env.NODE_ENV === 'production'
const path = require('path');

module.exports = {
  css:{
    loaderOptions:{
      less:{
        javascriptEnabled: true
      }
    }
  },
  publicPath: "/",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@ant-design/icons/lib/dist$': path.join(__dirname, 'src/plugins/antdIcon.js')
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: './report.html',
        openAnalyzer: false
      }),
      new WebpackDeepScopeAnalysisPlugin()
    ]
  },
  chainWebpack(config) {
    if (IS_PROD) {
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'chunk-common', // 打包后的文件名
            chunks: 'initial', // 
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          antDesignVue: {
            name: 'chunk-ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          moment: {
            name: 'chunk-moment',
            test: /[\\/]node_modules[\\/]moment[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          vMdEditor: {
            name: 'chunk-v-md-editor',
            test: /[\\/]node_modules[\\/]@kangc[\\/]v-md-editor[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          markdown: {
            name: 'chunk-markdown',
            test: /[\\/]node_modules[\\/]@vuepress[\\/]markdown[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          highlightJs: {
            name: 'chunk-highlight.js',
            test: /[\\/]node_modules[\\/]highlight.js[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          echartsWordCloud: {
            name: 'chunk-echarts-wordcloud',
            test: /[\\/]node_modules[\\/]echarts-wordcloud[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          atantdesign: {
            name: 'chunk-@antdesign',
            test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          zrender: {
            name: 'chunk-zrender',
            test: /[\\/]node_modules[\\/]zrender[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      })
    }
  }
}
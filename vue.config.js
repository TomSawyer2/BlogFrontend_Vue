const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const IS_PROD = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  // configureWebpack: {
  //   plugins: [

  //     new BundleAnalyzerPlugin()

  //   ]
  // },
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
          }
        }
      })
    }
  }
}
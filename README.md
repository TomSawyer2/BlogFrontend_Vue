# Blog

## 启动项目
```bash
npm install
```

## 项目提交
```bash
git add .
git commit -m ""
git push
```
注意提交的格式，不要使用sourcetree提交，提交时自动运行`npm run lint`。

## 添加Antd组件
进入`@/plugins/antd.js`直接`Vue.use(componentName)`，会自动引入。

## 添加Antd Icon
进入`@/plugins/antdIcon.js`引入相关Icon资源。


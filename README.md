backToTop
=========

back-to-top button [ JavaScript Plugin ]

# 怎么用
（1）下载backToTop.min.js，放在你的模板/主题的目录下；

（2）在你的模板/主题里对应网页页脚的那个文件里，在`</body>`标签前引用backToTop.min.js，最终应该是这样的：

```html
<!-- 把...替换成你的backToTop.min.js所在的目录 -->
    <script src=".../backToTop.min.js"></script>
</body>
```
你可以选择是否平滑滚动，默认是平滑的。喜欢摆弄代码的朋友，可以对 backToTop.js（或 backToTop.min.js，取决于你引用的是哪一个）末尾的 backToTop() 做如下设置：
```javascript
backToTop({
  // 不想要平滑的滚动，就像下面这样设置为 false
  smooth: false,
  // 滚动的时长，以毫秒为单位
  time: 300
});
```

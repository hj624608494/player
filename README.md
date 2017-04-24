# player
原生JavaScript写的播放器组件

## 如何使用

#### 引入文件:

```html
<!-- 字体图标 -->
<link rel="stylesheet" type="text/css" href="http://at.alicdn.com/t/font_k0myy5f1rwq7u8fr.css">
<!-- 播放器样式 -->
<link rel="stylesheet" type="text/css" href="./css/player.css">
<!-- 播放器代码 -->
<script src="./js/player.js"></script>
```

#### html代码:

```html
<div class="audio-container">
    <div class="audio-wrapper">
        <div class="audio-controls">
            <i class="iconfont icon-bofang"></i>
        </div>
        <div class="audio-progress">
            <span class="time">00:00</span>
            <span class="progress-container">
                <span class="progress"></span>
                <span class="circle"></span>
            </span>
            <span class="time">00:00</span>
        </div>
        <div class="audio-volume">
            <i class="iconfont icon-yinliang"></i>
            <span class="volume-container">
                <span class="volume"></span>
                <span class="circle"></span>
            </span>
        </div>
    </div>
</div>
```

#### javascript代码:

```javascript
var player = new Player({
    url: './1.mp3',
    container: 'audio-container', // 可选
    skin: 'blue' // 可选 (默认为红色, 传 'blue' 为蓝色, 传 'green' 为绿色)
})
```

## 皮肤 skin

#### 红色版

![image](./screenshot/red.png)

#### 蓝色版

![image](./screenshot/blue.png)

#### 绿色版

![image](./screenshot/green.png)

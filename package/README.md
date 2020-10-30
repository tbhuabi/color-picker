# 贝塞尔曲线

在 web 开发中，我们经常会用动画来提高用户体验，但浏览器只提供了一个 css3 来实现动画的方式。css3 实现动画一般能满足大部分的需求，但当我们需要对动画做粗细的步长控制、暂停、重启等操作时，css3 提供的 `transitionstart`/`transitionend`、`animationstart`/`animationend` 接口明显不能满足我们需求。这时，就需要一个可定制、可编辑的贝塞尔曲线工具来实现我们想要的功能。

本库提供了两个贝塞尔曲线的工具类，分别为普通的贝塞尔曲线 `Bezier` 和 css3 的三次贝塞尔曲线 `CubicBezier`。两个类的使用方式是一致的，但 `CubicBezier` 类对时间因子 `t` 作了修正，计算结果和 css3 的表现一致，使之更符合我们的直觉。


```ts
import { CubicBezier } from '@tanbo/bezier';

const bezier = new CubicBezier(0.36, 0.66, 0.04, 1); 

const div = document.getElementById('box');

let i = 0;

const fn = function() {
    if (i < 100) {
        i++;
        // t 为当前进度百分比
        const t = 1 / 100;
        // result 为当前 bezier 坐标点的位置
        const result = bezier.update(t);
        div.style.transform = `translateX(${result.y * 400}px)`;

        requestAnimationFrame(fn);
    }
};

requestAnimationFrame(fn);
```

如果三次贝塞尔曲线不能满足你的需求，你还可以使用多次贝塞尔曲线。

```ts
import { Bezier } from '@tanbo/bezier';

// 可以传偶数个数字，且不少于4个
const bezier = new Bezier([
      -.9, -.7,
      -.8, .4,
      .1, -.6,
      .2, -1,
      .5, .6,
      .5, 1.3,
      0, .9,
      1, 1]); 

const div = document.getElementById('box');

let i = 0;

const fn = function() {
    if (i < 100) {
        i++;
        // result 为当前 bezier 坐标点的位置
        const result = bezier.update(i / 100);
        console.log(result);

        requestAnimationFrame(fn);
    }
};

requestAnimationFrame(fn);
```

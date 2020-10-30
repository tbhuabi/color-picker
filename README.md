颜色选择器
===========================================


## 安装
```
npm install @tanbo/color-picker
```

## 使用

```typescript
import { createPicker } from '@tanbo/color-picker';

const picker = createPicker(document.getElementById('picker'));

// 当用户确认选中颜色后触发
picker.onSelected = function () {
  console.log(picker.rgb)
}

// 当用户选择颜色时触发
picker.onChange = function () {
  console.log(picker.rgb)
}

// 添加最近使用的颜色
picker.addRecentColor('#f00')

// 设置选择器的颜色，你还可以设置其它格式，如 rgba、hex、hsl 等
picker.rgb = {
  r: 255,
  g: 255,
  b: 255
};
```

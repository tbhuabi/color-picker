export const template = `
<div class="tanbo-color-picker-viewer">
  <div class="tanbo-color-picker-viewer-left">
    <div class="tanbo-color-picker-palette">
      <div class="tanbo-color-picker-palette-point"></div>
    </div>
    <div class="tanbo-color-picker-viewer-alpha">
      <div class="tanbo-color-picker-viewer-alpha-pointer"></div>
      <div class="tanbo-color-picker-viewer-alpha-bar"></div>
    </div>
  </div>
  <div class="tanbo-color-picker-viewer-right">
    <div class="tanbo-color-picker-tools">
      <div class="tanbo-color-picker-value">
        <div class="tanbo-color-picker-value-color"></div>
      </div>
      <div class="tanbo-color-picker-hue-bar">
        <div class="tanbo-color-picker-hue-pointer"></div>
      </div>
    </div>
    <div class="tanbo-color-picker-viewer-alpha-value">
      1
    </div>
  </div>
</div>
<div class="tanbo-color-picker-inputs">
  <div class="tanbo-color-picker-hsl">
    <div>H <input data-model="H" min="0" max="360" type="number"></div>
    <div>S <input data-model="S" min="0" max="100" type="number"></div>
    <div>L <input data-model="L" min="0" max="100" type="number"></div>
  </div>
  <div class="tanbo-color-picker-rgb">
    <div>R <input data-model="R" min="0" max="255" type="number"></div>
    <div>G <input data-model="G" min="0" max="255" type="number"></div>
    <div>B <input data-model="B" min="0" max="255" type="number"></div>
  </div>
  <div class="tanbo-color-picker-hex">
    <div>HEX <input data-model="HEX" type="text"></div>
  </div>
</div>
<div class="tanbo-color-picker-swatches">
  <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
  <div class="tanbo-color-picker-swatches-empty"></div>
</div>
<div class="tanbo-color-picker-btn-wrap">
  <button type="button" class="tanbo-color-picker-btn">确定</button>
</div>
`;

export function template(btnText: string, paletteText: string, recentText: string, backText: string) {
  return `
<div class="tanbo-color-picker-preset">
  <div class="tanbo-color-picker-swatches" style="height: 50px"></div>
  <div class="tanbo-color-picker-swatches" style="height: 118px;"></div>
  <div class="tanbo-color-picker-recent-text">${recentText}</div>
  <div class="tanbo-color-picker-swatches" style="height: 25px;"></div>
  <div class="tanbo-color-picker-flex">
    <div class="tanbo-color-picker-swatches">
      <div data-color=""></div>
    </div>
    <button type="button" class="tanbo-color-picker-to-palette">
      <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M558.4 34.24a480 480 0 0 0-139.2 947.84h4.48a121.92 121.92 0 0 0 135.68-157.12C523.84 711.04 593.92 672 643.2 672h115.2c398.4 0 229.44-597.12-200-637.76zM160 384a96 96 0 1 1 96 96 96 96 0 0 1-96-96z m128 384a96 96 0 1 1 96-96 96 96 0 0 1-96 96z m224-448a96 96 0 1 1 96-96 96 96 0 0 1-96 96z m256 160a96 96 0 1 1 96-96 96 96 0 0 1-96 96z" fill="#231F20"></path></svg> ${paletteText}
    </button>
  </div>
</div>
<div class="tanbo-color-picker-menu">
  <div class="tanbo-color-picker-back-btn-wrap">
    <button type="button" class="tanbo-color-picker-back-btn">
      <svg style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M497.92 165.12L422.4 89.6 0 512l422.4 422.4 75.52-75.52L151.04 512z"></path></svg>${backText}
    </button>
  </div>
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
  <div class="tanbo-color-picker-btn-wrap">
    <button type="button" class="tanbo-color-picker-btn">${btnText}</button>
  </div>
</div>
`
}

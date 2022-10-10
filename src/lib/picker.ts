import {
  any2Hsl,
  ColorHSL, ColorHSV, ColorRGB, ColorRGBA, getColorEncoding, hex2Hsl, hex2Hsv, hex2Rgb,
  hsl2Hex, hsl2Hsv, hsl2Rgb, hsv2Hex, hsv2Hsl, hsv2Rgb, normalizeHex, parseCss, rgb2Hex, rgb2Hsl, rgb2Hsv
} from '@tanbo/color';
import { Subject } from '@tanbo/stream';

import { template } from './template';

export interface PickerOptions {
  mainColors?: string[];
  colors?: string[];
  value?: string;
  btnText?: string;
  paletteText?: string;
}

export class Picker {
  onChange = new Subject<Picker>()
  onSelected = new Subject<Picker>()
  readonly host = document.createElement('div');

  set hex(color: string) {
    const c = color ? normalizeHex(color) : null;
    if (c) {
      this.empty = false;
      this._hex = c;
      this._hsl = hex2Hsl(c);
      this._rgb = hex2Rgb(c);
      this._hsv = hex2Hsv(c);
      this._rgba = {
        ...this._rgb,
        a: this.resetAlpha ? 1 : this._rgba.a
      }
    } else {
      this.empty = true;
    }
    this.resetAlpha = true;
    this.render();
  }

  get hex() {
    return this.empty ? null : this._hex;
  }

  set hsl(color: ColorHSL) {
    if (!color || typeof color.h !== 'number' || typeof color.s !== 'number' || typeof color.l !== 'number') {
      this.empty = true;
    } else {
      this.empty = false;
      this._hsl = color;
      this._hex = hsl2Hex(color);
      this._hsv = hsl2Hsv(color);
      this._rgb = hsl2Rgb(color);
      this._rgba = {
        ...this._rgb,
        a: this.resetAlpha ? 1 : this._rgba.a
      }
    }
    this.resetAlpha = true;
    this.render();
  }

  get hsl(): ColorHSL {
    return this.empty ? null : this._hsl;
  }

  set rgb(color: ColorRGB) {
    if (!color || typeof color.r !== 'number' || typeof color.g !== 'number' || typeof color.b !== 'number') {
      this.empty = true;
    } else {
      this.empty = false;
      this._rgb = color;
      this._rgba = {
        ...color,
        a: this.resetAlpha ? 1 : this._rgba.a
      };
      this._hsl = rgb2Hsl(color);
      this._hex = rgb2Hex(color);
      this._hsv = rgb2Hsv(color);
    }

    this.resetAlpha = true;
    this.render();
  }

  get rgb(): ColorRGB {
    return this.empty ? null : this._rgb;
  }

  set rgba(color: ColorRGBA) {
    if (!color ||
      typeof color.r !== 'number' ||
      typeof color.g !== 'number' ||
      typeof color.b !== 'number' ||
      typeof color.a !== 'number') {
      this.empty = true;
    } else {
      this.empty = false;
      this._rgba = color;
      this._hsl = rgb2Hsl(color);
      this._hex = rgb2Hex(color);
      this._hsv = rgb2Hsv(color);
    }
    this.render();
  }

  get rgba() {
    return this.empty ? null : this._rgba;
  }

  set hsv(color: ColorHSV) {
    if (!color || typeof color.h !== 'number' || typeof color.s !== 'number' || typeof color.v !== 'number') {
      this.empty = true;
    } else {
      this.empty = false;
      this._hsv = color;
      this._hex = hsv2Hex(color);
      this._hsl = hsv2Hsl(color);
      this._rgb = hsv2Rgb(color);
      this._rgba = {
        ...this._rgb,
        a: this.resetAlpha ? 1 : this._rgba.a
      };
    }
    this.resetAlpha = true;
    this.render();
  }

  get hsv() {
    return this.empty ? null : this._hsv;
  }

  private _hex: string;
  private _hsl: ColorHSL;
  private _rgb: ColorRGB;
  private _hsv: ColorHSV;

  private _rgba: ColorRGBA;

  private empty = false;
  private resetAlpha = true;

  private container: HTMLElement;
  private valueViewer: HTMLElement;
  private palette: HTMLElement;
  private palettePoint: HTMLElement;
  private hueBar: HTMLElement;
  private huePoint: HTMLElement;
  private checkBtn: HTMLElement;
  private alphaBar: HTMLElement;
  private alphaValue: HTMLElement;
  private alphaPoint: HTMLElement;

  private inputsWrap: HTMLElement;
  private hslInputs: HTMLInputElement[];
  private rgbInputs: HTMLInputElement[];
  private hexInput: HTMLInputElement;
  private colorWrapper: HTMLElement;
  private switchBtn: HTMLElement;
  private menu: HTMLElement;
  private backBtn: HTMLElement;

  private writing = false;

  private colorElements: HTMLElement[] = []

  private mainColors: HTMLElement
  private colors: HTMLElement

  constructor(selector: string | HTMLElement, options: PickerOptions = {}) {
    if (typeof selector === 'string') {
      this.container = document.querySelector(selector);
    } else {
      this.container = selector;
    }
    this.host.classList.add('tanbo-color-picker');
    this.host.innerHTML = template(options.btnText || '确定', options.paletteText || '调色盘');

    this.container.appendChild(this.host);
    this.valueViewer = this.host.querySelector('.tanbo-color-picker-value-color');
    this.palette = this.host.querySelector('.tanbo-color-picker-palette');
    this.palettePoint = this.host.querySelector('.tanbo-color-picker-palette-point');
    this.hueBar = this.host.querySelector('.tanbo-color-picker-hue-bar');
    this.huePoint = this.host.querySelector('.tanbo-color-picker-hue-pointer');
    this.checkBtn = this.host.querySelector('.tanbo-color-picker-btn');
    this.alphaBar = this.host.querySelector('.tanbo-color-picker-viewer-alpha-bar');
    this.alphaValue = this.host.querySelector('.tanbo-color-picker-viewer-alpha-value');
    this.alphaPoint = this.host.querySelector('.tanbo-color-picker-viewer-alpha-pointer');

    this.inputsWrap = this.host.querySelector('.tanbo-color-picker-inputs');
    this.hslInputs = Array.from(this.host.querySelectorAll('.tanbo-color-picker-hsl input'));
    this.rgbInputs = Array.from(this.host.querySelectorAll('.tanbo-color-picker-rgb input'));
    this.hexInput = this.host.querySelector('.tanbo-color-picker-hex input');
    this.colorWrapper = this.host.querySelector('.tanbo-color-picker-preset');
    this.switchBtn = this.host.querySelector('.tanbo-color-picker-to-palette');
    this.menu = this.host.querySelector('.tanbo-color-picker-menu');
    this.backBtn = this.host.querySelector('.tanbo-color-picker-back-btn');

    this.mainColors = this.colorWrapper.children[0] as HTMLElement
    this.colors = this.colorWrapper.children[1] as HTMLElement

    if (Array.isArray(options.mainColors)) {
      this.addColor(options.mainColors, this.mainColors)
    }
    if (Array.isArray(options.colors)) {
      this.addColor(options.colors, this.colors)
    }
    this.hex = options.value || '#f00';

    this.bindingEvents();
  }

  private addColor(colors: string[], host: HTMLElement) {
    colors.forEach(color => {
      const el = document.createElement('div')
      el.style.background = color;
      el.setAttribute('data-color', color);
      this.colorElements.push(el)
      host.append(el)
    });
  }

  private render() {
    if (!this.writing) {
      if (this.empty) {
        this.hslInputs[0].value = '';
        this.hslInputs[1].value = '';
        this.hslInputs[2].value = '';

        this.rgbInputs[0].value = '';
        this.rgbInputs[1].value = '';
        this.rgbInputs[2].value = '';

        this.hexInput.value = '';
        this.alphaValue.innerText = '1';
      } else {
        this.hslInputs[0].value = this.hsl.h + '';
        this.hslInputs[1].value = this.hsl.s + '';
        this.hslInputs[2].value = this.hsl.l + '';

        this.rgbInputs[0].value = this.rgb.r + '';
        this.rgbInputs[1].value = this.rgb.g + '';
        this.rgbInputs[2].value = this.rgb.b + '';

        this.hexInput.value = this.hex;
        this.alphaValue.innerText = Number(this.rgba.a.toFixed(2)) + '';
      }
    }

    this.palette.classList.remove('tanbo-color-picker-palette-empty');
    this.palette.style.background = `linear-gradient(to right, #fff, hsl(${this._hsv.h}, 100%, 50%))`;
    this.palettePoint.style.left = `calc(${this._hsv.s}% - 6px)`;
    this.palettePoint.style.top = `calc(${100 - this._hsv.v}% - 6px)`;
    this.huePoint.style.top = `calc(${this._hsv.h / 360 * 100}% - 4px)`;

    if (this.empty) {
      this.palette.classList.add('tanbo-color-picker-palette-empty');
      this.palette.style.background = '';
      this.valueViewer.style.background = '';
      this.alphaBar.style.background = '';
      this.alphaPoint.style.left = '100%';
    } else {
      this.valueViewer.style.background = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`;
      this.palette.classList.remove('tanbo-color-picker-palette-empty');
      this.palette.style.background = `linear-gradient(to right, #fff, hsl(${this._hsv.h}, 100%, 50%))`;
      this.alphaBar.style.background = `linear-gradient(to right, transparent, ${this.hex})`;
      this.alphaPoint.style.left = (this.rgba.a || 0) * 100 + '%';
    }
    this.colorElements.forEach(el => {
      const v = el.getAttribute('data-color') || ''
      const hsl = any2Hsl(v)
      if (hsl === 'unknown') {
        el.classList.remove('tanbo-color-picker-current')
        return
      }
      if (hsl.l === this.hsl.l && hsl.s === this.hsl.s && hsl.h === this.hsl.h) {
        el.classList.add('tanbo-color-picker-current')
      } else {
        el.classList.remove('tanbo-color-picker-current')
      }
    })
  }

  private bindingEvents() {
    this.bindPaletteEvent();
    this.bindHueBarEvent();
    this.bindAlphaEvent();
    this.bindInputsEvent();
    this.bindSelectedEvent();
    this.bindColorOptionsEvent();
    this.bindSwitchEvent()
  }

  private bindSwitchEvent() {
    this.switchBtn.addEventListener('click', () => {
      this.host.classList.add('tanbo-color-picker-show-palette')
    })
    this.backBtn.addEventListener('click', () => {
      this.host.classList.remove('tanbo-color-picker-show-palette')
    })
  }

  private bindAlphaEvent() {
    const update = (ev: MouseEvent) => {
      const position = this.alphaBar.getBoundingClientRect();
      let offsetX = ev.clientX - position.left;

      offsetX = Math.max(0, offsetX);
      offsetX = Math.min(position.width, offsetX);
      this.rgba = {
        ...this._rgba,
        a: offsetX / position.width
      };
      this.onChange.next(this);
    };

    const mouseDownFn = (ev: MouseEvent) => {
      update(ev);
      document.addEventListener('mousemove', mouseMoveFn);
      document.addEventListener('mouseup', mouseUpFn);
    };

    const mouseMoveFn = (ev: MouseEvent) => {
      update(ev);
    };

    const mouseUpFn = () => {
      document.removeEventListener('mousemove', mouseMoveFn);
      document.removeEventListener('mouseup', mouseUpFn);
    };

    this.alphaBar.addEventListener('mousedown', mouseDownFn);
  }

  private bindPaletteEvent() {
    const update = (ev: MouseEvent) => {
      const position = this.palette.getBoundingClientRect();
      const offsetX = ev.clientX - position.left;
      const offsetY = ev.clientY - position.top;

      let s = offsetX / 130 * 100;
      let v = 100 - offsetY / 130 * 100;

      s = Math.max(0, s);
      s = Math.min(100, s);

      v = Math.max(0, v);
      v = Math.min(100, v);
      this.resetAlpha = false;
      this.hsv = {
        h: this._hsv.h,
        s,
        v
      };
      this.onChange.next(this);
    };

    const mouseDownFn = (ev: MouseEvent) => {
      update(ev);
      document.addEventListener('mousemove', mouseMoveFn);
      document.addEventListener('mouseup', mouseUpFn);
    };

    const mouseMoveFn = (ev: MouseEvent) => {
      update(ev);
    };

    const mouseUpFn = () => {
      document.removeEventListener('mousemove', mouseMoveFn);
      document.removeEventListener('mouseup', mouseUpFn);
    };

    this.palette.addEventListener('mousedown', mouseDownFn);
  }

  private bindHueBarEvent() {
    const update = (ev: MouseEvent) => {
      const position = this.hueBar.getBoundingClientRect();
      let offsetY = ev.clientY - position.top;

      offsetY = Math.max(0, offsetY);
      offsetY = Math.min(100, offsetY);

      const h = 360 / 100 * offsetY;

      this.resetAlpha = false;
      this.hsv = {
        h,
        s: this._hsv.s,
        v: this._hsv.v
      };
      this.onChange.next(this);
    };

    const mouseDownFn = (ev: MouseEvent) => {
      update(ev);
      document.addEventListener('mousemove', mouseMoveFn);
      document.addEventListener('mouseup', mouseUpFn);
    };

    const mouseMoveFn = (ev: MouseEvent) => {
      update(ev);
    };

    const mouseUpFn = () => {
      document.removeEventListener('mousemove', mouseMoveFn);
      document.removeEventListener('mouseup', mouseUpFn);
    };

    this.hueBar.addEventListener('mousedown', mouseDownFn);
  }

  private bindInputsEvent() {
    const updateByHSL = (h: number, s: number, l: number) => {
      this.hex = hsl2Hex({ h, s, l });
      this.onChange.next(this);
    };
    const updateByRGB = (r: number, g: number, b: number) => {
      this.hex = rgb2Hex({ r, g, b });
      this.onChange.next(this);
    };
    this.inputsWrap.addEventListener('input', (ev: any) => {
      this.writing = true;
      const el = ev.target;
      const model = el.getAttribute('data-model');
      if (el.type === 'number') {
        const min = +el.min;
        const max = +el.max;

        el.value = Math.max(el.value, min);
        el.value = Math.min(el.value, max);
      }

      const { h, s, l } = this.hsl;
      const { r, g, b } = this.rgb;
      switch (model) {
        case 'H':
          updateByHSL(el.value, s, l);
          break;
        case 'S':
          updateByHSL(h, el.value, l);
          break;
        case 'L':
          updateByHSL(h, s, el.value);
          break;
        case 'R':
          updateByRGB(el.value, g, b);
          break;
        case 'G':
          updateByRGB(r, el.value, b);
          break;
        case 'B':
          updateByRGB(r, g, el.value);
          break;
        case 'HEX':
          if (/^#(([0-9a-f]){3}){1,2}$/i.test(el.value)) {
            this.hex = el.value;
            this.onChange.next(this);
          }
          break;
      }
      this.writing = false;
    });
  }

  private bindSelectedEvent() {
    this.checkBtn.addEventListener('click', () => {
      this.host.classList.remove('tanbo-color-picker-show-palette')
      this.onSelected.next(this);
    });
  }

  private bindColorOptionsEvent() {
    this.colorWrapper.addEventListener('click', (ev: MouseEvent) => {
      const target = ev.target as HTMLElement
      if (!target.hasAttribute('data-color')) {
        return
      }
      const c = target.getAttribute('data-color');
      if (/^rgba/.test(c)) {
        this.rgba = parseCss(c) as ColorRGBA;
      } else {
        this.hex = c;
      }
      this.onChange.next(this);
    });
  }
}

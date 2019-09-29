import {
  ColorHSL, ColorHSV, ColorRGB, hex2Hsl, hex2Hsv, hex2Rgb,
  hsl2Hex, hsl2Hsv, hsv2Hex, normalizeHex, rgb2Hex, rgb2Hsv
} from '@tanbo/color';

import { template } from './template';

export interface Options {
  colors?: string[];
  value?: string;
}

export class Picker {
  onChange: (event: this) => void;
  onSelected: (event: this) => void;
  readonly host = document.createElement('div');

  set hex(color: string) {
    this.hsv = hex2Hsv(normalizeHex(color));
  }

  get hex() {
    return this._hex;
  }

  set hsl(color: ColorHSL) {
    this.hsv = hsl2Hsv(color);
  }

  get hsl(): ColorHSL {
    return this._hsl;
  }

  set rgb(color: ColorRGB) {
    this.hsv = rgb2Hsv(color);
  }

  get rgb(): ColorRGB {
    return this._rgb;
  }

  set hsv(color: ColorHSV) {
    this._hsv = color;
    this._hex = hsv2Hex(color);
    this._hsl = hex2Hsl(this._hex);
    this._rgb = hex2Rgb(this._hex);

    this.render(color);
  }

  get hsv() {
    return this._hsv;
  }

  private _hex: string;
  private _hsl: ColorHSL;
  private _rgb: ColorRGB;

  private _hsv: ColorHSV;
  private container: HTMLElement;
  private valueViewer: HTMLElement;
  private palette: HTMLElement;
  private palettePoint: HTMLElement;
  private hueBar: HTMLElement;
  private huePoint: HTMLElement;
  private checkBtn: HTMLElement;

  private inputsWrap: HTMLElement;
  private hslInputs: HTMLInputElement[];
  private rgbInputs: HTMLInputElement[];
  private hexInput: HTMLInputElement;

  private writing = false;

  constructor(selector: string | HTMLElement, options: Options = {}) {
    if (typeof selector === 'string') {
      this.container = document.querySelector(selector);
    } else {
      this.container = selector;
    }
    this.host.classList.add('tanbo-color-picker');
    this.host.innerHTML = template;

    if (Array.isArray(options.colors)) {
      this.initColorOptions(options.colors);
    }

    this.container.appendChild(this.host);
    this.valueViewer = this.host.querySelector('.tanbo-color-picker-value');
    this.palette = this.host.querySelector('.tanbo-color-picker-palette');
    this.palettePoint = this.host.querySelector('.tanbo-color-picker-palette-point');
    this.hueBar = this.host.querySelector('.tanbo-color-picker-hue-bar');
    this.huePoint = this.host.querySelector('.tanbo-color-picker-hue-pointer');
    this.checkBtn = this.host.querySelector('.tanbo-color-picker-btn');

    this.inputsWrap = this.host.querySelector('.tanbo-color-picker-inputs');
    this.hslInputs = Array.from(this.host.querySelectorAll('.tanbo-color-picker-hsl input'));
    this.rgbInputs = Array.from(this.host.querySelectorAll('.tanbo-color-picker-rgb input'));
    this.hexInput = this.host.querySelector('.tanbo-color-picker-hex input');

    this.hex = options.value || '#f00';

    this.bindingEvents();
  }

  private render(color: ColorHSV) {
    if (!this.writing) {
      this.hslInputs[0].value = this.hsl.h + '';
      this.hslInputs[1].value = this.hsl.s + '';
      this.hslInputs[2].value = this.hsl.l + '';

      this.rgbInputs[0].value = this.rgb.r + '';
      this.rgbInputs[1].value = this.rgb.g + '';
      this.rgbInputs[2].value = this.rgb.b + '';

      this.hexInput.value = this.hex;
    }

    this.valueViewer.style.background = this.hex;

    this.palette.style.background = `linear-gradient(to right, #fff, hsl(${color.h}, 100%, 50%))`;
    this.palettePoint.style.left = `calc(${color.s}% - 6px)`;
    this.palettePoint.style.top = `calc(${100 - color.v}% - 6px)`;
    this.huePoint.style.top = `calc(${color.h / 360 * 100}% - 4px)`;
  }

  private bindingEvents() {
    this.bindPaletteEvent();
    this.bindHueBarEvent();
    this.bindInputsEvent();
    this.bindSelectedEvent();
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

      this.hsv = {
        h: this.hsv.h,
        s,
        v
      };
      this.change();
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

      this.hsv = {
        h,
        s: this.hsv.s,
        v: this.hsv.v
      };
      this.change();
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
      this.hex = hsl2Hex({h, s, l});
      this.change();
    };
    const updateByRGB = (r: number, g: number, b: number) => {
      this.hex = rgb2Hex({r, g, b});
      this.change();

    };
    this.inputsWrap.addEventListener('input', (ev: any) => {
      this.writing = true;
      const el = ev.target;
      const model = el.dataset.model;
      if (el.type === 'number') {
        const min = +el.min;
        const max = +el.max;

        el.value = Math.max(el.value, min);
        el.value = Math.min(el.value, max);
      }

      const {h, s, l} = this.hsl;
      const {r, g, b} = this.rgb;
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
            this.change();
          }
          break;
      }
      this.writing = false;
    });
  }

  private bindSelectedEvent() {
    this.checkBtn.addEventListener('click', () => {
      if (typeof this.onSelected === 'function') {
        this.onSelected(this);
      }
    });
  }

  private initColorOptions(colors: string[]) {
    const colorGroup = this.host.querySelector('.tanbo-color-picker-swatches');
    const nodes = colors.map(color => {
      const el = document.createElement('div');
      el.style.background = color;
      colorGroup.appendChild(el);
      return {
        el,
        color
      }
    });
    colorGroup.addEventListener('click', (ev: Event) => {
      for (const item of nodes) {
        if (item.el === ev.target) {
          this.hex = item.color.toLowerCase();
          this.change();
        }
      }
    });
  }

  private change() {
    if (typeof this.onChange === 'function') {
      this.onChange(this);
    }
  }
}
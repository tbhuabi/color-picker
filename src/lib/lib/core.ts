import { template } from './template';
import {
  any2Hsl,
  hsl2Hex, hsl2Hsv,
  hsl2Rgb, hsv2Hex, rgb2Hsv
} from '@tanbo/color';

export interface Options {
  colors?: string[];
  value?: string;
}

export class Core {
  readonly host = document.createElement('div');

  set value(v: string) {
    this._value = v;
    this.render(v);
  }

  get value() {
    return this._value;
  }

  private _value = '#fff';
  private container: HTMLElement;
  private valueViewer: HTMLElement;
  private palette: HTMLElement;
  private palettePoint: HTMLElement;
  private hue: HTMLElement;
  private huePoint: HTMLElement;

  private hslInputs: HTMLInputElement[];
  private rgbInputs: HTMLInputElement[];
  private hexInput: HTMLInputElement;

  constructor(selector: string | HTMLElement, options: Options = {}) {
    if (typeof selector === 'string') {
      this.container = document.querySelector(selector);
    } else {
      this.container = selector;
    }
    this.host.classList.add('tanbo-color-picker');
    this.host.innerHTML = template;

    if (Array.isArray(options.colors)) {
      const colorGroup = this.host.querySelector('.tanbo-color-picker-swatches');
      const nodes = options.colors.map(color => {
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
            this.render(item.color);
          }
        }
      });
    }

    this.container.appendChild(this.host);
    this.valueViewer = this.host.querySelector('.tanbo-color-picker-value');
    this.palette = this.host.querySelector('.tanbo-color-picker-palette');
    this.palettePoint = this.host.querySelector('.tanbo-color-picker-palette-point');
    this.hue = this.host.querySelector('.tanbo-color-picker-hue-pointer-wrap');
    this.huePoint = this.host.querySelector('.tanbo-color-picker-hue-pointer');

    this.hslInputs = Array.from(this.host.querySelectorAll('.tanbo-color-picker-hsl input'));
    this.rgbInputs = Array.from(this.host.querySelectorAll('.tanbo-color-picker-rgb input'));
    this.hexInput = this.host.querySelector('.tanbo-color-picker-hex input');

    this.value = options.value || '#00f';
  }

  private render(color: string) {
    const hsl = any2Hsl(color);
    if (hsl === 'unknown') {
      return;
    }
    const rgb = hsl2Rgb(hsl);
    const hsb = hsl2Hsv(hsl);
    const hex = hsl2Hex(hsl);

    this.hslInputs[0].value = hsl.h + '';
    this.hslInputs[1].value = hsl.s + '';
    this.hslInputs[2].value = hsl.l + '';

    this.rgbInputs[0].value = rgb.r + '';
    this.rgbInputs[1].value = rgb.g + '';
    this.rgbInputs[2].value = rgb.b + '';

    this.hexInput.value = hex;
    this.valueViewer.style.background = color;
    this.palette.style.background = `linear-gradient(to right, #fff, hsl(${hsb.h}, 100%, 50%))`;
    this.palettePoint.style.left = `calc(${hsb.s}% - 6px)`;
    this.palettePoint.style.top = `calc(${100 - hsb.v}% - 6px)`;
    this.huePoint.style.top = `calc(${hsb.h / 360 * 100}% - 4px)`;
  }
}

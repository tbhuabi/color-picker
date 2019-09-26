import { template } from './template';

export interface Options {
  colors?: string[];
}

export class Core {
  readonly host = document.createElement('div');

  set value(v: string) {
    this._value = v;

  }

  get value() {
    return this._value;
  }

  private _value = '#fff';
  private container: HTMLElement;

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
  }

  private render(color: string) {

  }
}

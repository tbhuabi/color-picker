import { Picker, PickerOptions } from './lib/picker';
import './assets/index.scss'

export function createPicker(selector: string | HTMLElement, options: PickerOptions = {}) {
  return new Picker(selector, {
    mainColors: [
      '#000', '#333', '#444', '#555', '#666', '#777', '#888',
      '#999', '#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#fff',
    ],
    colors: [
      '#fec6c2', '#fee5c3', '#fefcc3', '#baf6c4', '#c3ebfe', '#c3cbfe', '#e1caff',
      '#fc8e88', '#fccc88', '#fcf888', '#76ec8a', '#88d8fc', '#97a4fb', '#c098f4',
      '#ff6666', '#ffb151', '#fada3a', '#18c937', '#3aaafa', '#6373e2', '#a669f7',
      '#f63030', '#f88933', '#deb12a', '#038e23', '#1276cc', '#3f52ce', '#8838ed',
      '#c60000', '#d86912', '#b88811', '#086508', '#144c93', '#1b2eaa', '#6117bf',
    ],
    ...options
  });
}

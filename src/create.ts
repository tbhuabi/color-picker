import { Picker, PickerOptions } from './lib/picker';

export function createPicker(selector: string | HTMLElement, options: PickerOptions = {}) {
  return new Picker(selector, {
    mainColors: [
      '#f00', '#f80', '#ff0', '#0f0', '#0ff', '#00f', '#f0f',
      '#fff', '#eee', '#ccc', '#999', '#777', '#444', '#000',
    ],
    colors: [
      '#ffeeee', '#ffdbb3', '#ffff9f', '#bfffbf', '#d0ffff', '#ccccff', '#ffc9ff',
      '#dc9494', '#daaa73', '#dcdc72', '#7cd87c', '#86d8d8', '#8c8cda', '#d07ed0',
      '#bb5b5b', '#bf894b', '#b9b943', '#53bd53', '#43a3a3', '#5656b3', '#a545a5',
      '#9d2e2e', '#9f6726', '#949420', '#2b942b', '#238686', '#252582', '#801f80',
      '#882200', '#724007', '#6a6a05', '#086508', '#035959', '#080866', '#530253',
    ],
    ...options
  });
}

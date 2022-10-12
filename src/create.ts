import { Picker, PickerOptions } from './lib/picker';

export function createPicker(selector: string | HTMLElement, options: PickerOptions = {}) {
  return new Picker(selector, {
    mainColors: [
      '#000', '#333', '#444', '#555', '#666', '#777', '#888',
      '#999', '#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#fff',
    ],
    colors: [
      '#ffeeee', '#ffebd4', '#ffff9f', '#bfffbf', '#d0ffff', '#ccccff', '#ffc9ff',
      '#dc9494', '#e7bd8d', '#dcdc72', '#7cd87c', '#86d8d8', '#8c8cda', '#d07ed0',
      '#bb5b5b', '#bf894b', '#b9b943', '#53bd53', '#43a3a3', '#5656b3', '#a545a5',
      '#9d2e2e', '#8f5718', '#949420', '#2b942b', '#238686', '#252582', '#801f80',
      '#882200', '#623604', '#6a6a05', '#086508', '#035959', '#080866', '#530253',
    ],
    ...options
  });
}

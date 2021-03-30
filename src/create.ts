import { Picker, PickerOptions } from './lib/picker';

export function createPicker(selector: string | HTMLElement, options: PickerOptions = {}) {
  return new Picker(selector, {
    colors: ['#f8f8f9', '#e9eaec', '#dddee1', '#bbbec4', '#80848f', '#495060', '#1c2838', '#e74f5e', '#ff9900', '#15bd9a', '#6ad1ec', '#1296db'],
    ...options
  });
}

import { Core } from './lib/core';

export function createPicker(selector: string | HTMLElement) {
  return new Core(selector, {
    colors: ['#1296db', '#6ad1ec', '#15bd9a', '#ff9900', '#E74F5E', '#1c2838', '#495060', '#80848f', '#bbbec4', '#dddee1', '#e9eaec', '#f8f8f9']
  });
}

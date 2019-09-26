export function getPosition(el: HTMLElement): { left: number, top: number } {
  let left = 0;
  let top = 0;
  while (el.offsetParent) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement;
  }
  return {
    left,
    top
  }
}

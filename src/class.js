export default class Letters {
  constructor(lang, arr) {
    this.lang = lang;
    this.arr = arr;
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    const container = document.createElement('div');
    container.classList.add('container');

    const textField = document.createElement('textarea');
    textField.classList.add('text-field');

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    this.arr.forEach((letter) => {
      const child = document.createElement('button');
      child.innerText = String(Object.values(letter)[0]);
      child.dataset.dataKey = String(Object.keys(letter)[0]);
      if (child.dataset.dataKey === 'Backspace') {
        child.classList.add('width');
      } else if (child.dataset.dataKey === 'CapsLock') {
        child.classList.add('width-more');
      } else if (child.dataset.dataKey === 'Tab' || child.dataset.dataKey === 'Enter') {
        child.classList.add('width-midle');
        if (child.dataset.dataKey === 'Enter') {
          child.classList.add('enter');
        }
      } else if (child.dataset.dataKey === 'ShiftLeft' || child.dataset.dataKey === 'ShiftRight') {
        child.classList.add('shift');
      } else if (child.dataset.dataKey === 'Space') {
        child.classList.add('space');
      } else if (child.dataset.dataKey === 'ArrowDown') {
        child.classList.add('down');
      }
      child.classList.add('keyboard__key');
      keyboard.appendChild(child);
    });

    container.append(textField);
    container.append(keyboard);
    window.document.body.prepend(container);
  }
}

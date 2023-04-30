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
      child.dataset.Key = String(Object.keys(letter)[0]);
      if (child.dataset.Key === 'Backspace') {
        child.classList.add('width');
      } else if (child.dataset.Key === 'CapsLock') {
        child.classList.add('caps-lock');
      } else if (child.dataset.Key === 'Tab' || child.dataset.dataKey === 'Enter') {
        child.classList.add('width-midle');
        if (child.dataset.Key === 'Enter') {
          child.classList.add('enter');
        }
      } else if (child.dataset.Key === 'ShiftLeft' || child.dataset.dataKey === 'ShiftRight') {
        child.classList.add('shift');
      } else if (child.dataset.Key === 'Space') {
        child.classList.add('space');
      } else if (child.dataset.Key === 'ArrowDown') {
        child.classList.add('down');
      }
      child.classList.add('keyboard__key');
      keyboard.appendChild(child);
    });

    container.append(textField);
    container.append(keyboard);
    window.document.body.prepend(container);
    document.querySelector('.text-field').addEventListener('keydown', this.logDownKey);
    document.querySelector('.text-field').addEventListener('keyup', this.logUpKey);
  }

  // eslint-disable-next-line class-methods-use-this
  logDownKey(e) {
    if (e.code === 'CapsLock') {
      const capsLock = document.querySelector('.caps-lock');
      if (capsLock.classList.contains('active')) {
        capsLock.classList.remove('active');
      } else {
        capsLock.classList.add('active');
      }
    } else if (e.code === 'Tab') {
      e.preventDefault();
      document.querySelector('.text-field').value += '\t';
    }
    document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.add('keyboard__key-active');
  }

  // eslint-disable-next-line class-methods-use-this
  logUpKey(e) {
    document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.remove('keyboard__key-active');
  }
}

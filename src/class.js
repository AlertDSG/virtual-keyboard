export default class Letters {
  constructor(lang, data) {
    this.data = data;
    this.lang = lang;
    this.arr = this.data[this.lang];
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
      child.innerText = String(...Object.values(letter));
      child.dataset.Key = String(...Object.keys(letter));
      if (child.dataset.Key === 'Backspace') {
        child.classList.add('width');
      } else if (child.dataset.Key === 'CapsLock') {
        child.classList.add('caps-lock');
        child.classList.add('caps-lock-passive');
      } else if (child.dataset.Key === 'Tab' || child.dataset.Key === 'Enter') {
        child.classList.add('width-midle');
        if (child.dataset.Key === 'Enter') {
          child.classList.add('enter');
          child.classList.add('enter-passive');
        }
      } else if (child.dataset.Key === 'ShiftLeft' || child.dataset.Key === 'ShiftRight') {
        child.classList.add('shift');
      } else if (child.dataset.Key === 'Space') {
        child.classList.add('space');
      } else if (child.dataset.Key === 'ArrowDown') {
        child.classList.add('down');
      } else if (child.dataset.Key.includes('BracketRight') || child.dataset.Key.includes('Key') || child.dataset.Key.includes('Backquote') || child.dataset.Key.includes('BracketLeft') || child.dataset.Key.includes('Semicolon') || child.dataset.Key.includes('Quote') || child.dataset.Key.includes('Comma') || child.dataset.Key.includes('Period')) {
        child.classList.add('key-low');
      }
      child.classList.add('keyboard__key');
      keyboard.appendChild(child);
    });
    container.append(textField);
    container.append(keyboard);
    window.document.body.prepend(container);
  }

  // eslint-disable-next-line class-methods-use-this
  logDownKey(e) {
    if (e.code === 'CapsLock') {
      const capsLock = document.querySelector('.caps-lock');
      let keyActive;
      let keyPassive;

      if (capsLock.classList.contains('caps-lock-passive')) {
        capsLock.classList.remove('caps-lock-passive');
        capsLock.classList.add('caps-lock-active');
        keyActive = 'key-up';
        keyPassive = 'key-low';
      } else {
        capsLock.classList.add('caps-lock-passive');
        capsLock.classList.remove('caps-lock-active');
        keyActive = 'key-low';
        keyPassive = 'key-up';
      }
      document.querySelectorAll(`.${keyPassive}`).forEach((el) => {
        el.classList.add(keyActive);
        el.classList.remove(keyPassive);
      });
    } else if (e.code === 'Tab') {
      e.preventDefault();
      document.querySelector('.text-field').value += '\t';
    } else if (e.code === 'Enter') {
      document.querySelector('.enter').classList.remove('enter-passive');
      document.querySelector('.enter').classList.add('enter-active');
    } else if (e.code === 'AltLeft') {
      e.preventDefault();
    }
    document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.add('keyboard__key-active');
  }

  // eslint-disable-next-line class-methods-use-this
  logUpKey(e) {
    if (e.code === 'Enter') {
      document.querySelector('.enter').classList.add('enter-passive');
      document.querySelector('.enter').classList.remove('enter-active');
    }
    document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.remove('keyboard__key-active');
  }
}

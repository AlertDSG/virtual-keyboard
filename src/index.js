// eslint-disable-next-line import/extensions
import data from './db.js';

let lang = 'ru';
let value;

const arr = ['Backspace', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ContextMenu', 'ControlRight', 'ShiftLeft', 'Enter', 'CapsLock', 'ShiftRight'];

function getLocal() {
  if (localStorage.getItem('data')) {
    const localString = localStorage.getItem('data');
    const fromLocal = JSON.parse(localString);
    lang = fromLocal.lang;
    value = fromLocal.value;
  }
}

function setStorage() {
  const localData = JSON.stringify({ lang, value });
  localStorage.setItem('data', localData);
}

function logDownKey(e) {
  if (!document.querySelector(`.keyboard__key[data--Key=${e.code}]`)) {
    e.preventDefault();
    return;
  };

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
    document.querySelector('.text-field').value += '\n';
    document.querySelector('.enter').classList.remove('enter-passive');
    document.querySelector('.enter').classList.add('enter-active');
  } else if (e.code === 'AltLeft') {
    e.preventDefault();
    document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.add('keyboard__key-active');
  } else if (!arr.includes(e.code) && !document.querySelector(`.keyboard__key[data--Key=${e.code}]`)) {
    e.preventDefault();
    document.querySelector('.text-field').value += document.querySelector(`.keyboard__key[data--Key=${e.code}]`).innerText;
  }
  document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.add('keyboard__key-active');
}

function logUpKey(e) {
  if (!document.querySelector(`.keyboard__key[data--Key=${e.code}]`)) {
    e.preventDefault();
    return;
  }

  if (document.querySelector('.keyboard__key[data--Key=ShiftLeft]').classList.contains('keyboard__key-active') && document.querySelector('.keyboard__key[data--Key=AltLeft]').classList.contains('keyboard__key-active')) {
    lang = lang === 'ru' ? 'en' : 'ru';
    value = document.querySelector('.text-field').value;
    setStorage();
    document.querySelector('body').innerHTML = '';
    // eslint-disable-next-line no-use-before-define
    init();
  }
  if (e.code === 'Enter') {
    document.querySelector('.enter').classList.add('enter-passive');
    document.querySelector('.enter').classList.remove('enter-active');
  }
  document.querySelector(`.keyboard__key[data--Key=${e.code}]`).classList.remove('keyboard__key-active');
}

function init() {
  getLocal();

  const container = document.createElement('div');
  container.classList.add('container');

  const textField = document.createElement('textarea');
  textField.classList.add('text-field');
  if (value) {
    textField.value = value;
  }

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  [...data[lang]].forEach((letter) => {
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
    } else if (child.dataset.Key === 'ArrowUp') {
      child.classList.add('up');
    } else if (!arr.includes(child.dataset.Key)) {
      child.classList.add('key-low');
    }
    child.classList.add('keyboard__key');
    keyboard.appendChild(child);
  });
  container.append(textField);
  container.append(keyboard);
  window.document.body.prepend(container);
  document.querySelector('.text-field').addEventListener('keydown', logDownKey);
  document.querySelector('.text-field').addEventListener('keyup', logUpKey);

  document.querySelector('.text-field').focus();
}

window.addEventListener('DOMContentLoaded', init);

document.addEventListener('mousedown', (e) => {
  if (e.target.dataset.Key) {
    if (e.target.dataset.Key === 'Tab') {
      document.querySelector('.text-field').value += '\t';
      document.querySelector(`.keyboard__key[data--Key=${e.target.dataset.Key}]`).classList.add('keyboard__key-active');
    } else if (!arr.includes(e.target.dataset.Key)) {
      document.querySelector('.text-field').value += e.target.innerText;
      document.querySelector(`.keyboard__key[data--Key=${e.target.dataset.Key}]`).classList.add('keyboard__key-active');
    } else if (e.target.dataset.Key === 'Enter') {
      document.querySelector('.text-field').value += '\n';
      document.querySelector('.enter').classList.remove('enter-passive');
      document.querySelector('.enter').classList.add('enter-active');
    } else if (e.target.dataset.Key === 'AltLeft') {
      document.querySelector(`.keyboard__key[data--Key=${e.target.dataset.Key}]`).classList.add('keyboard__key-active');
    } else if (e.target.dataset.Key === 'Backspace') {
      const textField = document.querySelector('.text-field');
      textField.value = textField.value.slice(0, -1);
      document.querySelector(`.keyboard__key[data--Key=${e.target.dataset.Key}]`).classList.add('keyboard__key-active');
    } else {
      logDownKey({ code: e.target.dataset.Key, key: e.target.innerText });
    }
    document.querySelector(`.keyboard__key[data--Key=${e.target.dataset.Key}]`).classList.add('keyboard__key-active');
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.target.dataset.Key) {
    logUpKey({ code: e.target.dataset.Key, key: e.target.innerText });
    document.querySelector('.text-field').focus();
  }
});

window.addEventListener('beforeunload', () => {
  value = undefined;
  setStorage();
});

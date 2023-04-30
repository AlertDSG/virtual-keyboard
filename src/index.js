// eslint-disable-next-line import/extensions
import data from './db.js';
// eslint-disable-next-line import/extensions
import Letters from './class.js';

const lang = 'ru';
const keys = new Letters(lang, data[lang]);

window.addEventListener('DOMContentLoaded', keys.init.bind(keys));

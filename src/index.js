import initModel from './Model.js';
import app from './App';
import view from './View';
import update from './Update';

const DOMNode = document.getElementById('app');
console.log(DOMNode,'DOMNode');

app(initModel, view, update, DOMNode);
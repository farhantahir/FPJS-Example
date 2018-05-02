import initModel from './Model.js';
import app from './App';
import view from './View';
import update from './Update';

const DOMNode = document.getElementById('app');

app(initModel, view, update, DOMNode);
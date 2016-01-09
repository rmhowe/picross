import 'normalize.css';
import '../css/app.scss';

import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App/>, document.getElementById('app'));
});

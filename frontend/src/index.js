import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';

ReactDOM.render(
  <Suspense fallback="loading">
  <App />
  </Suspense>
  ,document.getElementById('root')
);

serviceWorker.unregister();

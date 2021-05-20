import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://test-app2.frontegg.com',
};
const headerImage = 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg';

ReactDOM.render(
  <FronteggProvider contextOptions={contextOptions} headerImage={headerImage}>
    <App />
  </FronteggProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

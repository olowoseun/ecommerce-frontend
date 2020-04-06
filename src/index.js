import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

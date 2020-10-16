import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Frame from './Containers/Frame';
import {BrowserRouter, Route} from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
  <BrowserRouter>
    <Route path='/' component={Frame} />
  </BrowserRouter>,
  document.getElementById('root')
);
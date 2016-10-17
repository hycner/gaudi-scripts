import React from 'react';
import {render} from 'react-dom';

import Routes from './_routes';
import './index.css';

let rootElem = document.getElementById('root');

render(
  <Routes />,
  rootElem
);

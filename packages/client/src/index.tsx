import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Greeting from './components/greeting';

const root = document.getElementById('root');

ReactDOM.render(
  <Greeting firstName="Joey Joe Joe" />,
  root
);

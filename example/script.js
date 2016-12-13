import {
  FunniesComponent as Component,
  Funnies,
} from '../src';

// Funnies class
let funnies = new Funnies();
document.getElementById('funnies').innerHTML = funnies.message();

// React
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Component />, document.getElementById('react'));

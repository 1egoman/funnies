import {
  FunniesComponent as Component,
  Funnies,
} from '../src';

// Funnies class
// This is the non-react version
document.addEventListener("DOMContentLoaded", function() {
  let funnies = new Funnies();
  function clickFunnyMessage() {
    document.getElementById('funnies').innerHTML = funnies.message();
  }

  document.getElementById('reload-funny-message').onclick = clickFunnyMessage;
  clickFunnyMessage();
});

// React
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Component />, document.getElementById('react'));

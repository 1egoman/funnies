import {
  FunniesComponent as Component,
  Funnies,
} from '../src';

// Funnies class
// This is the non-react version
document.addEventListener("DOMContentLoaded", function () {
  function construct(funnies, messageContainer, reloadButton) {
    function reload() {
      messageContainer.innerHTML = funnies.message();
    }
    reloadButton.onclick = reload;
    reload();
  }

  construct(
    new Funnies(),
    document.getElementById('funny-message-1'),
    document.getElementById('reload-funny-message-1')
  );
  construct(
    // This is a little different than the code specified, I know.
    // If I didn't pass some of these in particular, then it'd be hard to see that
    // the passed messages were even used.
    new Funnies([
      "foo", "bar", "baz", "hello", "world",
      "May the forks be with you",
      "Distracted by cat gifs",
      "Making sure all the i's have dots..",
      "Swapping time and space...",
      "Adjusting flux capacitor...",
    ], { appendMessages: false }),
    document.getElementById('funny-message-2'),
    document.getElementById('reload-funny-message-2')
  );
});

// React
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Component />, document.getElementById('react-1'));

let Wrapper = React.createClass({
  getInitialState() {
    return {
      interval: 2000,
      transitionTimeout: {
        enter: 200,
        leave: 200,
      },
    };
  },
  updateInterval(value) {
    this.setState({ interval: parseInt(value) });
  },
  updateTransitionTimeout(type, value) {
    if(type === 'enter') {
      this.setState({
        transitionTimeout: {
          enter: parseInt(value),
          leave: this.state.transitionTimeout.leave,
        }
      });
    }
    else if(type === 'leave') {
      this.setState({
        transitionTimeout: {
          enter: this.state.transitionTimeout.enter,
          leave: parseInt(value)
        }
      });
    }
  },
  render() {
    return <div className="funnies-wrapper">
      <Component
        key={this.state.interval}
        interval={this.state.interval}
        transitionTimeout={this.state.transitionTimeout}
      />
      <div className="funnies-wrapper--input-container">
        <span className="funnies-wrapper--input-container--name">
          Interval
        </span>
        <input
          type="range"
          min={0}
          max={8000}
          step={1000}
          value={this.state.interval}
          onChange={e => this.updateInterval(e.target.value)}
        />
        <span className="funnies-wrapper--input-container--interval">
          {this.state.interval / 1000} seconds
          {this.state.interval === 0 ? " (doesn't periodically change)" : ''}
        </span>
      </div>
      <div className="funnies-wrapper--input-container">
        <span className="funnies-wrapper--input-container--name">
          Transition Enter Timeout
        </span>
        <input
          type="range"
          min={100}
          max={3000}
          step={100}
          value={this.state.transitionTimeout.enter}
          onChange={e => this.updateTransitionTimeout('enter', e.target.value)}
        />
        <span>
          {this.state.transitionTimeout.enter / 1000} seconds
        </span>
      </div>
      <div className="funnies-wrapper--input-container">
        <span className="funnies-wrapper--input-container--name">
          Transition Leave Timeout
        </span>
        <input
          type="range"
          min={100}
          max={3000}
          step={100}
          value={this.state.transitionTimeout.leave}
          onChange={e => this.updateTransitionTimeout('leave', e.target.value)}
        />
        <span>
          {this.state.transitionTimeout.leave / 1000} seconds
        </span>
      </div>
      <h4>Code:</h4>
      <pre>{`
import {FunniesComponent} from 'funnies';
const Wrapper = React.createClass({
  getInitialState() {
    return {
      interval: 1000,
      transitionTimeout: {
        enter: 200,
        leave: 200,
      },
    };
  },
  update(interval) {
    this.setState({interval: parseInt(interval)});
  },
  updateTransitionTimeout(type, value) {
    if(type === 'enter') {
      this.setState({
        transitionTimeout: {
          enter: parseInt(value),
          leave: this.state.transitionTimeout.leave,
        }
      });
    }
    else if(type === 'leave') {
      this.setState({
        transitionTimeout: {
          enter: this.state.transitionTimeout.enter,
          leave: parseInt(value)
        }
      });
    }
  },
  render() {
    return <div>
      <FunniesComponent
        interval={this.state.interval}
        transitionTimeout={this.state.transitionTimeout} />
      <input
        type="range"
        min={0}
        max={8000}
        step={1000}
        value={this.state.interval}
        onChange={e => this.update(e.target.value)}
      />
      <input
        type="range"
        min={100}
        max={3000}
        step={100}
        value={this.state.transitionTimeout.enter}
        onChange={e => this.updateTransitionTimeout('enter', e.target.value)}
      <input
        type="range"
        min={100}
        max={3000}
        step={100}
        value={this.state.transitionTimeout.leave}
        onChange={e => this.updateTransitionTimeout('leave', e.target.value)}
      />
    </div>;
  }
});
ReactDOM.render(<Wrapper />, element);
        `}
      </pre>
    </div>;
  },
});
ReactDOM.render(<Wrapper />, document.getElementById('react-2'));

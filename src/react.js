import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Funnies from './index';

export default class FunniesComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.state.funnies = new Funnies(props.customMessages, props.options);
    this.state.message = this.state.funnies.message();

    // periodically, update the message to be something else
    this.changeMessage(props);
  }
  componentWillUnmount() {
    clearTimeout(this.state.interval);
  }
  changeMessage(props=this.props) {
    if (props.interval > 0) {
      this.state.interval = setTimeout(() => {
        this.setState({ message: this.state.funnies.message() });
        this.state.interval = setTimeout(this.changeMessage.bind(this), props.interval);
      }, props.interval);
    }
  }
  render() {
    return <div className="funnies">
      <ReactCSSTransitionGroup
        transitionName="funnies"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        <span
          className="funnies-text"
          key={this.state.message}
        >{this.state.message}</span>
      </ReactCSSTransitionGroup>
    </div>;
  }
}
FunniesComponent.defaultProps = {interval: 8000, customMessages: [], options: {}};

// for browser support
if (typeof window !== 'undefined') {
  window.FunniesComponent = FunniesComponent;
}

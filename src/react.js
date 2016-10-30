import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Funnies from './index';

export default class FunniesComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.props = props;

    // Create a new funnies instance
    this.state.funnies = new Funnies(props.customMessages);
    this.state.message = this.state.funnies.message();

    // periodically, update the message to be something else
    if (props.interval > 0) {
      this.state.interval = setInterval(() => {
        this.setState({message: this.state.funnies.message()});
      }, props.interval);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.interval);
  }
  render() {
    return <span className={this.props.className || "funnies-text"}>{this.state.message}</span>;
  }
}

FunniesComponent.defaultProps = {
  interval: 8000,
  customMessages: [],
  //className,
};

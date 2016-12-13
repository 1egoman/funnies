import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Style} from 'radium';
import Funnies from './index';

export default class FunniesComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.state.funnies = new Funnies(props.customMessages);
    this.state.message = this.state.funnies.message();

    // periodically, update the message to be something else
    if (props.interval > 0) {
      this.state.interval = setInterval(() => {
        this.setState({ message: this.state.funnies.message() });
      }, props.interval);
    }
  }
  cssTransitionStyles() {
    return [
      <Style
        scopeSelector=".funnies-text.funnies-enter"
        rules={styles.funniesText.funniesEnter}
        key={0}
      />,
      <Style
        scopeSelector=".funnies-text.funnies-enter-active"
        rules={styles.funniesText.funniesEnterActive}
        key={1}
      />,
      <Style
        scopeSelector=".funnies-text.funnies-leave"
        rules={styles.funniesText.funniesLeave}
        key={2}
      />,
      <Style
        scopeSelector=".funnies-text.funnies-leave-active"
        rules={styles.funniesText.funniesLeaveActive}
        key={3}
      />,
    ];
  }
  componentWillUnmount() {
    clearTimeout(this.state.interval);
  }
  render() {
    return <div className="funnies">
      {this.cssTransitionStyles()}
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
FunniesComponent.defaultProps = {interval: 8000, customMessages: []};


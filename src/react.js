import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Style} from 'radium';
import Funnies from './index';

let styles = {
  funnies: {
    background: "#EEE",
    paddingTop: "0.5em",
    position: "relative",
    height: "7.2em",
    fontFamily: "Helvetica, Arial, sans-serif",
    color: "#555",
  },
  funniesText: {
    transition: "opacity 0.2s ease-in",
    position: "absolute",
    textAlign: "center",
    width: "100%",
    fontSize: "1em",

    funniesEnter: { opacity: 0.01 },
    funniesEnterActive: { opacity: 1.0 },
    funniesLeave: {
      opacity: 1.0,
    },
    funniesLeaveActive: {
      opacity: 0,
    },
  },
  funniesHeader: {
    textAlign: "center",
    fontSize: "2em",
  },
};

export default class FunniesComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.state.funnies = new Funnies(props.customMessages);
    this.state.message = this.state.funnies.message();

    // periodically, update the message to be something else
    this.state.interval = setInterval(() => {
      this.setState({ message: this.state.funnies.message() });
    }, props.interval);
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
    return <div className="funnies" style={styles.funnies}>
      {this.cssTransitionStyles()}
      <ReactCSSTransitionGroup
        transitionName="funnies"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        <h1 style={styles.funniesHeader}>Loading...</h1>
        <span
          className="funnies-text"
          style={styles.funniesText}
          key={this.state.message}
        >{this.state.message}</span>
      </ReactCSSTransitionGroup>
    </div>;
  }
}
FunniesComponent.defaultProps = {interval: 8000, customMessages: []};

// for browser support
if (typeof window !== 'undefined') {
  window.Funnies = Funnies;
  window.FunniesComponent = FunniesComponent;
}
// for AMD
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return {Funnies, FunniesComponent};
  });
}

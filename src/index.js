import _ from 'lodash';
import React from 'react';
import defaultMessages from './funnies';

export default class Funnies {
  constructor(messages=[]) {
    this.messages = defaultMessages.concat(messages);

    // convert messages into a map of message to how many times it has been
    // used.
    this.record = {};
    this.messages.forEach(message => {
      this.record[message] = 0;
    });
  }

  // pick the smallest of the freqencies for a message to get a more random
  // distribution
  message() {
    let smallestMessage = this.messages.reduce((smallest, message) => {
      if (this.record[smallest] > this.record[message]) {
        return message;
      } else if (this.record[smallest] === this.record[message]) {
        return _.sample([smallest, message]);
      } else {
        return smallest;
      }
    });

    // update the recrd to show that this message was picked
    this.record[smallestMessage] += 1;
    return smallestMessage;
  }

  messageHTML() {
    let message = this.message();
    let html = `<div class="funnies">
      <span class="loading-funny">${message}</span>
    </div>`.replace(/(\r?\n|^ +)/gm, '');
    return {message, html};
  }
}


export class FunniesComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.state.funnies = new Funnies(props.customMessages);
    this.state.message = this.state.funnies.message();

    // periodically, update the message to be something else
    this.state.interval = setInterval(() => {
      this.setState({ message: this.state.funnies.message() });
    }, props.duration);

    // style for the funnies text
    this.funniesStyle = {
      transition: "1s all ease",
      color: "#888",
      padding: "1em",
    };
  }
  render() {
    return <div className="funnies">
      <span className="funnies-text" style={this.funniesStyle}>{this.state.message}</span>
    </div>;
  }
}
FunniesComponent.defaultProps = {interval: 8000, customMessages: []};

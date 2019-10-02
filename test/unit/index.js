import Funnies from '../../src/index';
import FunniesComponent from '../../src/react';
import funnyMessages from '../../src/funnies';
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import jsdom from 'jsdom';

describe('Funnies', function() {
  let funnies;
  beforeEach(() => {
    funnies = new Funnies();
  });

  it('should generate funny messages', () => {
    let first = funnies.message();
    assert.equal(typeof first, "string");
    assert.notEqual(funnies.messages.indexOf(first), -1);
  });

  it('should not generate equal messages in a row', () => {
    let first = funnies.message();
    let second = funnies.message();
    let third = funnies.message();
    assert.notEqual(first.length, 0);
    assert.notEqual(second.length, 0);
    assert.notEqual(third.length, 0);
    assert.notEqual(first, second);
    assert.notEqual(second, third);
  });

  it('should generate all messages when run to completion and not repeat', () => {
    let customMessageFunnies = new Funnies();

    // Try to generate all messages and make sure they both show up
    let generatedPhrases = funnyMessages.slice();
    for (let i = 0; i < funnyMessages.length; i++) {
      // Generate the message
      let message = customMessageFunnies.message();
      // Delete it from the list of messages left
      generatedPhrases.splice(generatedPhrases.indexOf(message), 1);
    }

    assert.deepEqual(generatedPhrases, []);
  });

  it('should be able to use custom messages', () => {
    let customMessageFunnies = new Funnies(["message", "message2"]);
    assert.notEqual(customMessageFunnies.messages.indexOf("message"), -1);
    assert.notEqual(customMessageFunnies.messages.indexOf("message2"), -1);
  });

  it('should be able to use custom messages, and only custom messages', () => {
    let customMessageFunnies = new Funnies(["message", "message2"], {appendMessages: false});

    // Try to generate all messages and make sure they both show up
    let firstGenerated = false, secondGenerated = false, runIterations = 0;
    while (!(firstGenerated && secondGenerated)) {
      // Generate the message
      let message = customMessageFunnies.message();
      // Populate the flags above
      firstGenerated = firstGenerated || (message === 'message');
      secondGenerated = secondGenerated || (message === 'message2');
      // Increment the iteration we're on.
      runIterations++;
    }

    assert(firstGenerated);
    assert(secondGenerated);
    assert.equal(runIterations, 2);
  });

  it('should return a html message', () => {
    let first = funnies.messageHTML();
    assert.equal(first.html, `<div class="funnies"><span class="loading-funny">${first.message}</span></div>`);
  });
});

describe('Funnies Component', function() {
  // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
  function propagateToGlobal(window) {
    for (let key in window) {
      if (!window.hasOwnProperty(key)) continue
      if (key in global) continue

      global[key] = window[key]
    }
  }

  let doc;
  beforeEach(() => {
    doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;
    propagateToGlobal(global.window);
  });

  it('should render the funny text', function() {
    let component = TestUtils.renderIntoDocument(<FunniesComponent />);
    let text = TestUtils.findRenderedDOMComponentWithClass(component, "funnies-text");
    assert.deepEqual(text.textContent, component.state.message);
  });

  describe('with fake timer', function() {
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });
    afterEach(() => {
      clock.restore();
    });

    it('should change the funny text every interval', function() {
      let component = TestUtils.renderIntoDocument(<FunniesComponent interval={1000} />);
      let text = TestUtils.findRenderedDOMComponentWithClass(component, "funnies-text");
      let firstMessage = text.textContent.slice();
      assert.equal(text.textContent, component.state.message);
      
      // advance the clock
      clock.tick(1500);
      text = TestUtils.findRenderedDOMComponentWithClass(component, "funnies-text");
      assert.notEqual(text.textContent, firstMessage);
    });
    it('should not change the funny text every interval with a zero interval', function() {
      let component = TestUtils.renderIntoDocument(<FunniesComponent interval={0} />);
      let text = TestUtils.findRenderedDOMComponentWithClass(component, "funnies-text");
      let firstMessage = text.textContent.slice();
      assert.equal(text.textContent, component.state.message);
      
      // advance the clock
      clock.tick(1500);
      text = TestUtils.findRenderedDOMComponentWithClass(component, "funnies-text");
      assert.equal(text.textContent, firstMessage);
    });
  });
});

import Funnies from '../../src/index';
import assert from 'assert';

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

  it('should be able to use custom messages', () => {
    let customMessageFunnies = new Funnies(["message", "message2"]);
    assert.notEqual(customMessageFunnies.messages.indexOf("message"), -1);
    assert.notEqual(customMessageFunnies.messages.indexOf("message2"), -1);
  });

  it('should return a html message', () => {
    let first = funnies.messageHTML();
    assert.equal(first.html, `<div class="loading"><img src="spinner.gif" /><span class="loading-funny">${first.message}</span></div>`);
  });
});

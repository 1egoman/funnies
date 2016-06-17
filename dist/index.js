'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunniesComponent = exports.Funnies = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _funnies = require('./funnies');

var _funnies2 = _interopRequireDefault(_funnies);

var _react = require('./react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Funnies = function () {
  function Funnies() {
    var _this = this;

    var messages = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Funnies);

    this.messages = _funnies2.default.concat(messages);

    // convert messages into a map of message to how many times it has been
    // used.
    this.record = {};
    this.messages.forEach(function (message) {
      _this.record[message] = 0;
    });
  }

  // pick the smallest of the freqencies for a message to get a more random
  // distribution


  _createClass(Funnies, [{
    key: 'message',
    value: function message() {
      var _this2 = this;

      var smallestMessage = this.messages.reduce(function (smallest, message) {
        if (_this2.record[smallest] > _this2.record[message]) {
          return message;
        } else if (_this2.record[smallest] === _this2.record[message]) {
          return _lodash2.default.sample([smallest, message]);
        } else {
          return smallest;
        }
      });

      // update the recrd to show that this message was picked
      this.record[smallestMessage] += 1;
      return smallestMessage;
    }
  }, {
    key: 'messageHTML',
    value: function messageHTML() {
      var message = this.message();
      var html = ('<div class="funnies">\n      <span class="loading-funny">' + message + '</span>\n    </div>').replace(/(\r?\n|^ +)/gm, '');
      return { message: message, html: html };
    }
  }]);

  return Funnies;
}();

exports.default = Funnies;
exports.Funnies = Funnies;
exports.FunniesComponent = _react2.default;

// for browser support

if (typeof window !== 'undefined') {
  window.Funnies = Funnies;
  window.FunniesComponent = _react2.default;
}
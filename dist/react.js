'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _radium = require('radium');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  funnies: {
    background: "#EEE",
    paddingTop: "0.5em",
    position: "relative",
    height: "7.2em",
    fontFamily: "Helvetica, Arial, sans-serif",
    color: "#555"
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
      opacity: 1.0
    },
    funniesLeaveActive: {
      opacity: 0
    }
  },
  funniesHeader: {
    textAlign: "center",
    fontSize: "2em"
  }
};

var FunniesComponent = function (_React$Component) {
  _inherits(FunniesComponent, _React$Component);

  function FunniesComponent(props) {
    _classCallCheck(this, FunniesComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FunniesComponent).call(this));

    _this.state = {};
    _this.state.funnies = new _index2.default(props.customMessages);
    _this.state.message = _this.state.funnies.message();

    // periodically, update the message to be something else
    _this.state.interval = setInterval(function () {
      _this.setState({ message: _this.state.funnies.message() });
    }, props.interval);
    return _this;
  }

  _createClass(FunniesComponent, [{
    key: 'cssTransitionStyles',
    value: function cssTransitionStyles() {
      return [_react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-enter',
        rules: styles.funniesText.funniesEnter,
        key: 0
      }), _react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-enter-active',
        rules: styles.funniesText.funniesEnterActive,
        key: 1
      }), _react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-leave',
        rules: styles.funniesText.funniesLeave,
        key: 2
      }), _react2.default.createElement(_radium.Style, {
        scopeSelector: '.funnies-text.funnies-leave-active',
        rules: styles.funniesText.funniesLeaveActive,
        key: 3
      })];
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.state.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'funnies', style: styles.funnies },
        this.cssTransitionStyles(),
        _react2.default.createElement(
          _reactAddonsCssTransitionGroup2.default,
          {
            transitionName: 'funnies',
            transitionEnterTimeout: 200,
            transitionLeaveTimeout: 200
          },
          _react2.default.createElement(
            'h1',
            { style: styles.funniesHeader },
            'Loading...'
          ),
          _react2.default.createElement(
            'span',
            {
              className: 'funnies-text',
              style: styles.funniesText,
              key: this.state.message
            },
            this.state.message
          )
        )
      );
    }
  }]);

  return FunniesComponent;
}(_react2.default.Component);

exports.default = FunniesComponent;

FunniesComponent.defaultProps = { interval: 8000, customMessages: [] };

// for browser support
if (typeof window !== 'undefined') {
  window.Funnies = _index2.default;
  window.FunniesComponent = FunniesComponent;
}
// for AMD
if (typeof define === 'function' && define.amd) {
  define([], function () {
    return { Funnies: _index2.default, FunniesComponent: FunniesComponent };
  });
}
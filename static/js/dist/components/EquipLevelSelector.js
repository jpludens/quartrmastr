define(['exports', 'react'], function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var EquipLevelSelector = function (_React$Component) {
    _inherits(EquipLevelSelector, _React$Component);

    function EquipLevelSelector(props) {
      _classCallCheck(this, EquipLevelSelector);

      return _possibleConstructorReturn(this, (EquipLevelSelector.__proto__ || Object.getPrototypeOf(EquipLevelSelector)).call(this, props));
    }

    // This uses a bunch of magic to produce the right number of buttons
    // with the right labels and behaviors for all current use cases.


    _createClass(EquipLevelSelector, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          'div',
          null,
          [].concat(_toConsumableArray(Array(this.props.max - this.props.min + 1).keys())).map(function (n) {
            return _react2.default.createElement(
              'button',
              { key: n,
                onClick: function onClick() {
                  return _this2.props.setter(n + _this2.props.min);
                } },
              n + _this2.props.min
            );
          })
        );
      }
    }]);

    return EquipLevelSelector;
  }(_react2.default.Component);

  exports.default = EquipLevelSelector;

  EquipLevelSelector.propTypes = {
    setter: _react2.default.PropTypes.func.isRequired,
    min: _react2.default.PropTypes.number.isRequired,
    max: _react2.default.PropTypes.number.isRequired
  };
});
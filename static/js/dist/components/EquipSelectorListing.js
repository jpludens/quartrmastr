define(['exports', 'react', 'react-dom', 'components/EquipDetailsComponent'], function (exports, _react, _reactDom, _EquipDetailsComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _EquipDetailsComponent2 = _interopRequireDefault(_EquipDetailsComponent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var EquipSelectorListing = function (_React$Component) {
    _inherits(EquipSelectorListing, _React$Component);

    function EquipSelectorListing(props) {
      _classCallCheck(this, EquipSelectorListing);

      return _possibleConstructorReturn(this, (EquipSelectorListing.__proto__ || Object.getPrototypeOf(EquipSelectorListing)).call(this, props));
    }

    _createClass(EquipSelectorListing, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'span',
          {
            onClick: this.handleClick.bind(this) },
          this.props.equip.name,
          ' (',
          this.props.equip.slot,
          ')'
        );
      }
    }, {
      key: 'handleClick',
      value: function handleClick() {
        _reactDom2.default.render(_react2.default.createElement(_EquipDetailsComponent2.default, { equip: this.props.equip }), document.getElementById('equip-details'));
      }
    }]);

    return EquipSelectorListing;
  }(_react2.default.Component);

  exports.default = EquipSelectorListing;

  EquipSelectorListing.propTypes = {
    equip: _react2.default.PropTypes.object.isRequired
  };
});
define(['exports', 'react', 'utils/equipUtils'], function (exports, _react, _equipUtils) {
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

  var EquipLevelComponent = function (_React$Component) {
    _inherits(EquipLevelComponent, _React$Component);

    function EquipLevelComponent(props) {
      _classCallCheck(this, EquipLevelComponent);

      return _possibleConstructorReturn(this, (EquipLevelComponent.__proto__ || Object.getPrototypeOf(EquipLevelComponent)).call(this, props));
    }

    _createClass(EquipLevelComponent, [{
      key: 'render',
      value: function render() {
        // TODO: Add upgrade materials

        var eresContent = null;
        if (this.props.eres) {
          eresContent = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h4',
              null,
              'Elemental Resistances'
            ),
            (0, _equipUtils.renderMapAsUnorderedList)(this.props.eres)
          );
        }

        var sresContent = null;
        if (this.props.sres) {
          sresContent = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h4',
              null,
              'Status Resistances'
            ),
            (0, _equipUtils.renderMapAsUnorderedList)(this.props.sres)
          );
        }

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h4',
              null,
              'Stats at Level ',
              this.props.level
            ),
            (0, _equipUtils.renderEquipStats)(this.props.stats)
          ),
          eresContent,
          sresContent
        );
      }
    }]);

    return EquipLevelComponent;
  }(_react2.default.Component);

  exports.default = EquipLevelComponent;

  EquipLevelComponent.propTypes = {
    level: _react2.default.PropTypes.number.isRequired,
    stats: _react2.default.PropTypes.object.isRequired,
    mats: _react2.default.PropTypes.object,
    eres: _react2.default.PropTypes.object,
    sres: _react2.default.PropTypes.object
  };
});
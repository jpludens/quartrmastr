define(['exports', 'react', 'components/EquipSelectorFilter', 'components/EquipSelectorListing'], function (exports, _react, _EquipSelectorFilter, _EquipSelectorListing) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _EquipSelectorFilter2 = _interopRequireDefault(_EquipSelectorFilter);

  var _EquipSelectorListing2 = _interopRequireDefault(_EquipSelectorListing);

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

  var EquipSelector = function (_React$Component) {
    _inherits(EquipSelector, _React$Component);

    function EquipSelector(props) {
      _classCallCheck(this, EquipSelector);

      var _this = _possibleConstructorReturn(this, (EquipSelector.__proto__ || Object.getPrototypeOf(EquipSelector)).call(this, props));

      var slots = new Set();
      slots.add("Bow");
      slots.add("Sword");
      slots.add("Staff");
      slots.add("Gun");
      slots.add("Female Hats");
      slots.add("Female Armor");
      slots.add("Male Hats");
      slots.add("Male Armor");
      slots.add("Flair");
      _this.state = {
        showSlots: slots
      };
      return _this;
    }

    _createClass(EquipSelector, [{
      key: 'setSlots',
      value: function setSlots(slots) {
        this.setState({ showSlots: slots });
      }
    }, {
      key: 'render',
      value: function render() {
        // Make a list of equips to show based on set of slots
        var slots = this.state.showSlots;
        var equipsToShow = this.props.equips.filter(function (equip) {
          return slots.has(equip.slot);
        });
        var listings = equipsToShow.map(function (equip) {
          return _react2.default.createElement(
            'li',
            { key: equip.name },
            _react2.default.createElement(_EquipSelectorListing2.default, { equip: equip })
          );
        });

        // Render the filter and the list of equips
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_EquipSelectorFilter2.default, { setSlots: this.setSlots.bind(this) }),
          _react2.default.createElement(
            'ul',
            null,
            listings
          )
        );
      }
    }]);

    return EquipSelector;
  }(_react2.default.Component);

  exports.default = EquipSelector;

  EquipSelector.propTypes = {
    equips: _react2.default.PropTypes.array.isRequired
  };
});
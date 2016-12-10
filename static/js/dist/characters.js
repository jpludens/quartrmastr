define(['react', 'react-dom', 'utils/loaderUtil'], function (_react, _reactDom, _loaderUtil) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

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

  console.log("characters.jsx");

  (0, _loaderUtil.loadCharacters)().then(function (characters) {
    console.log(characters);
    _reactDom2.default.render(_react2.default.createElement(CharacterRoster, { characters: characters }), document.getElementById('content'));
  });

  var CharacterRoster = function (_React$Component) {
    _inherits(CharacterRoster, _React$Component);

    function CharacterRoster(props) {
      _classCallCheck(this, CharacterRoster);

      return _possibleConstructorReturn(this, (CharacterRoster.__proto__ || Object.getPrototypeOf(CharacterRoster)).call(this, props));
    }

    _createClass(CharacterRoster, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'ul',
          null,
          this.props.characters.map(function (c) {
            return _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(Character, {
                name: c.name,
                equipSlots: c.equipSlots })
            );
          })
        );
      }
    }]);

    return CharacterRoster;
  }(_react2.default.Component);

  CharacterRoster.propTypes = {
    characters: _react2.default.PropTypes.array.isRequired
  };

  var Character = function (_React$Component2) {
    _inherits(Character, _React$Component2);

    function Character(props) {
      _classCallCheck(this, Character);

      return _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, props));
    }

    _createClass(Character, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            this.props.name
          ),
          _react2.default.createElement(Outfit, { equipSlots: this.props.equipSlots })
        );
      }
    }]);

    return Character;
  }(_react2.default.Component);

  Character.propTypes = {
    name: _react2.default.PropTypes.string.isRequired,
    equipSlots: _react2.default.PropTypes.array.isRequired
  };

  var Outfit = function (_React$Component3) {
    _inherits(Outfit, _React$Component3);

    function Outfit(props) {
      _classCallCheck(this, Outfit);

      return _possibleConstructorReturn(this, (Outfit.__proto__ || Object.getPrototypeOf(Outfit)).call(this, props));
    }

    _createClass(Outfit, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'ul',
          null,
          this.props.equipSlots.map(function (es) {
            return _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(EquipSlot, { slot: es })
            );
          })
        );
      }
    }]);

    return Outfit;
  }(_react2.default.Component);

  Outfit.propTypes = {
    equipSlots: _react2.default.PropTypes.array.isRequired
  };

  var EquipSlot = function (_React$Component4) {
    _inherits(EquipSlot, _React$Component4);

    function EquipSlot(props) {
      _classCallCheck(this, EquipSlot);

      return _possibleConstructorReturn(this, (EquipSlot.__proto__ || Object.getPrototypeOf(EquipSlot)).call(this, props));
    }

    _createClass(EquipSlot, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'p',
          null,
          this.props.slot
        );
      }
    }]);

    return EquipSlot;
  }(_react2.default.Component);

  EquipSlot.propTypes = {
    slot: _react2.default.PropTypes.string.isRequired
  };
});
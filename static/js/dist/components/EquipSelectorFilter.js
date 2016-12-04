define(["exports", "react"], function (exports, _react) {
  "use strict";

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

  var EquipSelectorFilter = function (_React$Component) {
    _inherits(EquipSelectorFilter, _React$Component);

    function EquipSelectorFilter(props) {
      _classCallCheck(this, EquipSelectorFilter);

      return _possibleConstructorReturn(this, (EquipSelectorFilter.__proto__ || Object.getPrototypeOf(EquipSelectorFilter)).call(this, props));
    }

    _createClass(EquipSelectorFilter, [{
      key: "render",
      value: function render() {
        // Render a dropdown for selecting equip categories
        return _react2.default.createElement(
          "select",
          { onChange: this.handleChange.bind(this), defaultValue: "All" },
          _react2.default.createElement(
            "option",
            { value: "All" },
            "Show All Equips"
          ),
          _react2.default.createElement(
            "option",
            { value: "Weapon" },
            "Show All Weapons"
          ),
          _react2.default.createElement(
            "option",
            { value: "Bow" },
            "Bows Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Sword" },
            "Swords Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Staff" },
            "Staves Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Gun" },
            "Guns Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Armor" },
            "All Armors"
          ),
          _react2.default.createElement(
            "option",
            { value: "Female Hat" },
            "Female Hats Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Female Armor" },
            "Female Armor Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Male Hat" },
            "Male Hats Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Male Armor" },
            "Male Armor Only"
          ),
          _react2.default.createElement(
            "option",
            { value: "Flair" },
            "Flair Only"
          )
        );
      }
    }, {
      key: "handleChange",
      value: function handleChange(event) {
        // Make a set of base-level categories based on the dropdown selection,
        // and report that set through the props.setSlots function.
        var slots = new Set();

        switch (event.target.value) {
          case "Weapon":
            slots.add("Bow");
            slots.add("Sword");
            slots.add("Staff");
            slots.add("Gun");
            break;
          case "Bow":
            slots.add("Bow");
            break;
          case "Sword":
            slots.add("Sword");
            break;
          case "Staff":
            slots.add("Staff");
            break;
          case "Gun":
            slots.add("Gun");
            break;
          case "Female Hat":
            slots.add("Female Hat");
            break;
          case "Female Armor":
            slots.add("Female Armor");
            break;
          case "Male Hat":
            slots.add("Male Hat");
            break;
          case "Male Armor":
            slots.add("Male Armor");
            break;
          case "Armor":
            slots.add("Female Hat");
            slots.add("Female Armor");
            slots.add("Male Hat");
            slots.add("Male Armor");
          case "Flair":
            slots.add("Flair");
            break;
          default:
            slots.add("Bow");
            slots.add("Sword");
            slots.add("Staff");
            slots.add("Gun");
            slots.add("Female Hat");
            slots.add("Female Armor");
            slots.add("Male Hat");
            slots.add("Male Armor");
            slots.add("Flair");;
        }
        this.props.setSlots(slots);
      }
    }]);

    return EquipSelectorFilter;
  }(_react2.default.Component);

  exports.default = EquipSelectorFilter;
});
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

  var EquipTraitsBlurb = function (_React$Component) {
    _inherits(EquipTraitsBlurb, _React$Component);

    function EquipTraitsBlurb(props) {
      _classCallCheck(this, EquipTraitsBlurb);

      return _possibleConstructorReturn(this, (EquipTraitsBlurb.__proto__ || Object.getPrototypeOf(EquipTraitsBlurb)).call(this, props));
    }

    _createClass(EquipTraitsBlurb, [{
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          "p",
          null,
          this.props.traits.map(function (trait, index) {
            var text = "Um...";
            switch (trait.traitType) {
              // Imbue
              case "imbueElement":
                text = "Imbued with " + trait.elementName + ". ";
                break;

              // Boost
              case "boostElement":
                text = "Boosts the power of " + trait.elementName + " Skills. ";
                break;
              case "actionBoost":
                text = "Boosts the power of " + trait.actionDesc + ". ";
                break;
              case "stackSkill":
                text = "May cast " + trait.skillName + " with certain Skills. ";
                break;
              case "drain":
                var stat = trait.statName == 'healthPoints' ? 'HP' : 'MP';
                text = "Drains " + stat + " from foes with certain Skills. ";
                break;

              // Sapper stuff
              case "statusOnTarget":
                var status = trait.statusName == "Random" ? "random status effects" : trait.statusName;
                text = "May inflict " + status + " on targets. ";
                break;
              case "statusReplace":
                text = "Replaces weapon effect with " + trait.statusName + ". ";
                break;
              case "statDebuff":
                text = "May slap targets with " + trait.statModifierName + ". ";
                break;

              // Offensive stuff
              case "beatSkill":
                text = "Randomly casts " + trait.skillName + " between turns. ";
                break;
              case "counterSkill":
                text = "Counter attacks with " + trait.skillName + ". ";
                break;

              // Defensive stuff
              case "statusOnPlayer":
                text = "Randomly gives the player " + trait.statusName + ". ";
                break;
              case "buffReflex":
                text = "Grants player " + trait.statModifierName + " when hit with a powerful attack. ";
                break;
            }
            return _react2.default.createElement(
              "span",
              { key: index },
              text
            );
          })
        );
      }
    }]);

    return EquipTraitsBlurb;
  }(_react2.default.Component);

  exports.default = EquipTraitsBlurb;

  EquipTraitsBlurb.propTypes = {
    traits: _react2.default.PropTypes.array.isRequired
  };
});
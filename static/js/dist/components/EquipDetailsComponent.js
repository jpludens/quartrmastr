define(['exports', 'react', 'components/EquipTraitsBlurb', 'components/EquipLevelSelector', 'components/EquipLevelComponent', 'components/EquipLevelComparisonComponent'], function (exports, _react, _EquipTraitsBlurb, _EquipLevelSelector, _EquipLevelComponent, _EquipLevelComparisonComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _EquipTraitsBlurb2 = _interopRequireDefault(_EquipTraitsBlurb);

  var _EquipLevelSelector2 = _interopRequireDefault(_EquipLevelSelector);

  var _EquipLevelComponent2 = _interopRequireDefault(_EquipLevelComponent);

  var _EquipLevelComparisonComponent2 = _interopRequireDefault(_EquipLevelComparisonComponent);

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

  var EquipDetailsComponent = function (_React$Component) {
    _inherits(EquipDetailsComponent, _React$Component);

    // TODO: Break this up
    function EquipDetailsComponent(props) {
      _classCallCheck(this, EquipDetailsComponent);

      var _this = _possibleConstructorReturn(this, (EquipDetailsComponent.__proto__ || Object.getPrototypeOf(EquipDetailsComponent)).call(this, props));

      _this.state = {
        currentLevel: 1,
        compareLevel: 2
      };
      return _this;
    }

    _createClass(EquipDetailsComponent, [{
      key: 'setCurrentLevel',
      value: function setCurrentLevel(newLevel) {
        // Set the new current level.
        this.setState({ currentLevel: newLevel });
        // If the new level is at max, we can no longer compare.
        if (newLevel == this.props.equip.maxLevel) {
          this.setState({ compareLevel: null });
        }
        // If compare level is null or too low, set it to one above current.
        else if ((this.state.compareLevel || 0) <= newLevel) {
            this.setState({ compareLevel: newLevel + 1 });
          }
      }
    }, {
      key: 'setCompareLevel',
      value: function setCompareLevel(compareLevel) {
        this.setState({ compareLevel: compareLevel });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h3',
            null,
            'Details for ',
            this.props.equip.name,
            ' (',
            this.props.equip.slot,
            ')'
          ),
          _react2.default.createElement(_EquipTraitsBlurb2.default, { traits: this.props.equip.traits }),
          _react2.default.createElement(
            'div',
            null,
            this.renderCurrentLevel(),
            this.renderDelta(),
            this.renderCompareLevel()
          )
        );
      }
    }, {
      key: 'renderCurrentLevel',
      value: function renderCurrentLevel() {
        var levelData = this.props.equip.levels.get(this.state.currentLevel);
        return _react2.default.createElement(
          'div',
          { id: 'current-level-details', className: 'column' },
          _react2.default.createElement(
            'h4',
            null,
            'Current Level'
          ),
          _react2.default.createElement(_EquipLevelSelector2.default, {
            min: 1,
            max: this.props.equip.maxLevel,
            setter: this.setCurrentLevel.bind(this) }),
          _react2.default.createElement(_EquipLevelComponent2.default, {
            level: this.state.currentLevel,
            stats: levelData.stats,
            eres: levelData.elementalResistances,
            sres: levelData.statusResistances })
        );
      }
    }, {
      key: 'renderCompareLevel',
      value: function renderCompareLevel() {
        if (this.state.compareLevel) {
          var currentData = this.props.equip.levels.get(this.state.currentLevel);
          var compareData = this.props.equip.levels.get(this.state.compareLevel);
          return _react2.default.createElement(
            'div',
            { id: 'compare-level-details', className: 'column' },
            _react2.default.createElement(
              'h4',
              null,
              'Compared to Level'
            ),
            _react2.default.createElement(_EquipLevelSelector2.default, {
              min: this.state.currentLevel + 1,
              max: this.props.equip.maxLevel,
              setter: this.setCompareLevel.bind(this) }),
            _react2.default.createElement(_EquipLevelComponent2.default, {
              level: this.state.compareLevel,
              stats: compareData.stats,
              eres: compareData.elementalResistances,
              sres: compareData.statusResistances })
          );
        } else {
          return _react2.default.createElement(
            'div',
            { id: 'compare-level-details', className: 'column' },
            'This Equip is maxed to the max!'
          );
        }
      }
    }, {
      key: 'renderDelta',
      value: function renderDelta() {
        if (this.state.compareLevel) {
          var currentData = this.props.equip.levels.get(this.state.currentLevel);
          var compareData = this.props.equip.levels.get(this.state.compareLevel);
          return _react2.default.createElement(_EquipLevelComparisonComponent2.default, {
            equip: this.props.equip,
            currentData: currentData,
            compareData: compareData });
        }
      }
    }]);

    return EquipDetailsComponent;
  }(_react2.default.Component);

  exports.default = EquipDetailsComponent;

  EquipDetailsComponent.propTypes = {
    equip: _react2.default.PropTypes.object.isRequired
  };
});
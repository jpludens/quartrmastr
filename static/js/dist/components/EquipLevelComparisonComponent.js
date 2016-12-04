define(['exports', 'react', 'utils/equipUtils', 'utils/mapUtils'], function (exports, _react, _equipUtils, _mapUtils) {
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

  var EquipLevelComparisonComponent = function (_React$Component) {
    _inherits(EquipLevelComparisonComponent, _React$Component);

    function EquipLevelComparisonComponent(props) {
      _classCallCheck(this, EquipLevelComparisonComponent);

      return _possibleConstructorReturn(this, (EquipLevelComparisonComponent.__proto__ || Object.getPrototypeOf(EquipLevelComparisonComponent)).call(this, props));
    }

    _createClass(EquipLevelComparisonComponent, [{
      key: 'render',
      value: function render() {
        var statComparison = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Stats Changes'
          ),
          (0, _equipUtils.renderEquipStats)((0, _equipUtils.diffStats)(this.props.compareData.stats, this.props.currentData.stats))
        );

        var elementalComparison = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Elemental Resistance Changes'
          ),
          (0, _equipUtils.renderMapAsUnorderedList)((0, _mapUtils.diffMaps)(this.props.compareData.elementalResistances, this.props.currentData.elementalResistances))
        );

        var statusComparison = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Status Resistance Changes'
          ),
          (0, _equipUtils.renderMapAsUnorderedList)((0, _mapUtils.diffMaps)(this.props.compareData.statusResistances, this.props.currentData.statusResistances))
        );

        var upgradeMaterialsArray = [];
        for (var l = this.props.currentData.level; l < this.props.compareData.level; l++) {
          upgradeMaterialsArray.push(this.props.equip.levels.get(l).upgradeMaterials);
        }
        var totalUpgradeMaterials = (0, _mapUtils.sumMaps)(upgradeMaterialsArray);
        var upgradeRequirements = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Total Upgrade Materials'
          ),
          '(Gold Cost: ',
          (0, _equipUtils.getPriceForUpgradeMaterials)(totalUpgradeMaterials),
          ')',
          (0, _equipUtils.renderMapAsUnorderedList)(totalUpgradeMaterials)
        );

        return _react2.default.createElement(
          'div',
          { id: 'delta', className: 'column' },
          statComparison,
          elementalComparison,
          statusComparison,
          upgradeRequirements
        );
      }
    }]);

    return EquipLevelComparisonComponent;
  }(_react2.default.Component);

  exports.default = EquipLevelComparisonComponent;

  EquipLevelComparisonComponent.propTypes = {
    // TODO: Drop requirement when comparing between different Equips
    equip: _react2.default.PropTypes.object.isRequired,
    currentData: _react2.default.PropTypes.object.isRequired,
    compareData: _react2.default.PropTypes.object.isRequired
  };
});
define(['exports', 'react', 'utils/loaderUtil'], function (exports, _react, _loaderUtil) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.renderEquipStats = exports.renderMapAsUnorderedList = exports.getPriceForUpgradeMaterials = exports.diffStats = undefined;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

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

  var materialCosts = new Map();
  (0, _loaderUtil.loadMaterials)().then(function (materials) {
    [].concat(_toConsumableArray(materials)).forEach(function (material) {
      materialCosts.set(material.name, material.gold);
    });
  });

  var getPriceForUpgradeMaterials = function getPriceForUpgradeMaterials(upgradeMaterials) {
    var cost = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = upgradeMaterials.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            name = _step$value[0],
            amount = _step$value[1];

        cost += amount * materialCosts.get(name);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return cost;
  };

  var diffStats = function diffStats(statsA, statsB) {
    var diff = {};
    for (var stat in statsA) {
      if (statsA.hasOwnProperty(stat)) {
        diff[stat] = statsA[stat] - statsB[stat];
      }
    }
    return diff;
  };

  var renderMapAsUnorderedList = function renderMapAsUnorderedList(theMap) {
    return _react2.default.createElement(
      'ul',
      null,
      [].concat(_toConsumableArray(theMap.entries())).map(function (entry, index) {
        return _react2.default.createElement(
          'li',
          { key: index },
          entry[0],
          ': ',
          entry[1]
        );
      })
    );
  };

  var renderEquipStats = function renderEquipStats(stats) {
    return _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        'Health Points: ',
        stats.healthPoints
      ),
      _react2.default.createElement(
        'li',
        null,
        'Magic Points: ',
        stats.magicPoints
      ),
      _react2.default.createElement(
        'li',
        null,
        'Physical Attack: ',
        stats.physicalAttack
      ),
      _react2.default.createElement(
        'li',
        null,
        'Magic Attack: ',
        stats.magicAttack
      ),
      _react2.default.createElement(
        'li',
        null,
        'Physical Defence: ',
        stats.physicalDefence
      ),
      _react2.default.createElement(
        'li',
        null,
        'Magic Defence: ',
        stats.magicDefence
      ),
      _react2.default.createElement(
        'li',
        null,
        'Accuracy: ',
        stats.accuracy
      ),
      _react2.default.createElement(
        'li',
        null,
        'Evade: ',
        stats.evade
      )
    );
  };

  exports.diffStats = diffStats;
  exports.getPriceForUpgradeMaterials = getPriceForUpgradeMaterials;
  exports.renderMapAsUnorderedList = renderMapAsUnorderedList;
  exports.renderEquipStats = renderEquipStats;
});
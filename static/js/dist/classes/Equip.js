define(['exports', 'classes/EquipLevel'], function (exports, _EquipLevel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _EquipLevel2 = _interopRequireDefault(_EquipLevel);

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

  var Equip = function Equip(equipData) {
    var _this = this;

    _classCallCheck(this, Equip);

    this.name = equipData.equipName;
    this.slot = equipData.equipSlot;
    this.traits = equipData.traits;

    this.levels = new Map();
    equipData.levels.forEach(function (rawLevelData) {
      _this.levels.set(rawLevelData.level, new _EquipLevel2.default(rawLevelData, equipData));
    });

    this.maxLevel = Math.max.apply(Math, _toConsumableArray(this.levels.keys()));
  };

  exports.default = Equip;
});
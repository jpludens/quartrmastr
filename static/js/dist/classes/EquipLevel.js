define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var EquipLevel = function EquipLevel(rawLevelData, equipData) {
    var _this = this;

    _classCallCheck(this, EquipLevel);

    this.level = rawLevelData.level;
    this.stats = rawLevelData.stats;

    this.upgradeMaterials = new Map();
    if (rawLevelData.hasOwnProperty("upgradeMaterials")) {
      rawLevelData.upgradeMaterials.forEach(function (um) {
        _this.upgradeMaterials.set(um.materialName, um.materialAmount);
      });
    }

    var resistanceValues = {
      '10per': { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 },
      '20per': { 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 },
      '30neg': { 1: -30, 2: -30, 3: -30, 4: -30, 5: -30 },
      '50neg': { 1: -50, 2: -50, 3: -50, 4: -50, 5: -50 },
      'ftrip': { 1: 10, 2: 10, 3: 30 },
      'fhalf': { 1: 20, 2: 35, 3: 50 },
      'ffull': { 1: 40, 2: 70, 3: 100 }
    };

    this.elementalResistances = new Map();
    if (equipData.hasOwnProperty("elementalResistances")) {
      equipData.elementalResistances.forEach(function (r) {
        _this.elementalResistances.set(r.elementName, resistanceValues[r.scheme][_this.level]);
      });
    }

    this.statusResistances = new Map();
    if (equipData.hasOwnProperty("ailmentResistances")) {
      equipData.ailmentResistances.forEach(function (r) {
        _this.statusResistances.set(r.ailmentName, resistanceValues[r.scheme][_this.level]);
      });
    }
  };

  exports.default = EquipLevel;
});
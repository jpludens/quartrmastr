define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var load = function load(url) {
    return fetch(new Request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })).then(function (response) {
      return response.json();
    });
  };

  var loadMaterials = function loadMaterials() {
    return load('/api/v1/materials/');
  };
  var loadEquips = function loadEquips() {
    return load('/api/v1/equips/');
  };

  exports.loadMaterials = loadMaterials;
  exports.loadEquips = loadEquips;
});
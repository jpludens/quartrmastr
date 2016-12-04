define(['react', 'react-dom', 'classes/Equip', 'components/EquipSelector', 'utils/loaderUtil'], function (_react, _reactDom, _Equip, _EquipSelector, _loaderUtil) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _Equip2 = _interopRequireDefault(_Equip);

  var _EquipSelector2 = _interopRequireDefault(_EquipSelector);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  (0, _loaderUtil.loadEquips)().then(function (equipsData) {
    var equips = equipsData.map(function (e) {
      return new _Equip2.default(e);
    });
    _reactDom2.default.render(_react2.default.createElement(_EquipSelector2.default, { equips: equips }), document.getElementById('equip-selector'));

    _reactDom2.default.render(_react2.default.createElement(
      'p',
      null,
      'Click an Equip to view its details'
    ), document.getElementById('equip-details'));
  });
});
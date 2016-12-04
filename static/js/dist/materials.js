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

  (0, _loaderUtil.loadMaterials)().then(function (materials) {
    _reactDom2.default.render(_react2.default.createElement(MaterialsContainer, { materials: materials }), document.getElementById('content'));
  });

  var MaterialsContainer = function MaterialsContainer(props) {
    return _react2.default.createElement(
      'ul',
      null,
      renderMaterials(props.materials)
    );
  };

  var renderMaterials = function renderMaterials(materials) {
    return materials.map(function (material) {
      return renderMaterial(material);
    });
  };

  var renderMaterial = function renderMaterial(material) {
    return _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(MaterialCount, null),
      _react2.default.createElement(
        'p',
        null,
        material.name,
        ' (Price: ',
        material.gold,
        ')'
      ),
      _react2.default.createElement('br', null)
    );
  };
  renderMaterial.propTypes = {
    name: _react2.default.PropTypes.string.isRequired,
    gold: _react2.default.PropTypes.number.isRequired
  };

  var MaterialCount = function (_React$Component) {
    _inherits(MaterialCount, _React$Component);

    function MaterialCount(props) {
      _classCallCheck(this, MaterialCount);

      var _this = _possibleConstructorReturn(this, (MaterialCount.__proto__ || Object.getPrototypeOf(MaterialCount)).call(this, props));

      _this.state = {
        count: 0
      };
      return _this;
    }

    _createClass(MaterialCount, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement('input', {
          type: 'number',
          value: this.state.count,
          onChange: this.handleChange.bind(this) });
      }
    }, {
      key: 'handleChange',
      value: function handleChange(e) {
        this.setState({ count: e.target.value });
      }
    }]);

    return MaterialCount;
  }(_react2.default.Component);
});
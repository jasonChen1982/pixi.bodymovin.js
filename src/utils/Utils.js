/**
 * get the type by Object.prototype.toString
 * @param {*} val
 * @return {String} type string value
 */
function _rt(val) {
  return Object.prototype.toString.call(val);
}

/**
 * some useful toolkit
 */
const Utils = {
  /**
   * simple copy a json data
   *
   * @static
   * @memberof JC.Utils
   * @param {JSON} json source data
   * @return {JSON} object
   */
  copyJSON: function(json) {
    return JSON.parse(JSON.stringify(json));
  },

  /**
   * detect the variable is array type
   *
   * @static
   * @method
   * @memberof JC.Utils
   * @param {Array} variable input variable
   * @return {Boolean} result
   */
  isArray: (function() {
    let ks = _rt([]);
    return function(variable) {
      return _rt(variable) === ks;
    };
  })(),

  /**
   * detect the variable is string type
   *
   * @static
   * @method
   * @memberof JC.Utils
   * @param {String} variable input variable
   * @return {Boolean} result
   */
  isString: (function() {
    let ks = _rt('s');
    return function(variable) {
      return _rt(variable) === ks;
    };
  })(),

  /**
   * detect the variable is number type
   *
   * @static
   * @method
   * @memberof JC.Utils
   * @param {Number} variable input variable
   * @return {Boolean} result
   */
  isNumber: (function() {
    let ks = _rt(1);
    return function(variable) {
      return _rt(variable) === ks;
    };
  })(),

  /**
   * euclidean modulo
   *
   * @static
   * @method
   * @memberof JC.Utils
   * @param {Number} n input value
   * @param {Number} m modulo
   * @return {Number} re-map to modulo area
   */
  euclideanModulo: function(n, m) {
    return ((n % m) + m) % m;
  },

  /**
   * bounce value when value spill codomain
   *
   * @static
   * @method
   * @memberof JC.Utils
   * @param {Number} n input value
   * @param {Number} min lower boundary
   * @param {Number} max upper boundary
   * @return {Number} bounce back to boundary area
   */
  codomainBounce: function(n, min, max) {
    if (n < min) return 2 * min - n;
    if (n > max) return 2 * max - n;
    return n;
  },

  /**
   * clamp a value in range
   *
   * @static
   * @method
   * @memberof JC.Utils
   * @param {Number} x input value
   * @param {Number} a lower boundary
   * @param {Number} b upper boundary
   * @return {Number} clamp in range
   */
  clamp: function(x, a, b) {
    return (x < a) ? a : ((x > b) ? b : x);
  },
};

export default Utils;

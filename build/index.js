(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'pixi.js'], factory) :
  (factory((global.PIXI = global.PIXI || {}),global.PIXI));
}(this, (function (exports,pixi_js) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * add some patch
   */

  Object.defineProperties(pixi_js.DisplayObject.prototype, {
    /**
     * An alias to scale.x
     * @member {number}
     */
    scaleX: {
      get: function get() {
        return this.scale.x;
      },
      set: function set(value) {
        this.scale.x = value;
      }
    },

    /**
     * An alias to scale.x
     * @member {number}
     */
    scaleY: {
      get: function get() {
        return this.scale.y;
      },
      set: function set(value) {
        this.scale.y = value;
      }
    },

    /**
     * An alias to pivot.x
     * @member {number}
     */
    pivotX: {
      get: function get() {
        return this.pivot.x;
      },
      set: function set(value) {
        this.pivot.x = value;
      }
    },

    /**
     * An alias to pivot.x
     * @member {number}
     */
    pivotY: {
      get: function get() {
        return this.pivot.y;
      },
      set: function set(value) {
        this.pivot.y = value;
      }
    }
  });

  /**
   * get a distance to point-v
   * @param {Point} v target point
   * @return {number} distance
   */

  pixi_js.Point.prototype.distanceTo = function (v) {
    return Math.sqrt(this.distanceToSquared(v));
  };
  /**
   * get a distance squared to point-v
   * @param {Point} v target point
   * @return {number} distance squared
   */


  pixi_js.Point.prototype.distanceToSquared = function (v) {
    var dx = this.x - v.x;
    var dy = this.y - v.y;
    return dx * dx + dy * dy;
  };

  /**
   * 返回数据类型
   * @param {*} val
   * @return {String} 数据类型
   */
  function _rt(val) {
    return Object.prototype.toString.call(val);
  }
  /**
   * Utils 引擎工具箱
   */


  var Utils = {
    /**
     * 简单拷贝纯数据的JSON对象
     *
     * @static
     * @memberof JC.Utils
     * @param {JSON} json 待拷贝的纯数据JSON
     * @return {JSON} 拷贝后的纯数据JSON
     */
    copyJSON: function copyJSON(json) {
      return JSON.parse(JSON.stringify(json));
    },

    /**
     * 将角度转化成弧度的乘法因子
     *
     * @static
     * @memberof JC.Utils
     * @type {number}
     */
    DTR: Math.PI / 180,

    /**
     * 将弧度转化成角度的乘法因子
     *
     * @static
     * @memberof JC.Utils
     * @type {number}
     */
    RTD: 180 / Math.PI,

    /**
     * 判断变量是否为数组类型
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Array} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isArray: function () {
      var ks = _rt([]);

      return function (variable) {
        return _rt(variable) === ks;
      };
    }(),

    /**
     * 判断变量是否为对象类型
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Object} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isObject: function () {
      var ks = _rt({});

      return function (variable) {
        return _rt(variable) === ks;
      };
    }(),

    /**
     * 判断变量是否为字符串类型
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {String} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isString: function () {
      var ks = _rt('s');

      return function (variable) {
        return _rt(variable) === ks;
      };
    }(),

    /**
     * 判断变量是否为数字类型
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isNumber: function () {
      var ks = _rt(1);

      return function (variable) {
        return _rt(variable) === ks;
      };
    }(),

    /**
     * 判断变量是否为函数类型
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Function} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isFunction: function () {
      var ks = _rt(function () {});

      return function (variable) {
        return _rt(variable) === ks;
      };
    }(),

    /**
     * 判断变量是否为undefined
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Function} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isUndefined: function isUndefined(variable) {
      return typeof variable === 'undefined';
    },

    /**
     * 判断变量是否为布尔型
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Function} variable 待判断的变量
     * @return {Boolean} 判断的结果
     */
    isBoolean: function () {
      var ks = _rt(true);

      return function (variable) {
        return _rt(variable) === ks;
      };
    }(),

    /**
     * 强化的随机数，可以随机产生给定区间内的数字、随机输出数字内的项
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Array | Number} min 当只传入一个变量时变量应该为数字，否则为所给定区间较小的数字
     * @param {Number} max 所给定区间较大的数字
     * @return {ArrayItem | Number} 返回数组中大一项或者给定区间内的数字
     */
    random: function random(min, max) {
      if (this.isArray(min)) return min[~~(Math.random() * min.length)];
      if (!this.isNumber(max)) max = min || 1, min = 0;
      return min + Math.random() * (max - min);
    },

    /**
     * 阿基米德求模
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} n 当前值
     * @param {Number} m 模
     * @return {Number} 映射到模长内的值
     */
    euclideanModulo: function euclideanModulo(n, m) {
      return (n % m + m) % m;
    },

    /**
     * 边界值域镜像
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} n 当前值
     * @param {Number} min 值域下边界
     * @param {Number} max 值域上边界
     * @return {Number} 值域内反射到的值
     */
    codomainBounce: function codomainBounce(n, min, max) {
      if (n < min) return 2 * min - n;
      if (n > max) return 2 * max - n;
      return n;
    },

    /**
     * 数字区间闭合，避免超出区间
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} x 待闭合到值
     * @param {Number} a 闭合区间左边界
     * @param {Number} b 闭合区间右边界
     * @return {Number} 闭合后的值
     */
    clamp: function clamp(x, a, b) {
      return x < a ? a : x > b ? b : x;
    },

    /**
     * 线性插值
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} x 输入的值
     * @param {Number} min 输入值的下区间
     * @param {Number} max 输入值的上区间
     * @return {Number} 返回的值在区间[0,1]内
     */
    linear: function linear(x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x;
    },

    /**
     * 平滑插值
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} x 输入的值
     * @param {Number} min 输入值的下区间
     * @param {Number} max 输入值的上区间
     * @return {Number} 返回的值在区间[0,1]内
     */
    smoothstep: function smoothstep(x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x * x * (3 - 2 * x);
    },

    /**
     * 更平滑的插值
     *
     * @static
     * @method
     * @memberof JC.Utils
     * @param {Number} x 输入的值
     * @param {Number} min 输入值的下区间
     * @param {Number} max 输入值的上区间
     * @return {Number} 返回的值在区间[0,1]内
     */
    smootherstep: function smootherstep(x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x * x * x * (x * (x * 6 - 15) + 10);
    }
  };

  var PROPS_MAP = {
    o: {
      props: ['alpha'],
      scale: 0.01
    },
    r: {
      props: ['rotation'],
      scale: Math.PI / 180
    },
    p: {
      props: ['x', 'y'],
      scale: 1
    },
    a: {
      props: ['pivotX', 'pivotY'],
      scale: 1
    },
    s: {
      props: ['scaleX', 'scaleY'],
      scale: 0.01
    }
  };

  /**
   * @class
   */
  function Curve() {}

  Curve.prototype = {
    constructor: Curve,
    getPoint: function getPoint(t) {
      console.warn('Curve: Warning, getPoint() not implemented!', t);
      return null;
    },
    getPointAt: function getPointAt(u) {
      var t = this.getUtoTmapping(u);
      return this.getPoint(t);
    },
    getPoints: function getPoints(divisions) {
      if (isNaN(divisions)) divisions = 5;
      var points = [];

      for (var d = 0; d <= divisions; d++) {
        points.push(this.getPoint(d / divisions));
      }

      return points;
    },
    getSpacedPoints: function getSpacedPoints(divisions) {
      if (isNaN(divisions)) divisions = 5;
      var points = [];

      for (var d = 0; d <= divisions; d++) {
        points.push(this.getPointAt(d / divisions));
      }

      return points;
    },
    getLength: function getLength() {
      var lengths = this.getLengths();
      return lengths[lengths.length - 1];
    },
    getLengths: function getLengths(divisions) {
      if (isNaN(divisions)) {
        divisions = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200;
      }

      if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate) {
        return this.cacheArcLengths;
      }

      this.needsUpdate = false;
      var cache = [];
      var current;
      var last = this.getPoint(0);
      var p;
      var sum = 0;
      cache.push(0);

      for (p = 1; p <= divisions; p++) {
        current = this.getPoint(p / divisions);
        sum += current.distanceTo(last);
        cache.push(sum);
        last = current;
      }

      this.cacheArcLengths = cache;
      return cache;
    },
    updateArcLengths: function updateArcLengths() {
      this.needsUpdate = true;
      this.getLengths();
    },
    getUtoTmapping: function getUtoTmapping(u, distance) {
      var arcLengths = this.getLengths();
      var i = 0;
      var il = arcLengths.length;
      var t;
      var targetArcLength;

      if (distance) {
        targetArcLength = distance;
      } else {
        targetArcLength = u * arcLengths[il - 1];
      }

      var low = 0;
      var high = il - 1;
      var comparison;

      while (low <= high) {
        i = Math.floor(low + (high - low) / 2);
        comparison = arcLengths[i] - targetArcLength;

        if (comparison < 0) {
          low = i + 1;
        } else if (comparison > 0) {
          high = i - 1;
        } else {
          high = i;
          break;
        }
      }

      i = high;

      if (arcLengths[i] === targetArcLength) {
        t = i / (il - 1);
        return t;
      }

      var lengthBefore = arcLengths[i];
      var lengthAfter = arcLengths[i + 1];
      var segmentLength = lengthAfter - lengthBefore;
      var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
      t = (i + segmentFraction) / (il - 1);
      return t;
    },
    getTangent: function getTangent(t) {
      var delta = 0.0001;
      var t1 = t - delta;
      var t2 = t + delta; // NOTE: svg and bezier accept out of [0, 1] value
      // if ( t1 < 0 ) t1 = 0;
      // if ( t2 > 1 ) t2 = 1;

      var pt1 = this.getPoint(t1);
      var pt2 = this.getPoint(t2);
      var vec = pt2.clone().sub(pt1);
      return vec.normalize();
    },
    getTangentAt: function getTangentAt(u) {
      var t = this.getUtoTmapping(u);
      return this.getTangent(t);
    }
  };

  /**
   * 贝塞尔曲线类 note: 一般来说超过5阶的贝塞尔曲线并不是非常实用，你可以尝试 JC 的其他曲线类型
   * @class
   * @memberof JC
   * @param {Array}  points  array of points
   */

  function BezierCurve(points) {
    this.points = points;
  }

  BezierCurve.prototype = Object.create(Curve.prototype);

  BezierCurve.prototype.getPoint = function (t, points) {
    var a = points || this.points;
    var len = a.length;
    var rT = 1 - t;
    var l = a.slice(0, len - 1);
    var r = a.slice(1);
    var oP = new pixi_js.Point();

    if (len > 3) {
      var oL = this.getPoint(t, l);
      var oR = this.getPoint(t, r);
      oP.x = rT * oL.x + t * oR.x;
      oP.y = rT * oL.y + t * oR.y;
      return oP;
    } else {
      oP.x = rT * rT * a[0].x + 2 * t * rT * a[1].x + t * t * a[2].x;
      oP.y = rT * rT * a[0].y + 2 * t * rT * a[1].y + t * t * a[2].y;
      return oP;
    }
  };

  /**
   * https://github.com/gre/bezier-easing
   * BezierEasing - use bezier curve for transition easing function
   * by Gaëtan Renaudeau 2014 - 2015 – MIT License
   */
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;
  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
  var float32ArraySupported = typeof Float32Array === 'function';
  /* eslint new-cap: 0 */

  /**
   * 公因式A
   *
   * @param {number} aA1 控制分量
   * @param {number} aA2 控制分量
   * @return {number} 整个公式中的A公因式的值
   */

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  /**
   * 公因式B
   *
   * @param {number} aA1 控制分量1
   * @param {number} aA2 控制分量2
   * @return {number} 整个公式中的B公因式的值
   */


  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  /**
   * 公因式C
   *
   * @param {number} aA1 控制分量1
   * @param {number} aA2 控制分量2
   * @return {number} 整个公式中的C公因式的值
   */


  function C(aA1) {
    return 3.0 * aA1;
  }
  /**
   * 获取aT处的值
   *
   * @param {number} aT 三次贝塞尔曲线的t自变量
   * @param {number} aA1 控制分量1
   * @param {number} aA2 控制分量2
   * @return {number} 三次贝塞尔公式的因变量
   */


  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  /**
   * 获取aT处的斜率
   * @param {number} aT 三次贝塞尔曲线的t自变量
   * @param {number} aA1 控制分量1
   * @param {number} aA2 控制分量2
   * @return {number} 三次贝塞尔公式的导数
   */


  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }
  /**
   *
   * @param {number} aX
   * @param {number} aA
   * @param {number} aB
   * @param {number} mX1
   * @param {number} mX2
   * @return {number} 二分法猜测t的值
   */


  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX;
    var currentT;
    var i = 0;

    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;

      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

    return currentT;
  }
  /**
   * 牛顿迭代算法，进一步的获取精确的T值
   * @param {number} aX
   * @param {number} aGuessT
   * @param {number} mX1
   * @param {number} mX2
   * @return {number} 获取更精确的T值
   */


  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);

      if (currentSlope === 0.0) {
        return aGuessT;
      }

      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }

    return aGuessT;
  }
  /**
   * cubic-bezier曲线的两个控制点，默认起始点为 0，结束点为 1
   *
   * @class
   * @memberof JC
   * @param {number} mX1 控制点1的x分量
   * @param {number} mY1 控制点1的y分量
   * @param {number} mX2 控制点2的x分量
   * @param {number} mY2 控制点2的y分量
   */


  function BezierEasing(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }

    this.mX1 = mX1;
    this.mY1 = mY1;
    this.mX2 = mX2;
    this.mY2 = mY2;
    this.sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

    this._preCompute();
  }

  BezierEasing.prototype._preCompute = function () {
    // Precompute samples table
    if (this.mX1 !== this.mY1 || this.mX2 !== this.mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        this.sampleValues[i] = calcBezier(i * kSampleStepSize, this.mX1, this.mX2);
      }
    }
  };

  BezierEasing.prototype._getTForX = function (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && this.sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }

    --currentSample; // Interpolate to provide an initial guess for t

    var dist = (aX - this.sampleValues[currentSample]) / (this.sampleValues[currentSample + 1] - this.sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, this.mX1, this.mX2);

    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, this.mX1, this.mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, this.mX1, this.mX2);
    }
  };
  /**
   * 通过x轴近似获取y的值
   *
   * @param {number} x x轴的偏移量
   * @return {number} y 与输入值x对应的y值
   */


  BezierEasing.prototype.get = function (x) {
    if (this.mX1 === this.mY1 && this.mX2 === this.mY2) return x;

    if (x === 0) {
      return 0;
    }

    if (x === 1) {
      return 1;
    }

    return calcBezier(this._getTForX(x), this.mY1, this.mY2);
  };

  var bezierPool = {};
  /**
   * 准备好贝塞尔曲线
   * @param {number} mX1 控制点1的x分量
   * @param {number} mY1 控制点1的y分量
   * @param {number} mX2 控制点2的x分量
   * @param {number} mY2 控制点2的y分量
   * @param {string} nm 控制点命名
   * @return {BezierEasing}
   */

  function prepareEaseing(mX1, mY1, mX2, mY2, nm) {
    var str = nm || [mX2, mY2, mX1, mY1].join('_').replace(/\./g, 'p');

    if (bezierPool[str]) {
      return bezierPool[str];
    }

    var bezEasing = new BezierEasing(mX1, mY1, mX2, mY2);
    bezierPool[str] = bezEasing;
  }
  /**
   * 根据进度获取到普通插值
   * @param {number} s  插值起始端点
   * @param {number} e  插值结束端点
   * @param {array}  nm 贝塞尔曲线的名字
   * @param {number} p  插值进度
   * @return {array}
   */


  function getEaseing(s, e, nm, p) {
    var value = [];

    for (var i = 0; i < s.length; i++) {
      var rate = bezierPool[nm[i]].get(p);
      var v = e[i] - s[i];
      value[i] = s[i] + v * rate;
    }

    return value;
  }
  /**
   *
   * @param {BezierCurve} curve
   * @param {string} nm
   * @param {number} p
   * @return {Point}
   */


  function getEaseingPath(curve, nm, p) {
    var rate = bezierPool[nm].get(p);
    var point = curve.getPointAt(rate);
    return [point.x, point.y, 0];
  }

  /**
   * keyframes buffer, cache some status and progress
   */

  var KeyframesBuffer =
  /*#__PURE__*/
  function () {
    /**
     * generate a keyframes buffer
     * @param {Container} element host element
     * @param {object} options layer data
     * @param {number} options.tpf time of pre-frame
     */
    function KeyframesBuffer(element, options) {
      _classCallCheck(this, KeyframesBuffer);

      this.element = element;
      this.layer = Utils.copyJSON(options.layer);
      this.tpf = options.tpf;
      this.iipt = this.layer.ip * this.tpf;
      this.iopt = this.layer.op * this.tpf;
      this.aks = {};
      this.kic = {};
      this.preParser();
    }
    /**
     * preparser keyframes
     * @private
     */


    _createClass(KeyframesBuffer, [{
      key: "preParser",
      value: function preParser() {
        var ks = this.layer.ks;

        for (var key in ks) {
          if (ks[key].a) {
            this.parserDynamic(key);
          } else {
            this.parserStatic(key);
          }
        }
      }
      /**
       * preparser dynamic keyframes
       * @private
       * @param {string} key property
       */

    }, {
      key: "parserDynamic",
      value: function parserDynamic(key) {
        var ksp = this.layer.ks[key];
        var kspk = ksp.k;
        ksp.jcst = kspk[0].t * this.tpf;
        ksp.jcet = kspk[kspk.length - 1].t * this.tpf;

        for (var i = 0; i < kspk.length; i++) {
          var sbk = kspk[i];
          var sek = kspk[i + 1];

          if (sek) {
            sbk.jcst = sbk.t * this.tpf;
            sbk.jcet = sek.t * this.tpf;

            if (Utils.isString(sbk.n) && sbk.ti && sbk.to) {
              prepareEaseing(sbk.o.x, sbk.o.y, sbk.i.x, sbk.i.y);
              var sp = new pixi_js.Point(sbk.s[0], sbk.s[1]);
              var ep = new pixi_js.Point(sbk.e[0], sbk.e[1]);
              var c1 = new pixi_js.Point(sbk.s[0] + sbk.ti[0], sbk.s[1] + sbk.ti[1]);
              var c2 = new pixi_js.Point(sbk.e[0] + sbk.to[0], sbk.e[1] + sbk.to[1]);
              sbk.curve = new BezierCurve([sp, c1, c2, ep]);
            } else {
              for (var _i = 0; _i < sbk.n.length; _i++) {
                prepareEaseing(sbk.o.x[_i], sbk.o.y[_i], sbk.i.x[_i], sbk.i.y[_i]);
              }
            }
          }
        }

        this.aks[key] = ksp;
      }
      /**
       * preparser static keyframes
       * @private
       * @param {string} key property
       */

    }, {
      key: "parserStatic",
      value: function parserStatic(key) {
        var ksp = this.layer.ks[key];
        var kspk = ksp.k;
        if (Utils.isNumber(kspk)) kspk = [kspk];
        this.setValue(key, kspk);
      }
      /**
       * set value to host element
       * @private
       * @param {string} key property
       * @param {array} value value array
       */

    }, {
      key: "setValue",
      value: function setValue(key, value) {
        var props = PROPS_MAP[key].props;
        var scale = PROPS_MAP[key].scale;

        for (var i = 0; i < props.length; i++) {
          var v = value[i];
          this.element[props[i]] = scale * v;
        }
      }
    }]);

    return KeyframesBuffer;
  }();

  /**
   * detect number was in (min, max]
   * @param {number} v   value
   * @param {number} min lower
   * @param {number} max upper
   * @return {boolean} in (min, max] range ?
   */

  function inRange(v, min, max) {
    return v > min && v <= max;
  }
  /**
   * detect current frame index
   * @param {array} steps frames array
   * @param {number} progress current time
   * @return {number} which frame index
   */


  function findStep(steps, progress) {
    var last = steps.length - 1;

    for (var i = 0; i < last; i++) {
      var step = steps[i];

      if (inRange(progress, step.jcst, step.jcet)) {
        return i;
      }
    }
  }
  /**
   * an animation group, store and compute frame information
   */


  var AnimationGroup =
  /*#__PURE__*/
  function () {
    /**
     * pass a data and extra config
     * @param {object} options config and data
     * @param {Object} options.keyframes bodymovin data, which export from AE
     * @param {Number} [options.repeats=0] need repeat somt times?
     * @param {Boolean} [options.infinite=false] play this animation round and round forever
     * @param {Boolean} [options.alternate=false] alternate direction every round
     * @param {Number} [options.wait=0] need wait how much time to start
     * @param {Number} [options.delay=0] need delay how much time to begin, effect every round
     * @param {String} [options.prefix=''] assets url prefix, like link path
     * @param {Number} [options.timeScale=1] animation speed
     */
    function AnimationGroup(options) {
      _classCallCheck(this, AnimationGroup);

      this.prefix = options.prefix || '';
      this.keyframes = options.keyframes;
      this.fr = this.keyframes.fr;
      this.ip = this.keyframes.ip;
      this.op = this.keyframes.op;
      this.tpf = 1000 / this.fr;
      this.tfs = Math.floor(this.op - this.ip);
      this.living = true;
      this.alternate = options.alternate || false;
      this.infinite = options.infinite || false;
      this.repeats = options.repeats || 0;
      this.delay = options.delay || 0;
      this.wait = options.wait || 0;
      this.duration = this.tfs * this.tpf;
      this.progress = 0;
      this.timeScale = Utils.isNumber(options.timeScale) ? options.timeScale : 1;
      this.direction = 1;
      this.progress = 0;
      this.repeatsCut = this.repeats;
      this.delayCut = this.delay;
      this.waitCut = this.wait;
      this.group = new pixi_js.Container();
      this.parserComposition(this.group, this.keyframes.layers);
    }
    /**
     * create a sprite
     * @private
     * @param {object} layerData layer data
     * @return {Sprite}
     */


    _createClass(AnimationGroup, [{
      key: "createSprite",
      value: function createSprite(layerData) {
        var asset = this.getAssets(layerData.refId);
        var up = asset.u + asset.p;
        var url = asset.up || up;
        var sprite = pixi_js.Sprite.fromImage(url);
        return sprite;
      }
      /**
       * create a container
       * @private
       * @param {object} layerData layer data
       * @return {Container}
       */

    }, {
      key: "createDoc",
      value: function createDoc(layerData) {
        var doc = new pixi_js.Container();
        return doc;
      }
      /**
       * init all layers in this composition
       * @private
       * @param {array} layersData layers data
       * @return {object} all display object which inited with layer data
       */

    }, {
      key: "initLayers",
      value: function initLayers(layersData) {
        var layersMap = {};
        var tpf = this.tpf;

        for (var i = layersData.length - 1; i >= 0; i--) {
          var layer = layersData[i];
          var element = null;

          if (layer.ty === 2) {
            element = this.createSprite(layer);
          } else if (layer.ty === 0) {
            element = this.createDoc();
          } else {
            continue;
          }

          element.keyframesBuffer = new KeyframesBuffer(element, {
            layer: layer,
            tpf: tpf
          });
          element.name = layer.nm;
          layersMap[layer.ind] = element;
        }

        return layersMap;
      }
      /**
       * parser composition data
       * @private
       * @param {Container} doc root display object container
       * @param {array} layersData composition data
       */

    }, {
      key: "parserComposition",
      value: function parserComposition(doc, layersData) {
        var layersMap = this.initLayers(layersData);

        for (var i = layersData.length - 1; i >= 0; i--) {
          var layer = layersData[i];
          var item = layersMap[layer.ind];

          if (layer.parent) {
            var parent = layersMap[layer.parent];
            parent.addChild(item);
          } else {
            doc.addChild(item);
          }

          if (layer.ty === 0) {
            var childLayers = this.getAssets(layer.refId).layers;
            this.parserComposition(item, childLayers);
          }
        }
      }
      /**
       * get assets from keyframes assets
       * @private
       * @param {string} id assets refid
       * @return {object} asset object
       */

    }, {
      key: "getAssets",
      value: function getAssets(id) {
        var assets = this.keyframes.assets;

        for (var i = 0; i < assets.length; i++) {
          if (id === assets[i].id) return assets[i];
        }
      }
      /**
       * update with time snippet
       * @param {number} snippetCache snippet
       */

    }, {
      key: "update",
      value: function update(snippetCache) {
        this.updateTime(snippetCache);
        this.updateTransform(this.group);
      }
      /**
       * update timeline with time snippet
       * @param {number} snippet snippet
       */

    }, {
      key: "updateTime",
      value: function updateTime(snippet) {
        var snippetCache = this.direction * this.timeScale * snippet;

        if (this.waitCut > 0) {
          this.waitCut -= Math.abs(snippetCache);
          return;
        }

        if (this.paused || !this.living || this.delayCut > 0) {
          if (this.delayCut > 0) this.delayCut -= Math.abs(snippetCache);
          return;
        }

        this.progress += snippetCache;

        if (this.spill()) {
          if (this.repeatsCut > 0 || this.infinite) {
            if (this.repeatsCut > 0) --this.repeatsCut;
            this.delayCut = this.delay;

            if (this.alternate) {
              this.direction *= -1;
              this.progress = Utils.codomainBounce(this.progress, 0, this.duration);
            } else {
              this.direction = 1;
              this.progress = Utils.euclideanModulo(this.progress, this.duration);
            }
          } else {
            this.living = false;
          }
        }
      }
      /**
       * is this time progress spill the range
       * @return {boolean}
       */

    }, {
      key: "spill",
      value: function spill() {
        var bottomSpill = this.progress <= 0 && this.direction === -1;
        var topSpill = this.progress >= this.duration && this.direction === 1;
        return bottomSpill || topSpill;
      }
      /**
       * update all children transform
       * @private
       * @param {array} group doc
       */

    }, {
      key: "updateTransform",
      value: function updateTransform(group) {
        var length = group.children.length;

        for (var i = 0; i < length; i++) {
          var doc = group.children[i];

          if (doc.children.length > 0) {
            this.updateTransform(doc);
          }

          this.computeChildProps(doc);
        }
      }
      /**
       * compute child transform props
       * @private
       * @param {Container} doc display object container
       * @return {object}
       */

    }, {
      key: "computeChildProps",
      value: function computeChildProps(doc) {
        var pose = {};
        var keyframesBuffer = doc.keyframesBuffer;

        for (var key in keyframesBuffer.aks) {
          if (keyframesBuffer.aks[key]) {
            pose[key] = this.interpolation(doc, keyframesBuffer, key);
            keyframesBuffer.setValue(key, pose[key]);
          }
        }

        return pose;
      }
      /**
       * compute value with keyframes buffer
       * @private
       * @param {Container} doc display object container
       * @param {Container} keyframesBuffer keyframes buffer status
       * @param {string} key which prop
       * @return {array}
       */

    }, {
      key: "interpolation",
      value: function interpolation(doc, keyframesBuffer, key) {
        var ak = keyframesBuffer.aks[key];
        var akk = ak.k;
        var progress = Utils.clamp(this.progress, 0, ak.jcet);
        var skt = ak.jcst;
        var ekt = ak.jcet;
        var invisible = progress < this.iipt;
        if (invisible === doc.visible) doc.visible = !invisible;

        if (progress <= skt) {
          return akk[0].s;
        } else if (progress >= ekt) {
          var last = akk.length - 2;
          return akk[last].e;
        } else {
          var kic = keyframesBuffer.kic[key];

          if (!Utils.isNumber(kic) || !inRange(progress, akk[kic].jcst, akk[kic].jcet)) {
            kic = keyframesBuffer.kic[key] = findStep(akk, progress);
          }

          var frame = akk[kic];
          var rate = (progress - frame.jcst) / (frame.jcet - frame.jcst);

          if (frame.curve) {
            return getEaseingPath(frame.curve, frame.n, rate);
          } else {
            return getEaseing(frame.s, frame.e, frame.n, rate);
          }
        }
      }
    }]);

    return AnimationGroup;
  }();

  /**
   * all animation manager, manage ticker and animation groups
   */

  var AnimationManager =
  /*#__PURE__*/
  function () {
    /**
     * animation manager, optional a ticker param
     * @param {Ticker} _ticker
     */
    function AnimationManager(_ticker) {
      _classCallCheck(this, AnimationManager);

      /**
       * pre-time cache
       *
       * @member {Number}
       * @private
       */
      this.pt = 0;
      /**
       * how long the time through, at this tick
       *
       * @member {Number}
       * @private
       */

      this.snippet = 0;
      /**
       * time scale, just like speed scalar
       *
       * @member {Number}
       * @private
       */

      this.timeScale = 1;
      /**
       * ticker engine
       */

      this.ticker = _ticker || new pixi_js.ticker.Ticker();
      /**
       * all animation groups
       */

      this.groups = [];
      this.update = this.update.bind(this);
      this.start();
    }
    /**
     * add a animationGroup child to array
     * @param {AnimationGroup} child AnimationGroup instance
     * @return {AnimationGroup} child
     */


    _createClass(AnimationManager, [{
      key: "add",
      value: function add(child) {
        var argumentsLength = arguments.length;

        if (argumentsLength > 1) {
          for (var i = 0; i < argumentsLength; i++) {
            /* eslint prefer-rest-params: 0 */
            this.addChild(arguments[i]);
          }
        } else {
          this.groups.push(child);
        }

        return child;
      }
      /**
       * parser a bodymovin data, and post some config for this animation group
       * @param {object} options bodymovin data
       * @return {AnimationGroup}
       * @example
       * ```js
       * var manager = new PIXI.AnimationManager(app.ticker);
       * var ani = manager.parserAnimation({
       *   keyframes: data,
       *   infinite: true,
       * });
       * ```
       */

    }, {
      key: "parserAnimation",
      value: function parserAnimation(options) {
        var animate = new AnimationGroup(options);
        return this.add(animate);
      }
      /**
       * a
       */

    }, {
      key: "start",
      value: function start() {
        this.pt = Date.now();
        this.ticker.add(this.update);
      }
      /**
       * a
       */

    }, {
      key: "stop",
      value: function stop() {
        this.ticker.remove(this.update);
      }
      /**
       * update
       */

    }, {
      key: "update",
      value: function update() {
        this.timeline();
        var snippetCache = this.timeScale * this.snippet;
        var length = this.groups.length;

        for (var i = 0; i < length; i++) {
          var animationGroup = this.groups[i];
          animationGroup.update(snippetCache);
        }
      }
      /**
       * get timeline snippet
       *
       * @private
       */

    }, {
      key: "timeline",
      value: function timeline() {
        var snippet = Date.now() - this.pt;

        if (!this.pt || snippet > 200) {
          this.pt = Date.now();
          snippet = Date.now() - this.pt;
        }

        this.pt += snippet;
        this.snippet = snippet;
      }
    }]);

    return AnimationManager;
  }();

  exports.AnimationGroup = AnimationGroup;
  exports.AnimationManager = AnimationManager;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map

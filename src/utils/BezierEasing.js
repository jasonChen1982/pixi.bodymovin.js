/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

const NEWTON_ITERATIONS = 4;
const NEWTON_MIN_SLOPE = 0.001;
const SUBDIVISION_PRECISION = 0.0000001;
const SUBDIVISION_MAX_ITERATIONS = 10;


let kSplineTableSize = 11;
let kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

let float32ArraySupported = typeof Float32Array === 'function';

/* eslint new-cap: 0 */

/**
 * common factor A
 *
 * @param {number} aA1 control point 1
 * @param {number} aA2 control point 2
 * @return {number} common factor A computed result
 */
function A(aA1, aA2) {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}

/**
 * common factor B
 *
 * @param {number} aA1 control point 1
 * @param {number} aA2 control point 2
 * @return {number} common factor B computed result
 */
function B(aA1, aA2) {
  return 3.0 * aA2 - 6.0 * aA1;
}

/**
 * common factor C
 *
 * @param {number} aA1 control point 1
 * @param {number} aA2 control point 2
 * @return {number} common factor C computed result
 */
function C(aA1) {
  return 3.0 * aA1;
}

/**
 * get value when t at aT
 *
 * @param {number} aT progress t
 * @param {number} aA1 control point 1
 * @param {number} aA2 control point 2
 * @return {number} bezier curve computed result
 */
function calcBezier(aT, aA1, aA2) {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}

/**
 * get slope value when t at aT
 *
 * @param {number} aT progress t
 * @param {number} aA1 control point 1
 * @param {number} aA2 control point 2
 * @return {number} bezier curve's slope computed result
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
 * @return {number} binary-subdivide search
 */
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (
    Math.abs(currentX) > SUBDIVISION_PRECISION
    &&
    ++i < SUBDIVISION_MAX_ITERATIONS
  );
  return currentT;
}

/**
 * Newton-Raphson iterate to estimate value faster
 * @param {number} aX
 * @param {number} aGuessT
 * @param {number} mX1
 * @param {number} mX2
 * @return {number} estimate value
 */
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
    let currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0.0) {
      return aGuessT;
    }
    let currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}

/**
 * use cubic-bezier get bezier-easing, when start p0(0, 0) and end p3(1, 1)
 *
 * @class
 * @memberof JC
 * @param {number} mX1 control p1 component-x
 * @param {number} mY1 control p1 component-y
 * @param {number} mX2 control p2 component-x
 * @param {number} mY2 control p3 component-y
 */
function BezierEasing(mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }
  this.mX1 = mX1;
  this.mY1 = mY1;
  this.mX2 = mX2;
  this.mY2 = mY2;
  this.sampleValues = float32ArraySupported ?
    new Float32Array(kSplineTableSize):
    new Array(kSplineTableSize);

  this._preCompute();
}

BezierEasing.prototype._preCompute = function() {
  // Precompute samples table
  if (this.mX1 !== this.mY1 || this.mX2 !== this.mY2) {
    for (let i = 0; i < kSplineTableSize; ++i) {
      this.sampleValues[i] = calcBezier(
          i * kSampleStepSize,
          this.mX1,
          this.mX2
      );
    }
  }
};

BezierEasing.prototype._getTForX = function(aX) {
  let intervalStart = 0.0;
  let currentSample = 1;
  let lastSample = kSplineTableSize - 1;

  for (
    ;
    currentSample !== lastSample && this.sampleValues[currentSample] <= aX;
    ++currentSample
  ) {
    intervalStart += kSampleStepSize;
  }
  --currentSample;

  // Interpolate to provide an initial guess for t
  let dist = (aX - this.sampleValues[currentSample]) /
  (this.sampleValues[currentSample + 1] - this.sampleValues[currentSample]);
  let guessForT = intervalStart + dist * kSampleStepSize;

  let initialSlope = getSlope(guessForT, this.mX1, this.mX2);
  if (initialSlope >= NEWTON_MIN_SLOPE) {
    return newtonRaphsonIterate(aX, guessForT, this.mX1, this.mX2);
  } else if (initialSlope === 0.0) {
    return guessForT;
  } else {
    return binarySubdivide(
        aX,
        intervalStart,
        intervalStart + kSampleStepSize,
        this.mX1,
        this.mX2
    );
  }
};

/**
 * get the y value from give x
 *
 * @param {number} x the x value
 * @return {number} y estimate y value
 */
BezierEasing.prototype.get = function(x) {
  if (this.mX1 === this.mY1 && this.mX2 === this.mY2) return x;
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return calcBezier(this._getTForX(x), this.mY1, this.mY2);
};

export { BezierEasing };


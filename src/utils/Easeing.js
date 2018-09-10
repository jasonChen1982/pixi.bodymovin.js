
import { BezierEasing } from './BezierEasing';
const bezierPool = {};

/**
 * create a bezier curve by control point, and push it to cache
 * @param {number} mX1 control p1 component-x
 * @param {number} mY1 control p1 component-y
 * @param {number} mX2 control p2 component-x
 * @param {number} mY2 control p3 component-y
 * @param {string} nm curve name
 * @return {BezierEasing}
 */
function prepareEaseing(mX1, mY1, mX2, mY2, nm) {
  const str = nm || [mX2, mY2, mX1, mY1].join('_').replace(/\./g, 'p');
  if (bezierPool[str]) {
    return bezierPool[str];
  }
  const bezEasing = new BezierEasing(mX1, mY1, mX2, mY2);
  bezierPool[str] = bezEasing;
}

/**
 * get easeing value by curve name and progress
 * @param {number} s  lerp begin value
 * @param {number} e  lerp end value
 * @param {array}  nm curve name
 * @param {number} p  progress
 * @return {array}
 */
function getEaseing(s, e, nm, p) {
  const value = [];
  for (let i = 0; i < s.length; i++) {
    const rate = bezierPool[nm[i]].get(p);
    const v = e[i] - s[i];
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
  const rate = bezierPool[nm].get(p);
  const point = curve.getPointAt(rate);
  return [point.x, point.y, 0];
}

export { prepareEaseing, getEaseing, getEaseingPath };

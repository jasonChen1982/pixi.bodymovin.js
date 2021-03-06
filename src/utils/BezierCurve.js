import {
  Point,
} from 'pixi.js';
import {
  Curve,
} from './Curve';

/**
 * bezier curve class
 * @class
 * @param {Array}  points  array of points
 */
function BezierCurve( points ) {
  this.points = points;
}

BezierCurve.prototype = Object.create( Curve.prototype );

/**
 * get point by progress t
 * @param {number} t number of in [0, 1]
 * @param {array} points some point
 * @return {Point}
 */
BezierCurve.prototype.getPoint = function(t, points) {
  const a = points || this.points;
  const len = a.length;
  const rT = 1 - t;
  const l = a.slice(0, len - 1);
  const r = a.slice(1);
  const oP = new Point();
  if (len > 3) {
    const oL = this.getPoint(t, l);
    const oR = this.getPoint(t, r);
    oP.x = rT * oL.x + t * oR.x;
    oP.y = rT * oL.y + t * oR.y;
    return oP;
  } else {
    oP.x = rT * rT * a[0].x
      + 2 * t * rT * a[1].x
          + t * t * a[2].x;
    oP.y = rT * rT * a[0].y
      + 2 * t * rT * a[1].y
          + t * t * a[2].y;
    return oP;
  }
};

export { BezierCurve };

import {
  Point,
} from 'pixi.js';

/**
 * get a distance to point-v
 * @param {Point} v target point
 * @return {number} distance
 */
Point.prototype.distanceTo = function( v ) {
  return Math.sqrt( this.distanceToSquared( v ) );
};

/**
 * get a distance squared to point-v
 * @param {Point} v target point
 * @return {number} distance squared
 */
Point.prototype.distanceToSquared = function( v ) {
  const dx = this.x - v.x;
  const dy = this.y - v.y;
  return dx * dx + dy * dy;
};

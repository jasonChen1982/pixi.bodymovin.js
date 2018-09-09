import {
  Point,
} from 'pixi.js';

Point.prototype.distanceTo = function( v ) {
  return Math.sqrt( this.distanceToSquared( v ) );
};

Point.prototype.distanceToSquared = function( v ) {
  const dx = this.x - v.x;
  const dy = this.y - v.y;
  return dx * dx + dy * dy;
};

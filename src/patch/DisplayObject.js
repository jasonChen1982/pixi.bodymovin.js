import {
  DisplayObject,
} from 'pixi.js';

/**
 * add some patch
 */
Object.defineProperties(DisplayObject.prototype, {
  /**
   * An alias to scale.x
   * @member {number}
   */
  scaleX: {
    get: function() {
      return this.scale.x;
    },
    set: function(value) {
      this.scale.x = value;
    },
  },
  /**
   * An alias to scale.x
   * @member {number}
   */
  scaleY: {
    get: function() {
      return this.scale.y;
    },
    set: function(value) {
      this.scale.y = value;
    },
  },
  /**
   * An alias to pivot.x
   * @member {number}
   */
  pivotX: {
    get: function() {
      return this.pivot.x;
    },
    set: function(value) {
      this.pivot.x = value;
    },
  },
  /**
   * An alias to pivot.x
   * @member {number}
   */
  pivotY: {
    get: function() {
      return this.pivot.y;
    },
    set: function(value) {
      this.pivot.y = value;
    },
  },
});

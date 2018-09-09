import {
  ticker,
} from 'pixi.js';
import './patch/DisplayObject';
import './patch/Point';
// import KeyframesManager from './core/KeyframesManager';
import AnimationGroup from './core/AnimationGroup';

/**
 * all animation manager
 */
class AnimationManager {
  /**
   * animation manager
   * @param {a} _ticker
   */
  constructor(_ticker) {
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

    this.timeScale = 1;
    this.ticker = _ticker || new ticker.Ticker();
    this.groups = [];
    // this.KSManager = new KeyframesManager();

    this.update = this.update.bind(this);

    this.start();
  }

  /**
   * a
   * @param {a} child aa
   * @return {a} a
   */
  add(child) {
    const argumentsLength = arguments.length;

    if (argumentsLength > 1) {
      for (let i = 0; i < argumentsLength; i++) {
        /* eslint prefer-rest-params: 0 */
        this.addChild(arguments[i]);
      }
    } else {
      this.groups.push(child);
    }

    return child;
  }

  /**
   * aa
   * @param {object} options aa
   * @return {AnimationGroup}
   */
  parserAnimation(options) {
    const animate = new AnimationGroup(options);
    return this.add(animate);
  }

  /**
   * a
   */
  start() {
    this.pt = Date.now();
    this.ticker.add(this.update);
  }

  /**
   * a
   */
  stop() {
    this.ticker.remove(this.update);
  }

  /**
   * update
   */
  update() {
    this.timeline();
    const snippetCache = this.timeScale * this.snippet;
    const length = this.groups.length;
    for (let i = 0; i < length; i++) {
      const animationGroup = this.groups[i];
      animationGroup.update(snippetCache);
    }
  }

  /**
   * get timeline snippet
   *
   * @private
   */
  timeline() {
    let snippet = Date.now() - this.pt;
    if (!this.pt || snippet > 200) {
      this.pt = Date.now();
      snippet = Date.now() - this.pt;
    }
    this.pt += snippet;
    this.snippet = snippet;
  }
}


export {
  AnimationGroup,
  AnimationManager,
};

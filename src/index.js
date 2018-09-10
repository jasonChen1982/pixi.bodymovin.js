import {
  ticker,
} from 'pixi.js';
import './patch/DisplayObject';
import './patch/Point';
import AnimationGroup from './core/AnimationGroup';

/**
 * all animation manager, manage ticker and animation groups
 */
class AnimationManager {
  /**
   * animation manager, optional a ticker param
   * @param {Ticker} _ticker
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
    this.ticker = _ticker || new ticker.Ticker();

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

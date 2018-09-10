import {
  ticker,
} from 'pixi.js';
import './patch/DisplayObject';
import './patch/Point';
import AnimationGroup from './core/AnimationGroup';

/**
 * all animation manager, manage ticker and animation groups
   * @example
   * ```js
   * var manager = new PIXI.AnimationManager(app.ticker);
   * var ani = manager.parserAnimation({
   *   keyframes: data,
   *   infinite: true,
   * });
   * ```
 * @class
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
     */
    this.timeScale = 1;

    /**
     * mark the manager was pause or not
     *
     * @member {Boolean}
     */
    this.paused = false;

    /**
     * ticker engine
     * @private
     */
    this.ticker = _ticker || new ticker.Ticker();

    /**
     * all animation groups
     * @private
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
   * @param {Object} options.keyframes bodymovin data, which export from AE
   * @param {Number} [options.repeats=0] need repeat somt times?
   * @param {Boolean} [options.infinite=false] play this animation round and round forever
   * @param {Boolean} [options.alternate=false] alternate direction every round
   * @param {Number} [options.wait=0] need wait how much time to start
   * @param {Number} [options.delay=0] need delay how much time to begin, effect every round
   * @param {String} [options.prefix=''] assets url prefix, like link path
   * @param {Number} [options.timeScale=1] animation speed
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
   * set animation speed, time scale
   * @param {number} speed
   */
  setSpeed(speed) {
    this.timeScale = speed;
  }

  /**
   * start update loop
   * @return {this}
   */
  start() {
    this.pt = Date.now();
    this.ticker.add(this.update);
    return this;
  }

  /**
   * stop update loop
   * @return {this}
   */
  stop() {
    this.ticker.remove(this.update);
    return this;
  }

  /**
   * pause all animation groups
   * @return {this}
   */
  pause() {
    this.paused = true;
    return this;
  }

  /**
   * pause all animation groups
   * @return {this}
   */
  resume() {
    this.paused = false;
    return this;
  }

  /**
   * update
   * @private
   */
  update() {
    this.timeline();
    if (this.paused) return;
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

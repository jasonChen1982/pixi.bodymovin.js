import {
  Container,
  Sprite,
} from 'pixi.js';
import Utils from '../utils/Utils';
import KeyframesBuffer from './KeyframesBuffer';
import { getEaseing, getEaseingPath } from '../utils/Easeing';

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
  const last = steps.length - 1;
  for (let i = 0; i < last; i++) {
    const step = steps[i];
    if (inRange(progress, step.jcst, step.jcet)) {
      return i;
    }
  }
}

/**
 * an animation group, store and compute frame information
 */
export default class AnimationGroup {
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
  constructor(options) {
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

    this.timeScale = Utils.isNumber(options.timeScale) ?
      options.timeScale :
      1;

    this.direction = 1;
    this.progress = 0;
    this.repeatsCut = this.repeats;
    this.delayCut = this.delay;
    this.waitCut = this.wait;

    this.paused = false;

    this.group = new Container();

    this.parserComposition(this.group, this.keyframes.layers);
  }

  /**
   * create a sprite
   * @private
   * @param {object} layerData layer data
   * @return {Sprite}
   */
  createSprite(layerData) {
    const asset = this.getAssets(layerData.refId);
    const up = asset.u + asset.p;
    const url = asset.up || up;
    const sprite = Sprite.fromImage(url);
    return sprite;
  }

  /**
   * create a container
   * @private
   * @param {object} layerData layer data
   * @return {Container}
   */
  createDoc(layerData) {
    const doc = new Container();
    return doc;
  }

  /**
   * init all layers in this composition
   * @private
   * @param {array} layersData layers data
   * @return {object} all display object which inited with layer data
   */
  initLayers(layersData) {
    const layersMap = {};
    const tpf = this.tpf;
    for (let i = layersData.length - 1; i >= 0; i--) {
      const layer = layersData[i];
      let element = null;
      if (layer.ty === 2) {
        element = this.createSprite(layer);
      } else if (layer.ty === 0) {
        element = this.createDoc();
      } else {
        continue;
      }

      element.keyframesBuffer = new KeyframesBuffer(element, {
        layer,
        tpf,
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
  parserComposition(doc, layersData) {
    const layersMap = this.initLayers(layersData);
    for (let i = layersData.length - 1; i >= 0; i--) {
      const layer = layersData[i];
      const item = layersMap[layer.ind];
      if (!item) continue;
      if (layer.parent) {
        const parent = layersMap[layer.parent];
        parent.addChild(item);
      } else {
        doc.addChild(item);
      }
      if (layer.ty === 0) {
        const childLayers = this.getAssets(layer.refId).layers;
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
  getAssets(id) {
    const assets = this.keyframes.assets;
    for (let i = 0; i < assets.length; i++) {
      if (id === assets[i].id) return assets[i];
    }
  }

  /**
   * update with time snippet
   * @param {number} snippetCache snippet
   */
  update(snippetCache) {
    this.updateTime(snippetCache);
    this.updateTransform(this.group);
  }

  /**
   * update timeline with time snippet
   * @param {number} snippet snippet
   */
  updateTime(snippet) {
    const snippetCache = this.direction * this.timeScale * snippet;
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
  spill() {
    const bottomSpill = this.progress <= 0 && this.direction === -1;
    const topSpill = this.progress >= this.duration && this.direction === 1;
    return bottomSpill || topSpill;
  }

  /**
   * update all children transform
   * @private
   * @param {array} group doc
   */
  updateTransform(group) {
    const length = group.children.length;
    for (let i = 0; i < length; i++) {
      const doc = group.children[i];
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
  computeChildProps(doc) {
    const pose = {};
    const keyframesBuffer = doc.keyframesBuffer;
    for (const key in keyframesBuffer.aks) {
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
  interpolation(doc, keyframesBuffer, key) {
    const ak = keyframesBuffer.aks[key];
    const akk = ak.k;
    const progress = Utils.clamp(this.progress, 0, ak.jcet);
    const skt = ak.jcst;
    const ekt = ak.jcet;
    const invisible = progress < this.iipt;
    if (invisible === doc.visible) doc.visible = !invisible;

    if (progress <= skt) {
      return akk[0].s;
    } else if (progress >= ekt) {
      const last = akk.length - 2;
      return akk[last].e;
    } else {
      let kic = keyframesBuffer.kic[key];
      if (
        !Utils.isNumber(kic) ||
        !inRange(progress, akk[kic].jcst, akk[kic].jcet)
      ) {
        kic = keyframesBuffer.kic[key] = findStep(akk, progress);
      }
      const frame = akk[kic];
      const rate = (progress - frame.jcst) / (frame.jcet - frame.jcst);
      if (frame.curve) {
        return getEaseingPath(frame.curve, frame.n, rate);
      } else {
        return getEaseing(frame.s, frame.e, frame.n, rate);
      }
    }
  }

  /**
   * set animation speed, time scale
   * @param {number} speed
   */
  setSpeed(speed) {
    this.timeScale = speed;
  }

  /**
   * pause this animation group
   * @return {this}
   */
  pause() {
    this.paused = true;
    return this;
  }

  /**
   * pause this animation group
   * @return {this}
   */
  resume() {
    this.paused = false;
    return this;
  }
}

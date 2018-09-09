import {
  Container,
  Sprite,
} from 'pixi.js';
import Utils from '../utils/Utils';
import KeyframesBuffer from './KeyframesBuffer';
import { getEaseing, getEaseingPath } from '../utils/Easeing';

/**
 * 判断数值是否在(min, max]区间内
 * @param {number} v   待比较的值
 * @param {number} min 最小区间
 * @param {number} max 最大区间
 * @return {boolean} 是否在(min, max]区间内
 */
function inRange(v, min, max) {
  return v > min && v <= max;
}

/**
 * 判断当前进度在哪一帧内
 * @param {array} steps 帧数组
 * @param {number} progress 当前进度
 * @return {number} 当前进度停留在第几帧
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
 * an animation parser
 */
export default class AnimationGroup {
  /**
   * pass a data and extra config
   * @param {object} options config and data
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


    this.group = new Container();

    this.parserComposition(this.group, this.keyframes.layers);
  }

  /**
   * create a sprite
   * @param {object} layerData layer data
   * @return {Sprite}
   */
  createSprite(layerData) {
    // this.getAssets();
    const asset = this.getAssets(layerData.refId);
    const up = asset.u + asset.p;
    const url = asset.up || up;
    const sprite = Sprite.fromImage(url);
    return sprite;
  }

  /**
   * create a sprite
   * @param {object} layerData layer data
   * @return {Sprite}
   */
  createDoc(layerData) {
    const doc = new Container();
    return doc;
  }

  /**
   * 初始化合成组内的图层
   * @private
   * @param {array} layersData 图层数组
   * @return {object} 该图层的所有渲染对象
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
   * 解析合成组
   * @private
   * @param {Container} doc 动画元素的渲染组
   * @param {array} layersData 预合成数组
   */
  parserComposition(doc, layersData) {
    const layersMap = this.initLayers(layersData);
    for (let i = layersData.length - 1; i >= 0; i--) {
      const layer = layersData[i];
      const item = layersMap[layer.ind];
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
   * @private
   * @param {string} id 资源的refid
   * @return {object} 资源配置
   */
  getAssets(id) {
    const assets = this.keyframes.assets;
    for (let i = 0; i < assets.length; i++) {
      if (id === assets[i].id) return assets[i];
    }
  }

  /**
   * snippet
   * @param {number} snippetCache snippet
   */
  update(snippetCache) {
    this.updateTime(snippetCache);
    this.updateTransform(this.group);
  }

  /**
   * snippet
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
   * a
   * @return {boolean}
   */
  spill() {
    const bottomSpill = this.progress <= 0 && this.direction === -1;
    const topSpill = this.progress >= this.duration && this.direction === 1;
    return bottomSpill || topSpill;
  }

  /**
   * 计算下一帧状态
   * @private
   * @param {array} group a
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
   * 计算下一帧状态
   * @private
   * @param {Container} doc a
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
   * 预计算关键帧属性值
   * @private
   * @param {Container} doc 关键帧配置
   * @param {Container} keyframesBuffer 关键帧配置
   * @param {string} key 关键帧配置
   * @return {array}
   */
  interpolation(doc, keyframesBuffer, key) {// kic
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
}

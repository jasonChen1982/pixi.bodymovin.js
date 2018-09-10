import {
  Point,
} from 'pixi.js';
import Utils from '../utils/Utils';
import { PROPS_MAP } from '../utils/PropsMap';
import { BezierCurve } from '../utils/BezierCurve';
import { prepareEaseing } from '../utils/Easeing';

/**
 * keyframes buffer, cache some status and progress
 */
export default class KeyframesBuffer {
  /**
   * generate a keyframes buffer
   * @param {Container} element host element
   * @param {object} options layer data
   * @param {number} options.tpf time of pre-frame
   */
  constructor(element, options) {
    this.element = element;

    this.layer = Utils.copyJSON(options.layer);

    this.tpf = options.tpf;

    this.iipt = this.layer.ip * this.tpf;
    this.iopt = this.layer.op * this.tpf;

    this.aks = {};
    this.kic = {};

    this.preParser();
  }

  /**
   * preparser keyframes
   * @private
   */
  preParser() {
    const ks = this.layer.ks;
    for (const key in ks) {
      if (ks[key].a) {
        this.parserDynamic(key);
      } else {
        this.parserStatic(key);
      }
    }
  }

  /**
   * preparser dynamic keyframes
   * @private
   * @param {string} key property
   */
  parserDynamic(key) {
    const ksp = this.layer.ks[key];
    const kspk = ksp.k;

    ksp.jcst = kspk[0].t * this.tpf;
    ksp.jcet = kspk[kspk.length - 1].t * this.tpf;

    for (let i = 0; i < kspk.length; i++) {
      const sbk = kspk[i];
      const sek = kspk[i + 1];
      if (sek) {
        sbk.jcst = sbk.t * this.tpf;
        sbk.jcet = sek.t * this.tpf;
        if (Utils.isString(sbk.n) && sbk.ti && sbk.to) {
          prepareEaseing(sbk.o.x, sbk.o.y, sbk.i.x, sbk.i.y);
          const sp = new Point(sbk.s[0], sbk.s[1]);
          const ep = new Point(sbk.e[0], sbk.e[1]);
          const c1 = new Point(sbk.s[0] + sbk.ti[0], sbk.s[1] + sbk.ti[1]);
          const c2 = new Point(sbk.e[0] + sbk.to[0], sbk.e[1] + sbk.to[1]);
          sbk.curve = new BezierCurve([sp, c1, c2, ep]);
        } else {
          for (let i = 0; i < sbk.n.length; i++) {
            prepareEaseing(sbk.o.x[i], sbk.o.y[i], sbk.i.x[i], sbk.i.y[i]);
          }
        }
      }
    }

    this.aks[key] = ksp;
  }

  /**
   * preparser static keyframes
   * @private
   * @param {string} key property
   */
  parserStatic(key) {
    const ksp = this.layer.ks[key];
    let kspk = ksp.k;
    if (Utils.isNumber(kspk)) kspk = [kspk];

    this.setValue(key, kspk);
  }

  /**
   * set value to host element
   * @private
   * @param {string} key property
   * @param {array} value value array
   */
  setValue(key, value) {
    const props = PROPS_MAP[key].props;
    const scale = PROPS_MAP[key].scale;
    for (let i = 0; i < props.length; i++) {
      const v = value[i];
      this.element[props[i]] = scale * v;
    }
  }
}

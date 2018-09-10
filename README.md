# pixi.bodymovin

[![npm](https://img.shields.io/npm/v/pixi.bodymovin.svg?style=flat-square)](https://github.com/jasonChen1982/pixi.bodymovin.js)
[![javascript style guide](https://img.shields.io/badge/code_style-google-brightgreen.svg)](https://google.github.io/styleguide/jsguide.html)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

a bodymovin animation data parser for `pixi.js`, seamless help `pixi.js` build AE transform animation

# install

```sh
npm install -S pixi.bodymovin
```

# usage

```javascript
import { Application } from 'pixi.js';
import { AnimationManager } from 'pixi.bodymovin';
import data from './animations/data.js';

const width = window.innerWidth;
const height = window.innerHeight;
const app = new Application(width, height, {backgroundColor : 0xffffff});
document.body.appendChild(app.view);

const animationManager = new AnimationManager(app.ticker);

const anim = manager.parserAnimation({
  keyframes: data,
  prefix: '',
  infinite: true,
});

app.stage.addChild(anim.group);

```

## Documentation
[documentation][documentation]

## Examples
- [examples lucky][examples-lucky]
- [examples cloud][examples-cloud]
- [examples gift][examples-gift]
- [examples pop][examples-pop]


[documentation]:https://jasonchen1982.github.io/pixi.bodymovin.js/docs/ "pixi.bodymovin documention page"
[examples-lucky]:https://jasonchen1982.github.io/pixi.bodymovin.js/examples/ae-lucky/ "pixi.bodymovin examples page of lucky"
[examples-cloud]:https://jasonchen1982.github.io/pixi.bodymovin.js/examples/ae-cloud/ "pixi.bodymovin examples page of cloud"
[examples-gift]:https://jasonchen1982.github.io/pixi.bodymovin.js/examples/ae-gift/ "pixi.bodymovin examples page of gift"
[examples-pop]:https://jasonchen1982.github.io/pixi.bodymovin.js/examples/ae-pop/ "pixi.bodymovin examples page of pop"

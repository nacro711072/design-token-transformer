
import { formats, transformGroups } from 'style-dictionary/enums';

import sizePxTransform from './sizePx.js';
import webShadowsTransform from './webShadows.js';
import webRadiusTransform from './webRadius.js';
import webPaddingTransform from './webPadding.js';
import webFontTransform from './webFont.js';
import webGradientTransform from './webGradient.js';
import colorToRgbaStringTransform from '../common/colorToRgbaString.js';
import formatCss from './formatCss.js';


export default {
  transform: {
    'size/px': sizePxTransform,
    'web/shadow': webShadowsTransform,
    'web/radius': webRadiusTransform,
    'web/padding': webPaddingTransform,
    'web/font': webFontTransform,
    'web/gradient': webGradientTransform,
    'color/hex8ToRgba': colorToRgbaStringTransform
  },
  transformGroup: {
    'custom/css': transformGroups.css.concat([
      'size/px',
      'web/shadow',
      'web/radius',
      'web/padding',
      'web/font',
      'web/gradient',
      'color/hex8ToRgba'
    ])
  },
  format: {
    'custom/css': formatCss
  },
  action: {}
}
import p5 from 'p5';
import p5Svg from 'p5.js-svg'; // NEU: SVG Plugin importieren
import { setupUI } from './src/ui.js';
import { sketch } from './src/sketch.js';

// NEU: Das Plugin in p5 einklinken
p5Svg(p5);

const myP5 = new p5(sketch);
setupUI(myP5);
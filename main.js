import p5 from 'p5';
import { setupUI } from './src/ui.js';
import { sketch } from './src/sketch.js';

// 1. p5 Engine starten und in einer Variable speichern
const myP5 = new p5(sketch);

// 2. Die Instanz an die UI übergeben
setupUI(myP5);
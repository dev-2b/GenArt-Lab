import p5 from 'p5';
import { setupUI } from './src/ui.js';
import { sketch } from './src/sketch.js';

// 1. UI aufbauen
setupUI();

// 2. p5 Engine starten
new p5(sketch);
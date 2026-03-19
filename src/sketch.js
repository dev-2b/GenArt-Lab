import { PARAMS } from './ui.js';

export const sketch = (p) => {
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
        // Bindet das Canvas an unser div in der index.html
        canvas.parent('canvas-container');
    };

    p.draw = () => {
        p.background(PARAMS.hintergrund);

        p.fill(PARAMS.farbe);
        p.noStroke();

        p.circle(p.width / 2, p.height / 2, PARAMS.groesse);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
    };
};
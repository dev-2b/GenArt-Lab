// src/sketch.js
import { state, ALGORITHMEN, setCanvasSize } from './ui.js';

export const sketch = (p) => {
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
        canvas.parent('canvas-container');
        p.angleMode(p.DEGREES);
        setCanvasSize(p.width, p.height); // Teilt der UI die Canvas-Größe mit
    };

    p.draw = () => {
        p.background(state.hintergrund);

        for (let i = 0; i < state.ebenen.length; i++) {
            const ebene = state.ebenen[i];
            const algo = ALGORITHMEN[ebene.typ]; // Passenden Algorithmus aus der Registry holen

            if (algo) {
                p.push();
                p.translate(ebene.x, ebene.y);

                // Die Render-Funktion des jeweiligen Moduls aufrufen
                algo.zeichne(p, ebene);

                p.pop();
            }
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
        setCanvasSize(p.width, p.height);
    };
};
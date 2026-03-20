import { state } from './ui.js';

export const sketch = (p) => {
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
        canvas.parent('canvas-container');
        p.angleMode(p.DEGREES);
    };

    p.draw = () => {
        p.background(state.hintergrund);

        // Schleife durch alle Objekte auf der Leinwand
        for (let i = 0; i < state.ebenen.length; i++) {
            const ebene = state.ebenen[i];

            // Zustand vor dem Zeichnen dieses spezifischen Objekts speichern
            p.push();

            // Nullpunkt an die X/Y Koordinaten des Objekts verschieben
            p.translate(ebene.x, ebene.y);

            if (ebene.typ === 'baum') {
                p.stroke(ebene.farbe);
                zeichneAst(ebene.startLaenge, ebene.tiefe, ebene.winkel, ebene.verkuerzung);
            }
            // Hier kommen später "else if (ebene.typ === 'kreis')" etc. hin

            // Zustand nach dem Zeichnen wiederherstellen
            p.pop();
        }
    };

    // Die Funktion erwartet jetzt die Parameter als Argumente,
    // da sie nicht mehr aus einem einzigen globalen Objekt kommen.
    function zeichneAst(laenge, tiefe, winkel, verkuerzung) {
        if (tiefe === 0) return;

        p.strokeWeight(tiefe);
        p.line(0, 0, 0, -laenge);
        p.translate(0, -laenge);

        p.push();
        p.rotate(winkel);
        zeichneAst(laenge * verkuerzung, tiefe - 1, winkel, verkuerzung);
        p.pop();

        p.push();
        p.rotate(-winkel);
        zeichneAst(laenge * verkuerzung, tiefe - 1, winkel, verkuerzung);
        p.pop();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
    };
};
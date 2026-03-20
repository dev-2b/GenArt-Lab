import { PARAMS } from './ui.js';

export const sketch = (p) => {
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
        canvas.parent('canvas-container');
        p.angleMode(p.DEGREES); // Wir rechnen in Grad statt in Bogenmaß (leichter verständlich)
    };

    p.draw = () => {
        p.background(PARAMS.hintergrund);
        p.stroke(PARAMS.farbe);

        // Den Nullpunkt (0,0) des Koordinatensystems in die Mitte des unteren Bildschirmrands verschieben
        p.translate(p.width / 2, p.height);

        // Die rekursive Funktion für den Stamm starten
        zeichneAst(PARAMS.startLaenge, PARAMS.tiefe);
    };

    function zeichneAst(laenge, tiefe) {
        // Abbruchbedingung: Wenn Tiefe 0 erreicht ist, stoppt die Rekursion für diesen Zweig
        if (tiefe === 0) return;

        // Je geringer die Tiefe, desto dünner der Ast
        p.strokeWeight(tiefe);

        // Eine Linie nach "oben" zeichnen (negative Y-Richtung)
        p.line(0, 0, 0, -laenge);

        // Den Nullpunkt an das Ende der gerade gezeichneten Linie verschieben
        p.translate(0, -laenge);

        // Rechten Ast zeichnen
        p.push();                 // Aktuelles Koordinatensystem (Position & Drehung) speichern
        p.rotate(PARAMS.winkel);  // Nach rechts drehen
        zeichneAst(laenge * PARAMS.verkuerzung, tiefe - 1); // Funktion ruft sich selbst auf (kürzer, Tiefe - 1)
        p.pop();                  // Zum gespeicherten Koordinatensystem zurückkehren

        // Linken Ast zeichnen
        p.push();
        p.rotate(-PARAMS.winkel); // Nach links drehen
        zeichneAst(laenge * PARAMS.verkuerzung, tiefe - 1);
        p.pop();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.8, p.windowHeight * 0.8);
    };
};
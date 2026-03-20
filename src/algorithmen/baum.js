// src/algorithmen/baum.js

export const baumAlgo = {
    // Eindeutiger Identifikator
    typ: 'baum',

    // 1. Definiert die Startparameter, wenn ein Baum hinzugefügt wird
    erstelleDefaults: () => {
        return {
            x: 400,
            y: 600,
            startLaenge: 100,
            winkel: 25,
            verkuerzung: 0.67,
            tiefe: 8,
            farbe: '#ffffff'
        };
    },

    // 2. Baut die spezifischen Tweakpane-Regler für diesen Baum
    baueUI: (folder, ebene) => {
        folder.addBinding(ebene, 'startLaenge', { min: 20, max: 300, step: 1, label: 'Länge' });
        folder.addBinding(ebene, 'winkel', { min: 0, max: 90, step: 1, label: 'Winkel' });
        folder.addBinding(ebene, 'verkuerzung', { min: 0.5, max: 0.85, step: 0.01, label: 'Verkürzung' });
        folder.addBinding(ebene, 'tiefe', { min: 1, max: 11, step: 1, label: 'Tiefe' });
        folder.addBinding(ebene, 'farbe', { label: 'Farbe' });
    },

    // 3. Die eigentliche p5.js Zeichenlogik
    zeichne: (p, ebene) => {
        p.stroke(ebene.farbe);
        // Wir müssen 'p' an die Hilfsfunktion übergeben, da wir im p5 Instance-Mode sind
        zeichneAst(p, ebene.startLaenge, ebene.tiefe, ebene.winkel, ebene.verkuerzung);
    }
};

// Interne Hilfsfunktion für die Rekursion (nur in dieser Datei sichtbar)
function zeichneAst(p, laenge, tiefe, winkel, verkuerzung) {
    if (tiefe === 0) return;

    p.strokeWeight(tiefe);
    p.line(0, 0, 0, -laenge);
    p.translate(0, -laenge);

    p.push();
    p.rotate(winkel);
    zeichneAst(p, laenge * verkuerzung, tiefe - 1, winkel, verkuerzung);
    p.pop();

    p.push();
    p.rotate(-winkel);
    zeichneAst(p, laenge * verkuerzung, tiefe - 1, winkel, verkuerzung);
    p.pop();
}
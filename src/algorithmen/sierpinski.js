// src/algorithmen/sierpinski.js

export const sierpinskiAlgo = {
    typ: 'sierpinski',

    erstelleDefaults: () => {
        return {
            x: 300,
            y: 400,
            groesse: 200,
            iterationen: 3000,
            punktGroesse: 1,
            farbe: '#00ff88'
        };
    },

    baueUI: (folder, ebene) => {
        folder.addBinding(ebene, 'groesse', { min: 50, max: 500, step: 1, label: 'Größe' });
        folder.addBinding(ebene, 'iterationen', { min: 100, max: 10000, step: 100, label: 'Punkte' });
        folder.addBinding(ebene, 'punktGroesse', { min: 0.5, max: 5, step: 0.1, label: 'Punktdicke' });
        folder.addBinding(ebene, 'farbe', { label: 'Farbe' });
    },

    zeichne: (p, ebene) => {
        p.stroke(ebene.farbe);
        p.strokeWeight(ebene.punktGroesse);

        // Die drei Eckpunkte des Dreiecks relativ zum Nullpunkt (x,y)
        let ax = 0;
        let ay = -ebene.groesse;
        let bx = -ebene.groesse;
        let by = ebene.groesse;
        let cx = ebene.groesse;
        let cy = ebene.groesse;

        // Startpunkt für das Chaos-Spiel
        let px = 0;
        let py = 0;

        // Führe die Iterationen aus, um die Punkte zu setzen
        for (let i = 0; i < ebene.iterationen; i++) {
            // Wähle zufällig eine Ecke (0, 1 oder 2)
            let ecke = p.floor(p.random(3));

            // p.lerp berechnet die exakte Mitte zwischen zwei Punkten
            if (ecke === 0) {
                px = p.lerp(px, ax, 0.5);
                py = p.lerp(py, ay, 0.5);
            } else if (ecke === 1) {
                px = p.lerp(px, bx, 0.5);
                py = p.lerp(py, by, 0.5);
            } else {
                px = p.lerp(px, cx, 0.5);
                py = p.lerp(py, cy, 0.5);
            }

            p.point(px, py);
        }
    }
};
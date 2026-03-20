export function downloadImage(p, state, algorithmen) {
    const dateiname = `genart_export_${Date.now()}`;

    if (state.exportFormat === 'svg') {
        // 1. Unsichtbares SVG-Canvas erstellen
        const pg = p.createGraphics(p.width, p.height, p.SVG);
        pg.angleMode(p.DEGREES);

        // 2. Hintergrund setzen
        if (state.transparenz) {
            pg.clear();
        } else {
            pg.background(state.hintergrund);
        }

        // 3. Alle Ebenen auf dem SVG-Canvas (pg) neu zeichnen
        for (let i = 0; i < state.ebenen.length; i++) {
            const ebene = state.ebenen[i];
            const algo = algorithmen[ebene.typ];

            if (algo) {
                pg.push();
                pg.translate(ebene.x, ebene.y);
                pg.rotate(ebene.rotation);

                // Wichtig: Wir übergeben hier 'pg' anstelle von 'p', 
                // damit der Algorithmus auf dem versteckten Canvas zeichnet
                algo.zeichne(pg, ebene);

                pg.pop();
            }
        }

        // 4. Als SVG speichern und Speicher freigeben
        pg.save(`${dateiname}.svg`);
        pg.remove();

    } else {
        // Normaler Pixel-Export bleibt unverändert
        p.saveCanvas(dateiname, state.exportFormat);
    }
}
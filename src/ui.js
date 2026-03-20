import { Pane } from 'tweakpane';
import { downloadImage } from './download.js';

// Unser neuer, globaler Zustand
export const state = {
    hintergrund: '#1a1a1a',
    ebenen: [] // Hier landen alle Formen (Bäume, Kreise, etc.)
};

// Hilfsfunktion: Erzeugt die Standard-Werte für einen neuen Baum
function erstelleBaum() {
    return {
        typ: 'baum',
        x: 400, // Standard X-Position auf dem Canvas
        y: 600, // Standard Y-Position auf dem Canvas
        startLaenge: 100,
        winkel: 25,
        verkuerzung: 0.67,
        tiefe: 8,
        farbe: '#ffffff'
    };
}

export function setupUI() {
    const pane = new Pane({ title: 'GenArt-Lab' });

    // 1. Globale Einstellungen (Hintergrund, Export)
    const globalFolder = pane.addFolder({ title: 'Globale Einstellungen' });
    globalFolder.addBinding(state, 'hintergrund', { label: 'Hintergrund' });
    globalFolder.addButton({ title: 'Als Bild speichern' }).on('click', () => {
        downloadImage();
    });

    // 2. Element hinzufügen
    const addFolder = pane.addFolder({ title: 'Element hinzufügen' });
    addFolder.addButton({ title: '+ Neuer Baum' }).on('click', () => {
        const neuerBaum = erstelleBaum();
        state.ebenen.push(neuerBaum);
        erstelleEbenenUI(pane, neuerBaum, state.ebenen.length);
    });

    // 3. Zum Start direkt einen Baum erzeugen, damit die Leinwand nicht leer ist
    const startBaum = erstelleBaum();
    state.ebenen.push(startBaum);
    erstelleEbenenUI(pane, startBaum, 1);
}

// Generiert dynamisch einen neuen Tweakpane-Ordner für ein Objekt
function erstelleEbenenUI(pane, ebene, index) {
    const folder = pane.addFolder({ title: `${ebene.typ.toUpperCase()} ${index}`, expanded: true });

    // Alle Objekte bekommen X und Y Koordinaten
    folder.addBinding(ebene, 'x', { min: 0, max: 2000, step: 1, label: 'X Position' });
    folder.addBinding(ebene, 'y', { min: 0, max: 2000, step: 1, label: 'Y Position' });

    // Spezifische Parameter je nach Typ
    if (ebene.typ === 'baum') {
        folder.addBinding(ebene, 'startLaenge', { min: 20, max: 300, step: 1, label: 'Länge' });
        folder.addBinding(ebene, 'winkel', { min: 0, max: 90, step: 1, label: 'Winkel' });
        folder.addBinding(ebene, 'verkuerzung', { min: 0.5, max: 0.85, step: 0.01, label: 'Verkürzung' });
        folder.addBinding(ebene, 'tiefe', { min: 1, max: 11, step: 1, label: 'Tiefe' });
        folder.addBinding(ebene, 'farbe', { label: 'Farbe' });
    }
}
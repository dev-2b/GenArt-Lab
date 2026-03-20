// src/ui.js
import { Pane } from 'tweakpane';
import { downloadImage } from './download.js';

// HIER melden wir neue Algorithmen an
import { baumAlgo } from './algorithmen/baum.js';

export const ALGORITHMEN = {
    [baumAlgo.typ]: baumAlgo
};

export const state = {
    hintergrund: '#1a1a1a',
    ebenen: []
};

export function setupUI() {
    const pane = new Pane({ title: 'GenArt-Lab' });

    const globalFolder = pane.addFolder({ title: 'Globale Einstellungen' });
    globalFolder.addBinding(state, 'hintergrund', { label: 'Hintergrund' });
    globalFolder.addButton({ title: 'Als Bild speichern' }).on('click', downloadImage);

    const addFolder = pane.addFolder({ title: 'Element hinzufügen' });

    // Dynamischer Button für den Baum
    addFolder.addButton({ title: '+ Neuer Baum' }).on('click', () => {
        elementHinzufuegen(pane, 'baum');
    });

    // Start-Element
    elementHinzufuegen(pane, 'baum');
}

function elementHinzufuegen(pane, typ) {
    const algo = ALGORITHMEN[typ];
    if (!algo) return;

    // 1. Defaults vom Algorithmus holen und Typ anhängen
    const neueEbene = { typ: typ, ...algo.erstelleDefaults() };
    state.ebenen.push(neueEbene);

    // 2. UI-Ordner generieren
    const folder = pane.addFolder({
        title: `${typ.toUpperCase()} ${state.ebenen.length}`,
        expanded: true
    });

    folder.addBinding(neueEbene, 'x', { min: 0, max: p5_width_placeholder || 2000, step: 1, label: 'X Pos' });
    folder.addBinding(neueEbene, 'y', { min: 0, max: p5_height_placeholder || 2000, step: 1, label: 'Y Pos' });

    // 3. Modulspezifische Regler anfordern
    algo.baueUI(folder, neueEbene);
}

// Kleine Platzhalter für die X/Y Max-Werte (optional, macht die Slider passender)
let p5_width_placeholder = 2000;
let p5_height_placeholder = 2000;
export function setCanvasSize(w, h) {
    p5_width_placeholder = w;
    p5_height_placeholder = h;
}
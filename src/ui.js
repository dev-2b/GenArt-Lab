// src/ui.js
import { Pane } from 'tweakpane';
import { downloadImage } from './download.js';

// HIER melden wir neue Algorithmen an
import { baumAlgo } from './algorithmen/baum.js';
import { sierpinskiAlgo } from './algorithmen/sierpinski.js';

export const ALGORITHMEN = {
    [baumAlgo.typ]: baumAlgo,
    [sierpinskiAlgo.typ]: sierpinskiAlgo
};

export const state = {
    hintergrund: '#1a1a1a',
    transparenz: false,  // NEU: Toggle für transparenten Hintergrund
    exportFormat: 'png', // NEU: Standard-Format
    ebenen: [],
    auswahlNeu: 'baum' // Standard-Auswahl für neues Element aktuell Baum
};

export function setupUI(p5Instanz) {
    const pane = new Pane({ title: 'GenArt-Lab' });

    const globalFolder = pane.addFolder({ title: 'Globale Einstellungen' });
    globalFolder.addBinding(state, 'hintergrund', { label: 'Hintergrund' });
    globalFolder.addBinding(state, 'transparenz', { label: 'Transparent' });

    globalFolder.addBinding(state, 'exportFormat', {
        options: { PNG: 'png', JPEG: 'jpg' },
        label: 'Format'
    });

    // Reicht Instanz und Format an download.js weiter
    globalFolder.addButton({ title: '💾 Als Bild speichern' }).on('click', () => {
        downloadImage(p5Instanz, state.exportFormat);
    });

    const addFolder = pane.addFolder({ title: 'Element hinzufügen' });

    //Wir generieren die Dropdown-Optionen dynamisch aus der Registry
    const typOptionen = {};
    for (const key in ALGORITHMEN) {
        // Macht aus 'baum' -> 'Baum' für die Anzeige im Menü
        const anzeigeName = key.charAt(0).toUpperCase() + key.slice(1);
        typOptionen[anzeigeName] = key;
    }

    // Das Dropdown-Menü
    addFolder.addBinding(state, 'auswahlNeu', {
        options: typOptionen,
        label: 'Form'
    });

    // Ein einzelner Button, der das ausgewählte Element liest und hinzufügt
    addFolder.addButton({ title: '+ Hinzufügen' }).on('click', () => {
        elementHinzufuegen(pane, state.auswahlNeu);
    });
    // Start-Element
    // elementHinzufuegen(pane, 'baum');
    // elementHinzufuegen(pane, 'sierpinski');
}

function elementHinzufuegen(pane, typ) {
    const algo = ALGORITHMEN[typ];
    if (!algo) return;

    // NEU: Eine eindeutige ID für dieses Objekt generieren (Zeitstempel + Zufallszahl)
    const id = Date.now() + Math.random();

    // 1. Defaults laden, ID und standardmäßig 'rotation: 0' hinzufügen
    const neueEbene = { id: id, typ: typ, rotation: 0, ...algo.erstelleDefaults() };
    state.ebenen.push(neueEbene);

    // 2. UI-Ordner generieren
    const folder = pane.addFolder({
        title: `${typ.toUpperCase()}`, // Den Index weggelassen, da er beim Löschen verwirren würde
        expanded: true
    });

    folder.addBinding(neueEbene, 'x', { min: 0, max: p5_width_placeholder || 2000, step: 1, label: 'X Pos' });
    folder.addBinding(neueEbene, 'y', { min: 0, max: p5_height_placeholder || 2000, step: 1, label: 'Y Pos' });
    folder.addBinding(neueEbene, 'rotation', { min: 0, max: 360, step: 1, label: 'Drehung' });

    // 3. Modulspezifische Regler anfordern
    algo.baueUI(folder, neueEbene);

    // 4. NEU: Löschen-Button am Ende des Ordners anfügen
    folder.addButton({ title: '🗑️ Löschen' }).on('click', () => {
        // a) Aus dem Array filtern (behält alle Elemente, deren ID nicht die aktuelle ist)
        state.ebenen = state.ebenen.filter(ebene => ebene.id !== id);

        // b) Den kompletten Ordner aus der Tweakpane-UI entfernen
        folder.dispose();
    });
}

// Kleine Platzhalter für die X/Y Max-Werte (optional, macht die Slider passender)
let p5_width_placeholder = 2000;
let p5_height_placeholder = 2000;
export function setCanvasSize(w, h) {
    p5_width_placeholder = w;
    p5_height_placeholder = h;
}
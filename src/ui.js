import { Pane } from 'tweakpane';
import { downloadImage } from './download.js';

// Zentrales Objekt für alle veränderbaren Parameter
export const PARAMS = {
    groesse: 150,
    farbe: '#00ff88',
    hintergrund: '#1a1a1a'
};

// Initialisiert die Benutzeroberfläche
export function setupUI() {
    const pane = new Pane({ title: 'GenArt-Lab Controls' });

    pane.addBinding(PARAMS, 'groesse', { min: 10, max: 500, step: 1 });
    pane.addBinding(PARAMS, 'farbe');
    pane.addBinding(PARAMS, 'hintergrund');

    pane.addButton({ title: 'Als Bild speichern' }).on('click', () => {
        downloadImage();
    });
}
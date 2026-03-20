import { Pane } from 'tweakpane';
import { downloadImage } from './download.js';

export const PARAMS = {
    startLaenge: 150,
    winkel: 25,        // in Grad
    verkuerzung: 0.67, // Ast wird pro Schritt um ca. 33% kürzer
    tiefe: 8,          // Wie oft sich der Ast teilt
    farbe: '#ffffff',
    hintergrund: '#1a1a1a'
};

export function setupUI() {
    const pane = new Pane({ title: 'Baum-Parameter' });

    pane.addBinding(PARAMS, 'startLaenge', { min: 50, max: 300, step: 1, label: 'Start-Länge' });
    pane.addBinding(PARAMS, 'winkel', { min: 0, max: 90, step: 1, label: 'Winkel' });
    pane.addBinding(PARAMS, 'verkuerzung', { min: 0.5, max: 0.85, step: 0.01, label: 'Verkürzung' });
    // Achtung bei der Tiefe: Werte über 12 können den Browser zum Absturz bringen (exponentielles Wachstum)
    pane.addBinding(PARAMS, 'tiefe', { min: 1, max: 11, step: 1, label: 'Tiefe' });

    pane.addBinding(PARAMS, 'farbe', { label: 'Baumfarbe' });
    pane.addBinding(PARAMS, 'hintergrund', { label: 'Hintergrund' });

    pane.addButton({ title: 'Als Bild speichern' }).on('click', () => {
        downloadImage();
    });
}
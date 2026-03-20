export function downloadImage(p5Instance, format) {
    const dateiname = `genart_export_${Date.now()}`;

    // saveCanvas ist robuster als das allgemeine save() und zielt direkt auf das Zeichenblatt ab
    p5Instance.saveCanvas(dateiname, format);
}
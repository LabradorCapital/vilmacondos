/**
 * Vilma Condos — recibe los formularios del sitio y los guarda en esta hoja.
 * Crea una pestaña por formulario ("Contacto" y "Brochure").
 */
const COLUMNAS = {
  Contacto: ['fecha', 'nombre', 'tel', 'email', 'interes', 'via', 'horario', 'msg', 'pagina'],
  Brochure: ['fecha', 'nombre', 'email', 'tel', 'pagina'],
};

function doPost(e) {
  const p = (e && e.parameter) || {};
  const nombre = COLUMNAS[p.formulario] ? p.formulario : 'Contacto';
  const cols = COLUMNAS[nombre];
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = ss.getSheetByName(nombre);
    if (!hoja) {
      hoja = ss.insertSheet(nombre);
      hoja.appendRow(cols);
      hoja.setFrozenRows(1);
    }
    // Prefijo ' para que Sheets no interprete fórmulas que alguien escriba en el formulario.
    const limpio = v => {
      v = String(v == null ? '' : v).slice(0, 2000);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };
    hoja.appendRow(cols.map(c => (c === 'fecha' ? new Date() : limpio(p[c]))));
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

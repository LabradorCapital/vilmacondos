/**
 * Vilma Condos — recibe los formularios del sitio y los guarda en la hoja.
 * Crea una pestaña por formulario ("Contacto" y "Brochure").
 *
 * Prueba: abra la URL /exec terminada en ?test=1 en el navegador;
 * debe responder "ok" y agregar una fila de prueba en "Contacto".
 */
// ID de la hoja "Vilma condos" (la parte entre /d/ y /edit en su URL).
const SHEET_ID = '1MBW5tNW5O0lOnN2YXcBqUpq2MQ-AB2YHBo1xHlLq_rw';

const COLUMNAS = {
  Contacto: ['fecha', 'nombre', 'tel', 'email', 'interes', 'via', 'horario', 'msg', 'pagina'],
  Brochure: ['fecha', 'nombre', 'email', 'tel', 'pagina'],
};

function doPost(e) {
  return guardar((e && e.parameter) || {});
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.test !== '1') return ContentService.createTextOutput('Vilma Condos: formulario activo.');
  return guardar({ formulario: 'Contacto', nombre: 'PRUEBA (puede borrar esta fila)', pagina: 'prueba ?test=1' });
}

function guardar(p) {
  const nombre = COLUMNAS[p.formulario] ? p.formulario : 'Contacto';
  const cols = COLUMNAS[nombre];
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
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
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}

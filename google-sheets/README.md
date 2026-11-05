# Guardar los formularios en Google Sheets

1. Cree una hoja nueva en Google Sheets (por ejemplo "Vilma · Prospectos") y ponga su ID en `SHEET_ID` de `Code.gs` (la parte de la URL entre `/d/` y `/edit`).
2. Menú **Extensiones → Apps Script**. Borre el contenido y pegue `Code.gs` de esta carpeta. Guarde.
3. **Implementar → Nueva implementación** → tipo **Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. Autorice los permisos y copie la **URL de la aplicación web** (termina en `/exec`).
5. En `index.html`, pegue esa URL en `CFG.sheetUrl` y suba el cambio a `main`.

Para probar, abra en el navegador la URL `/exec` terminada en `?test=1`: debe responder `ok` y agregar una fila de prueba en **Contacto** (si responde `error: ...`, ese es el problema).

Cada envío agrega una fila en la pestaña **Contacto** o **Brochure** (se crean solas la primera vez).

Si después modifica `Code.gs`, use **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga siendo la misma.

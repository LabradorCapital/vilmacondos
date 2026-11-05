# Vilma Condos · Puerto Morelos

Sitio estático de Vilma Condos (diseño exportado de Claude Design, sistema de diseño Feel Good Properties).

## Estructura

- `index.html` — página principal (proyecto, amenidades, residencias, inversión, contacto)
- `precios.html` — tabla de disponibilidad por nivel
- `vilma.css` — estilos compartidos
- `ds/` — tokens y tipografías del sistema de diseño Feel Good Properties
- `assets/` — fotografías, plantas tipo y brochure en PDF

## Editar datos

- **Página principal**: el bloque `CFG` al final de `index.html` (WhatsApp, unidades vendidas/reservadas, precios "desde").
- **Disponibilidad**: la constante `D` en `precios.html` (una línea por unidad: `unidad|nivel|S/G|interior|terraza|total|precio m²|precio|estatus`, estatus vacío = disponible, `r` = reservado, `v` = vendido).

## Publicación

El workflow `.github/workflows/pages.yml` publica el sitio en GitHub Pages en cada push a `main`.
Activarlo una vez en **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Vista local:

```bash
python3 -m http.server 8000
```

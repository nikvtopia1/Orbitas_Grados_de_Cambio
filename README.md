# Órbitas — versión web (PWA)

Esta carpeta **es generada**. No editar nada de acá a mano: todo sale de
`fuentes/build-orbitas.js`, un nivel más arriba.

Para regenerarla:

```
node fuentes\build-orbitas.js
```

Eso reescribe `index.html`, `manifest.json`, `sw.js` y los tres íconos. El `.git` y este
README no se tocan, así que después de regenerar alcanza con hacer commit y push.

## Qué hay acá

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera, autocontenida (sin dependencias externas) |
| `manifest.json` | Hace que Android/Chrome ofrezca "Instalar app" |
| `sw.js` | Service worker: red primero, caché de respaldo → anda sin conexión |
| `icon-192.png`, `icon-512.png` | Íconos normales |
| `icon-maskable-512.png` | Variante con margen, para el recorte circular de Android |

## Deploy

Este repo se publica como **Static Site** en Render (no Web Service: el plan gratuito de
Web Service se duerme a los 15 minutos).

- Build Command: *(vacío)*
- Publish Directory: `.`

Cada `git push` redespliega solo.

## Por qué el nombre del caché lleva un hash

`sw.js` usa `CACHE = "orbitas-<hash del index.html>"`. Cada build cambia el hash, así que
el service worker viejo borra su caché y sirve la versión nueva. Sin eso, el que ya
instaló la app seguiría viendo la versión anterior para siempre.

# ⚔️ Dragones & Mazmorras 5e — Guía de Instalación

## Archivos incluidos
```
dnd5e-pwa/
├── index.html       ← La aplicación completa
├── manifest.json    ← Configuración PWA
├── sw.js            ← Service Worker (offline)
└── icons/           ← Iconos para todos los dispositivos
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## 🖥️ Windows / Mac / Linux (Escritorio)

### Opción A — Servidor local (recomendado para instalar como PWA)

1. Instala Node.js desde https://nodejs.org
2. Abre terminal en la carpeta del juego
3. Ejecuta:
   ```bash
   npx serve .
   ```
4. Abre `http://localhost:3000` en Chrome o Edge
5. Aparecerá el banner **"Instalar aplicación"** → pulsa **⚔️ INSTALAR**
6. El juego aparecerá en tu escritorio como app nativa

### Opción B — Sin instalación (solo abrir)
- Abre `index.html` directamente en el navegador
- Funciona al 100%, pero sin icono de escritorio ni modo offline

### Opción C — Python (si no tienes Node)
```bash
python3 -m http.server 8080
# Abre http://localhost:8080
```

---

## 📱 Android

1. Copia la carpeta al servidor local (o usa la Opción A desde PC)
2. Abre Chrome en Android → navega a la URL
3. Chrome mostrará banner: **"Añadir a pantalla de inicio"**
4. Pulsa **Instalar** → aparece como app en tu launcher

---

## 🍎 iPhone / iPad (iOS Safari)

1. Abre Safari → navega a la URL del servidor
2. Pulsa el botón **Compartir** (⬆️)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Ponle nombre → **Añadir**

---

## 🌐 Publicar online (para multijugador real)

Para jugar con amigos, puedes publicarla gratis en:

### Netlify (más fácil)
1. Ve a https://netlify.com
2. Arrastra la carpeta `dnd5e-pwa/` al área de deploy
3. Comparte el enlace con tus jugadores

### GitHub Pages
1. Sube los archivos a un repositorio de GitHub
2. Ve a Settings → Pages → Deploy from branch
3. Selecciona `main` / `root`

---

## 🔑 Configurar API Key de Claude

La aplicación usa la API de Anthropic para el Dungeon Master IA.

1. Obtén tu API key en: https://console.anthropic.com
2. Abre `index.html` en un editor de texto
3. Busca la línea:
   ```javascript
   headers: { 'Content-Type': 'application/json' },
   ```
4. Añade debajo:
   ```javascript
   'x-api-key': 'TU_API_KEY_AQUI',
   'anthropic-version': '2023-06-01',
   'anthropic-dangerous-direct-browser-iab': 'true',
   ```

> ⚠️ Si usas la app desde Claude.ai, la API key ya está gestionada automáticamente.

---

## 💾 Guardar Partidas

- **Guardar**: Ctrl+S o botón 💾 en el juego
- Se descarga un archivo `.json` con tu aventura
- **Cargar**: Menú principal → "Cargar Partida" → selecciona el `.json`

---

*Dungeon Master IA powered by Claude Sonnet 4*

# QuiroNexus — Landing Page

Landing page de **QuiroNexus**, un software de gestión para consultorios de quiropraxia.

## Sobre el proyecto

Este repositorio contiene únicamente el sitio de presentación (landing page) del producto: es un sitio **estático**, sin backend ni build step. Está compuesto por:

- `index.html` — estructura y contenido de la página.
- `styles.css` — estilos.
- `script.js` — interactividad del lado del cliente.

No hay dependencias, frameworks ni proceso de compilación: los archivos se sirven tal cual.

## Ver el sitio en local

Alcanza con abrir `index.html` directamente en el navegador:

```
# Windows
start index.html
```

También podés usar un servidor estático simple si preferís evitar restricciones de `file://` (por ejemplo, para fetch/rutas relativas):

```
npx serve .
```

## Deploy

Al ser un sitio estático, se puede desplegar directamente en servicios como Vercel o Netlify conectando este repositorio, sin configuración de build (o con un build step vacío / "none").

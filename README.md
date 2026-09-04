# Landing Page — Estudio Jurídico Integral (Dra. Débora Dodelson)

Landing page institucional de alta conversión diseñada para captación y derivación directa a WhatsApp y correo electrónico.

## Estructura de Archivos

- `index.html`: Estructura HTML5 semántica, metadatos SEO, Open Graph, Twitter Cards y Schema.org (`LegalService`/`Attorney`).
- `css/styles.css`: Sistema de diseño basado en CSS moderno, variables personalizadas, paleta institucional (#0A2240, #C6A664, #FFFFFF) y responsive design (mobile-first).
- `js/main.js`: Lógica interactiva vanilla (menú móvil, header dinámico, scroll animations con `IntersectionObserver` y formateador de mensajes para derivación a WhatsApp desde el formulario).

## Reemplazo de Placeholders

1. **[LOGO-ALTA]**:
   - En `index.html` (Header y Footer), reemplazar el bloque `<div class="brand-monogram">[LOGO-ALTA]</div>` por la etiqueta `<img>` con el logotipo vectorizado en formato SVG o PNG en alta resolución (ej. `<img src="assets/logo.svg" alt="Logo Débora Dodelson" class="brand-logo-img">`).
2. **[FOTO-HERO]**:
   - En la sección Hero, reemplazar el contenedor `.photo-placeholder` por la fotografía profesional de estudio de la Dra. Débora Dodelson:
     ```html
     <img src="assets/debora-dodelson-hero.jpg" alt="Dra. Débora Dodelson - Abogada Especialista en Derecho del Trabajo" class="hero-photo-img">
     ```
3. **[FOTO-NOSOTROS]**:
   - En la sección "Sobre Nosotros", reemplazar el contenedor `.about-photo-placeholder` por la fotografía institucional complementaria:
     ```html
     <img src="assets/debora-dodelson-nosotros.jpg" alt="Dra. Débora Dodelson en su estudio jurídico" class="about-photo-img">
     ```

## Publicación

El proyecto no requiere ningún proceso de compilación ni dependencias de npm. Puede publicarse inmediatamente en Vercel, Netlify, GitHub Pages, Firebase Hosting o cualquier hosting cPanel/Apache/Nginx.

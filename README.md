# 🚀 Portafolio Interactivo 3D

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![A-Frame](https://img.shields.io/badge/A--Frame-1.4.x-EF2D5E?style=for-the-badge&logo=aframe&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js&logoColor=white)
![WebXR](https://img.shields.io/badge/WebXR-Ready-4285F4?style=for-the-badge)

**Portafolio interactivo con visualización 3D, realidad virtual y galería multimedia**

[Demo en Vivo](#) · [Reportar Bug](https://github.com/tu-usuario/tu-repo/issues) · [Solicitar Feature](https://github.com/tu-usuario/tu-repo/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Añadir Proyectos](#-añadir-proyectos)
- [Personalización](#-personalización)
- [Deployment](#-deployment)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Sobre el Proyecto

Este es un portafolio web moderno e interactivo que combina visualización 3D, realidad virtual y una interfaz elegante para mostrar proyectos de ingeniería, desarrollo y robótica de manera innovadora.

### ✨ ¿Qué lo hace especial?

- **Visualización 3D en tiempo real** de modelos de proyectos usando A-Frame y Three.js
- **Entornos de Realidad Virtual** inmersivos compatibles con WebXR
- **Galería multimedia avanzada** con lightbox para imágenes y videos
- **Navegación por pestañas** para organizar información, galería y código
- **Sistema de proyectos dinámico** fácil de actualizar sin tocar el código
- **Diseño responsive** que funciona en desktop, tablet y móvil

---

## ⚡ Características

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno con gradientes y animaciones suaves
- ✅ Sistema de pestañas (Información / Galería / Código)
- ✅ Tema oscuro optimizado para visualización prolongada
- ✅ Navegación intuitiva con React Router
- ✅ Responsive design adaptable a todos los dispositivos

### 🎬 Galería Multimedia
- ✅ **Visor Lightbox profesional** con navegación
- ✅ **Soporte para imágenes** (JPG, PNG, WebP, SVG)
- ✅ **Soporte para videos** (MP4, WebM, OGG)
- ✅ **Preview de videos** con reproducción al hover
- ✅ **Navegación con teclado** (ESC, ←, →)
- ✅ **Contador de posición** (ej: "3 / 8")
- ✅ **Controles de video** integrados (play, pause, fullscreen)

### 🥽 Visualización 3D
- ✅ Renderizado de modelos 3D (OBJ/MTL)
- ✅ Animaciones rotacionales automáticas
- ✅ Iluminación dinámica con múltiples fuentes
- ✅ Entornos VR navegables en primera persona
- ✅ Compatible con visores WebXR

### 💻 Bloques de Código
- ✅ Syntax highlighting para múltiples lenguajes
- ✅ Botón de copiar al portapapeles
- ✅ Fuente monoespaciada optimizada
- ✅ Scroll horizontal para código largo

### 🏷️ Cards de Tecnologías
- ✅ Grid responsive con información de cada tech stack
- ✅ Descripción del uso específico en el proyecto
- ✅ Hover effects para mejor UX

---

## 🛠️ Tecnologías

### Frontend
- **React 18** - Framework principal
- **React Router DOM** - Navegación SPA
- **A-Frame 1.4** - Framework de realidad virtual
- **Three.js** - Motor 3D subyacente

### Visualización 3D
- **WebGL** - Renderizado gráfico
- **WebXR API** - Realidad virtual en navegador
- **OBJ/MTL Loader** - Carga de modelos 3D

### Estilos
- **CSS3 Modules** - Estilos inline con JS
- **CSS Grid & Flexbox** - Layout responsive
- **Animaciones CSS** - Transiciones y efectos

### Herramientas de Desarrollo
- **Vite** / **Create React App** - Build tool
- **ESLint** - Linting
- **Git** - Control de versiones

---

## 📦 Instalación

### Prerrequisitos

```bash
node >= 14.0.0
npm >= 6.0.0
```

### Pasos de Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/portafolio-3d.git
cd portafolio-3d
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Instala A-Frame**
```bash
npm install aframe
```

4. **Instala React Router**
```bash
npm install react-router-dom
```

5. **Inicia el servidor de desarrollo**
```bash
npm run dev
# o
npm start
```

6. **Abre en el navegador**
```
http://localhost:5173
# o
http://localhost:3000
```

---

## 🎮 Uso

### Navegación Básica

1. **Página Principal**: Muestra todos tus proyectos
2. **Click en un proyecto**: Abre la vista detallada
3. **Pestañas**:
   - 📋 **Información**: Descripción, características, tecnologías
   - 🖼️ **Galería**: Imágenes y videos del proyecto
   - 💻 **Código**: Ejemplos de código con syntax highlighting

### Controles del Lightbox

| Acción | Desktop | Móvil |
|--------|---------|-------|
| Abrir | Click en imagen/video | Tap en imagen/video |
| Cerrar | ESC o botón X | Tap en fondo o botón X |
| Anterior | ← o botón ◀ | Tap en botón ◀ |
| Siguiente | → o botón ▶ | Tap en botón ▶ |

### Visualización 3D

- El modelo 3D rota automáticamente
- Usa el mouse para explorar (si se habilita la interacción)
- En VR, usa los controles del visor

---

## 📁 Estructura del Proyecto

```
portafolio-3d/
├── public/
│   ├── images/                 # Imágenes de proyectos
│   │   ├── proyecto1-1.jpg
│   │   ├── proyecto1-2.png
│   │   └── ...
│   ├── videos/                 # Videos de proyectos
│   │   ├── demo1.mp4
│   │   ├── demo2.webm
│   │   └── ...
│   ├── models/                 # Modelos 3D
│   │   ├── KUKA.obj
│   │   ├── KUKA.mtl
│   │   ├── Quadrupedv3.obj
│   │   ├── Quadrupedv3.mtl
│   │   └── ...
│   └── index.html
├── src/
│   ├── components/
│   │   └── ...                 # Componentes reutilizables
│   ├── pages/
│   │   ├── Home.jsx            # Página principal
│   │   ├── Proyecto.jsx        # Vista de proyecto individual
│   │   └── Entorno.jsx         # Entorno VR (opcional)
│   ├── data/
│   │   └── proyectos.js        # 📌 Datos de todos los proyectos
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── README.md                   # Este archivo
└── vite.config.js / craco.config.js
```

---

## ➕ Añadir Proyectos

### 1. Edita `src/data/proyectos.js`

```javascript
export const proyectos = {
  
  miNuevoProyecto: {
    titulo: "Mi Proyecto Increíble",
    descripcion: "Breve descripción del proyecto",
    
    // 📄 CONTENIDO DETALLADO (OPCIONAL)
    contenido: {
      introduccion: "Descripción larga y detallada...",
      
      caracteristicas: [
        "Primera característica",
        "Segunda característica",
        "Tercera característica"
      ],
      
      tecnologias: [
        { nombre: "React", uso: "Frontend del proyecto" },
        { nombre: "Node.js", uso: "Backend y API" }
      ],
      
      // 🖼️ GALERÍA (OPCIONAL)
      imagenes: [
        { 
          tipo: "imagen", 
          url: "/images/mi-proyecto-1.jpg", 
          descripcion: "Captura de pantalla principal" 
        },
        { 
          tipo: "video", 
          url: "/videos/mi-proyecto-demo.mp4", 
          descripcion: "Video demostrativo" 
        },
        { 
          tipo: "imagen", 
          url: "/images/mi-proyecto-2.jpg", 
          descripcion: "Otra imagen" 
        }
      ],
      
      // 💻 CÓDIGO (OPCIONAL)
      codigoEjemplo: {
        lenguaje: "javascript",
        titulo: "Ejemplo de implementación",
        codigo: `function miFuncion() {
  console.log("Hola Mundo");
  return true;
}`
      }
    },
    
    // 🔗 ENLACES (OPCIONALES)
    entorno: "/mi-entorno-vr",  // Ruta al entorno VR
    web: "https://mi-proyecto.com",
    code: "https://github.com/usuario/proyecto",
    
    // 🎨 MODELO 3D (OPCIONAL)
    modelo3D: {
      obj: "/models/mi-modelo.obj",
      mtl: "/models/mi-modelo.mtl",
      position: "0 1 -5",
      rotation: "0 0 0",
      scale: "1 1 1",
      animation: "property: rotation; to: 0 360 0; loop: true; dur: 20000"
    }
  }
  
};
```

### 2. Añade los archivos multimedia

#### Imágenes
```bash
# Copia tus imágenes a:
public/images/mi-proyecto-1.jpg
public/images/mi-proyecto-2.png
```

#### Videos
```bash
# Copia tus videos a:
public/videos/mi-proyecto-demo.mp4

# Optimiza el video antes (recomendado):
ffmpeg -i original.mov -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4
```

#### Modelos 3D
```bash
# Copia tus modelos a:
public/models/mi-modelo.obj
public/models/mi-modelo.mtl

# También copia las texturas si las hay:
public/models/texturas/
```

### 3. Actualiza la navegación

En tu componente `Home.jsx`, añade la navegación:

```javascript
<Link to="/proyecto/miNuevoProyecto">
  <div className="proyecto-card">
    <h2>Mi Proyecto Increíble</h2>
  </div>
</Link>
```

---

## 🎨 Personalización

### Cambiar Colores

En `src/pages/Proyecto.jsx`, busca el objeto `styles` y modifica:

```javascript
// Color primario (azul por defecto)
background: "#133a5f"  // Cambia a tu color

// Color de fondo
background: "#0e0e0e"  // Cambia a tu color

// Bordes
borderColor: "#333"    // Cambia a tu color
```

### Cambiar Fuentes

Añade en `public/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Tu+Fuente&display=swap" rel="stylesheet">
```

Y actualiza en `styles.container`:

```javascript
fontFamily: "'Tu Fuente', sans-serif"
```

### Modificar el Layout

```javascript
// Ancho de las columnas (cuando hay modelo 3D)
width: tieneModelo ? "40%" : "100%"  // Columna izquierda
width: "60%"                         // Columna derecha
```

### Personalizar Animaciones 3D

```javascript
modelo3D: {
  // ...
  animation: "property: rotation; to: 0 360 0; loop: true; dur: 10000"
  //                                              👆 Velocidad (ms)
}
```

---

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Arrastra la carpeta dist/ a netlify.com
```

### GitHub Pages

```bash
# Instala gh-pages
npm install --save-dev gh-pages

# Añade en package.json:
"homepage": "https://tu-usuario.github.io/tu-repo",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Variables de Entorno

Crea un archivo `.env`:

```env
VITE_API_URL=https://tu-api.com
VITE_ANALYTICS_ID=tu-analytics-id
```

---

## 📊 Performance

### Optimización de Imágenes

```bash
# Usa WebP para mejor compresión
ffmpeg -i input.jpg -c:v libwebp -quality 80 output.webp

# O usa herramientas online:
# - TinyPNG.com
# - Squoosh.app
```

### Optimización de Videos

```bash
# Comprime videos manteniendo calidad
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4

# Genera thumbnail del video
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 thumbnail.jpg
```

### Lazy Loading

Los componentes ya implementan lazy loading para:
- ✅ Imágenes (se cargan cuando se ven)
- ✅ Videos (se cargan cuando se ven)
- ✅ Modelos 3D (se cargan al entrar a la página)

---

## 🐛 Troubleshooting

### ❌ Los modelos 3D no cargan

**Solución:**
1. Verifica que los archivos `.obj` y `.mtl` estén en `public/models/`
2. Asegúrate de que las texturas estén en el mismo directorio
3. Revisa las rutas en `proyectos.js`

### ❌ Los videos no se reproducen

**Solución:**
1. Usa formato `.mp4` con codec H.264
2. Verifica que el archivo esté en `public/videos/`
3. Comprime el video si es muy pesado (>50MB)

### ❌ Error 404 en producción

**Solución:**
1. Configura redirects en tu hosting
2. Para Netlify, crea `public/_redirects`:
   ```
   /*    /index.html   200
   ```
3. Para Vercel, se configura automáticamente

### ❌ Las imágenes no se ven en producción

**Solución:**
1. Usa rutas absolutas: `/images/foto.jpg` ✅
2. No uses rutas relativas: `../images/foto.jpg` ❌
3. Verifica que estén en `public/`, no en `src/`

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👤 Contacto

**Tu Nombre** - [tu-email@example.com](mailto:tu-email@example.com)

GitHub: [@tu-usuario](https://github.com/tu-usuario)  
LinkedIn: [Tu Nombre](https://linkedin.com/in/tu-nombre)  
Portfolio: [tu-portfolio.com](https://tu-portfolio.com)

---

## 🙏 Agradecimientos

- [A-Frame](https://aframe.io/) - Framework de VR
- [Three.js](https://threejs.org/) - Motor 3D
- [React](https://reactjs.org/) - Framework de UI
- [Vercel](https://vercel.com/) - Hosting
- Comunidad de desarrolladores de código abierto

---

## 🔄 Changelog

### v2.0.0 (2024)
- ✨ Añadido sistema de galería con lightbox
- ✨ Soporte para videos en la galería
- ✨ Navegación con teclado en lightbox
- ✨ Preview de videos con hover
- 🎨 Mejoras visuales en la UI
- 📱 Optimización responsive

### v1.0.0 (2024)
- 🎉 Release inicial
- ✅ Visualización 3D de proyectos
- ✅ Sistema de navegación por pestañas
- ✅ Bloques de código con syntax highlighting
- ✅ Cards de tecnologías

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ y mucho ☕

</div>
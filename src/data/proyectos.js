export const proyectos = {
  wuka: {
    titulo: "Brazo Robotico Arduino UNO",
    descripcion: "Visualización de un robot industrial KUKA usando A-Frame y WebXR.",
    
    // 📄 CONTENIDO DETALLADO
    contenido: {
      introduccion: "El brazo robótico KUKA es un proyecto de visualización 3D interactiva que permite explorar un robot industrial en tiempo real utilizando tecnologías web modernas.",
      
      caracteristicas: [
        "Modelo 3D detallado del brazo robótico KUKA",
        "Animación continua de rotación 360°",
        "Renderizado en tiempo real con A-Frame",
        "Iluminación realista con múltiples fuentes de luz"
      ],
      
      tecnologias: [
        { nombre: "A-Frame", uso: "Motor de realidad virtual basado en WebGL" },
        { nombre: "React", uso: "Framework para la interfaz de usuario" },
        { nombre: "Three.js", uso: "Renderizado 3D subyacente" }
      ],
      
      imagenes: [
        { tipo: "imagen", url: "/images/kuka-1.jpg", descripcion: "Vista frontal del brazo KUKA" },
        { tipo: "video", url: "/videos/kuka-demo.mp4", descripcion: "Demostración de movimiento del brazo" },
        { tipo: "imagen", url: "/images/kuka-2.jpg", descripcion: "Detalle de las articulaciones" }
      ],
      
      codigoEjemplo: {
        lenguaje: "jsx",
        titulo: "Configuración del modelo 3D",
        codigo: `<a-entity
  obj-model="obj: #obj; mtl: #mtl"
  position="0 1 -5"
  rotation="-90 180 0"
  scale="0.01 0.01 0.01"
  animation="property: rotation; 
             to: 0 360 0; 
             loop: true; 
             dur: 20000">
</a-entity>`
      }
    },
    
    entorno: null,
    web: null,
    code: null,
    modelo3D: {
      obj: "/models/KUKA.obj",
      mtl: "/models/KUKA.mtl",
      position: "0 1 -5",
      rotation: "-90 180 0",
      scale: "0.01 0.01 0.01",
      animation: "property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
    }
  },

  Bicineta: {
    titulo: "Proyecto Bicineta GCA",
    descripcion: "Sistema de monitoreo y visualización de una bicicleta eléctrica.",
    
    contenido: {
      introduccion: "Bicineta es un sistema integral de monitoreo para bicicletas eléctricas que permite visualizar en tiempo real datos como velocidad, batería, ubicación GPS y estado de los componentes.",
      
      caracteristicas: [
        "Dashboard en tiempo real con datos del vehículo",
        "Monitoreo de batería y autonomía",
        "Tracking GPS y rutas históricas",
        "Alertas y notificaciones inteligentes",
        "Interfaz responsive para móviles y desktop"
      ],
      
      tecnologias: [
        { nombre: "React", uso: "Frontend de la aplicación web" },
        { nombre: "Node.js", uso: "Backend y API REST" },
        { nombre: "MongoDB", uso: "Base de datos para almacenamiento" },
        { nombre: "Socket.io", uso: "Comunicación en tiempo real" },
        { nombre: "Mapbox", uso: "Visualización de mapas y rutas" }
      ],
      
      imagenes: [
        { tipo: "imagen", url: "/images/Bicineta_general.jpeg", descripcion: "Bicineta en la Vida Real" },
        { tipo: "video", url: "/videos/bicineta-demo.mp4", descripcion: "Demo de la aplicación en uso" },
        { tipo: "imagen", url: "/images/Mapa.png", descripcion: "Vista del mapa de rutas" },
        { tipo: "imagen", url: "/images/Gemelo_Digital.png", descripcion: "Estadísticas de uso" }
      ],
      
      codigoEjemplo: {
        lenguaje: "javascript",
        titulo: "Conexión WebSocket para datos en tiempo real",
        codigo: `// Cliente WebSocket
                  const socket = io('https://api.bicineta.com');

                  socket.on('bike-data', (data) => {
                    updateDashboard({
                      velocidad: data.speed,
                      bateria: data.battery,
                      ubicacion: data.gps,
                      distancia: data.odometer
                    });
                  });

                  // Enviar comando
                  socket.emit('control', {
                    action: 'lock',
                    bikeId: currentBike.id
                  });`
      }
    },
    
    entorno: null,
    web: "https://bicineta-app-web.onrender.com/",
    code: "https://github.com/Juan-Ganan/BICINETA-APP-WEB",
    modelo3D: {
      obj: "/models/Bicineta.obj",
      mtl: "/models/Bicineta.mtl",
      position: "0 0.5 -2",
      rotation: "-90 180 0",
      scale: "1 1 1",
      animation: "property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
    }
  },

  Quadrupede: {
    titulo: "Robot Cuadrúpedo ESP32",
    descripcion: "Simulación de un robot cuadrúpedo en un entorno de realidad virtual.",
    
    contenido: {
      introduccion: "Robot cuadrúpedo controlado por ESP32 con capacidades de locomoción dinámica. Este proyecto combina hardware embebido con visualización 3D para crear una experiencia inmersiva de robótica.",
      
      caracteristicas: [
        "12 servomotores para locomoción realista",
        "Control remoto vía WiFi con ESP32",
        "Algoritmos de marcha adaptativa",
        "Visualización 3D del modelo en tiempo real",
        "Sensores IMU para estabilización"
      ],
      
      tecnologias: [
        { nombre: "ESP32", uso: "Microcontrolador principal" },
        { nombre: "Arduino IDE", uso: "Programación del firmware" },
        { nombre: "A-Frame", uso: "Visualización 3D web" },
        { nombre: "WebSockets", uso: "Comunicación en tiempo real" },
        { nombre: "Blender", uso: "Modelado 3D" }
      ],
      
      imagenes: [
        { tipo: "imagen", url: "/images/quad-modelo.jpg", descripcion: "Modelo 3D del cuadrúpedo" },
        { tipo: "video", url: "/videos/quad-walking.mp4", descripcion: "Robot caminando en acción" },
        { tipo: "imagen", url: "/images/quad-hardware.jpg", descripcion: "Ensamblaje del hardware" }
      ],
      
      codigoEjemplo: {
        lenguaje: "cpp",
        titulo: "Patrón de marcha básico (Arduino)",
        codigo: `void caminarAdelante() {
  // Fase 1: Levantar patas diagonales
  moverServo(PATA_FL, 45);  // Frontal izq
  moverServo(PATA_RR, 45);  // Trasera der
  delay(200);
  
  // Fase 2: Avanzar patas levantadas
  moverServo(PATA_FL, 90);
  moverServo(PATA_RR, 90);
  delay(200);
  
  // Fase 3: Repetir con otras patas
  moverServo(PATA_FR, 45);
  moverServo(PATA_RL, 45);
  // ...
}`
      }
    },
    
    entorno: null,
    web: null,
    code: null,
    modelo3D: {
      obj: "/models/Quadrupedv3.obj",
      mtl: "/models/Quadrupedv3.mtl",
      position: "2 1 -2",
      rotation: "-90 -180 0",
      scale: "0.01 0.01 0.01",
      animation: "property: rotation; to: 2 361 -2; loop: true; dur: 35000; easing: linear"
    }
  },

  trafoABB: {
    titulo: "Transformador ABB VR",
    descripcion: "Visualización de un transformador ABB en realidad virtual.",
    
    contenido: {
      introduccion: "Experiencia inmersiva en realidad virtual para explorar el interior y funcionamiento de un transformador eléctrico ABB de alta tensión, diseñado con fines educativos y de entrenamiento.",
      
      caracteristicas: [
        "Entorno VR completamente inmersivo",
        "Visualización de componentes internos",
        "Interacción con elementos del transformador",
        "Módulos educativos sobre funcionamiento",
        "Compatible con visores VR WebXR"
      ],
      
      tecnologias: [
        { nombre: "A-Frame", uso: "Framework VR" },
        { nombre: "WebXR", uso: "API de realidad virtual" },
        { nombre: "Three.js", uso: "Gráficos 3D" },
        { nombre: "React", uso: "Gestión de la aplicación" }
      ],
      
      imagenes: [
        { tipo: "imagen", url: "/images/trafo-exterior.jpg", descripcion: "Vista exterior del transformador" },
        { tipo: "video", url: "/videos/trafo-vr-tour.mp4", descripcion: "Tour virtual del transformador" },
        { tipo: "imagen", url: "/images/trafo-interior.jpg", descripcion: "Componentes internos" },
        { tipo: "imagen", url: "/images/trafo-vr.jpg", descripcion: "Experiencia en VR" }
      ],
      
      codigoEjemplo: {
        lenguaje: "html",
        titulo: "Escena VR básica",
        codigo: `<a-scene>
  <!-- Transformador principal -->
  <a-entity gltf-model="#transformador"
            position="0 0 -5"
            scale="2 2 2">
  </a-entity>
  
  <!-- Puntos interactivos -->
  <a-sphere position="-2 1.5 -5" 
            radius="0.1"
            color="#ff0000"
            class="clickable"
            info-panel="titulo: Núcleo; 
                       desc: Núcleo de hierro laminado">
  </a-sphere>
</a-scene>`
      }
    },
    
    entorno: "/Entorno",
    web: null,
    code: null,
    modelo3D: null
  }
};
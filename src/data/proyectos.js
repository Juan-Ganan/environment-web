export const proyectos = {
  wuka: {
    titulo: "Brazo Robotico Arduino UNO",
    descripcion: "Visualización de un robot industrial KUKA usando A-Frame y WebXR.",
    entorno: null,
    web: null,
    code: null,
    modelo3D: {
      obj: "/models/KUKA.obj",
      mtl: "/models/KUKA.mtl",   // ⚠️ Cambia esto al MTL correcto si existe
      position: "0 1 -5",
      rotation: "-90 180 0",
      scale: "0.01 0.01 0.01",
      animation: "property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
    }
  },

  Bicineta: {
    titulo: "Proyecto Bicineta GCA",
    descripcion: "Sistema de monitoreo y visualización de una bicicleta eléctrica.",
    entorno: null,
    web: "https://bicineta-app-web.onrender.com/",
    code: "https://github.com/Juan-Ganan/BICINETA-APP-WEB",
    modelo3D: null
  },

  Quadrupede: {
    titulo: "Robot Cuadrúpedo ESP32",
    descripcion: "Simulación de un robot cuadrúpedo en un entorno de realidad virtual.",
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
    entorno: "/Entorno",
    web: null,
    code: null,
    modelo3D: null
  }

};
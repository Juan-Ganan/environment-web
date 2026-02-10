import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { proyectos } from "../data/proyectos";
import "aframe";

export default function Proyecto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const proyecto = proyectos[id];
  const containerRef = useRef(null);
  const sceneCreatedRef = useRef(false);
  const [seccionActiva, setSeccionActiva] = useState("info");
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const [mediaActual, setMediaActual] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  const tieneModelo =
    proyecto?.modelo3D &&
    proyecto.modelo3D.obj &&
    proyecto.modelo3D.mtl &&
    proyecto.modelo3D.position &&
    proyecto.modelo3D.rotation &&
    proyecto.modelo3D.scale &&
    proyecto.modelo3D.animation;

  useEffect(() => {
    if (!tieneModelo || sceneCreatedRef.current || !containerRef.current) return;
    sceneCreatedRef.current = true;

    const sceneHTML = `
      <a-scene
        background="color: #1a1a1a"
        renderer="antialias: true"
        vr-mode-ui="enabled: false"
      >
        <a-assets>
          <a-asset-item id="obj" src="${proyecto.modelo3D.obj}"></a-asset-item>
          <a-asset-item id="mtl" src="${proyecto.modelo3D.mtl}"></a-asset-item>
        </a-assets>

        <a-entity
          obj-model="obj: #obj; mtl: #mtl"
          position="${proyecto.modelo3D.position}"
          rotation="${proyecto.modelo3D.rotation}"
          scale="${proyecto.modelo3D.scale}"
          animation="${proyecto.modelo3D.animation}">
        </a-entity>

        <a-light type="ambient" intensity="1"></a-light>
        <a-light type="directional" position="1 3 2" intensity="0.8"></a-light>
        <a-light type="directional" position="-1 2 -2" intensity="0.5"></a-light>

        <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" color="#1a1a1a"></a-plane>
        <a-plane position="0 0.01 0" rotation="-90 0 0" width="20" height="20"
            material="color: #333; opacity: 0.3; wireframe: true">
        </a-plane>
      </a-scene>
    `;

    containerRef.current.innerHTML = sceneHTML;

    return () => {
      if (containerRef.current) {
        const scene = containerRef.current.querySelector("a-scene");
        if (scene && scene.renderer) {
          scene.renderer.dispose();
        }
        containerRef.current.innerHTML = "";
      }
      sceneCreatedRef.current = false;
    };
  }, [tieneModelo, proyecto]);

  if (!proyecto) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial", background: "#0e0e0e", color: "white", minHeight: "100vh" }}>
        <h2>Proyecto no encontrado</h2>
        <button onClick={() => navigate("/")} style={btnStyle}>Volver</button>
      </div>
    );
  }

  const contenido = proyecto.contenido || {};

  const abrirLightbox = (media, indice) => {
    setMediaActual(media);
    setIndiceActual(indice);
    setLightboxAbierto(true);
  };

  const cerrarLightbox = () => {
    setLightboxAbierto(false);
    setMediaActual(null);
  };

  const navegarLightbox = (direccion) => {
    if (!contenido.imagenes) return;
    
    const totalItems = contenido.imagenes.length;
    let nuevoIndice = indiceActual + direccion;
    
    if (nuevoIndice < 0) nuevoIndice = totalItems - 1;
    if (nuevoIndice >= totalItems) nuevoIndice = 0;
    
    setIndiceActual(nuevoIndice);
    setMediaActual(contenido.imagenes[nuevoIndice]);
  };

  // Cerrar lightbox con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") cerrarLightbox();
      if (e.key === "ArrowLeft") navegarLightbox(-1);
      if (e.key === "ArrowRight") navegarLightbox(1);
    };

    if (lightboxAbierto) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxAbierto, indiceActual]);

  return (
    <div style={styles.container}>
      {/* ===== COLUMNA IZQUIERDA: INFO ===== */}
      <div style={{
        ...styles.columnaInfo,
        width: tieneModelo ? "40%" : "100%"
      }}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate("/")} style={styles.btnVolver}>
            ← Volver
          </button>
          <h1 style={styles.titulo}>{proyecto.titulo}</h1>
          <p style={styles.descripcionCorta}>{proyecto.descripcion}</p>
        </div>

        {/* Tabs de navegación */}
        {contenido.introduccion && (
          <div style={styles.tabs}>
            <button
              onClick={() => setSeccionActiva("info")}
              style={{
                ...styles.tab,
                ...(seccionActiva === "info" ? styles.tabActiva : {})
              }}
            >
              📋 Info
            </button>
            {contenido.imagenes && contenido.imagenes.length > 0 && (
              <button
                onClick={() => setSeccionActiva("galeria")}
                style={{
                  ...styles.tab,
                  ...(seccionActiva === "galeria" ? styles.tabActiva : {})
                }}
              >
                🖼️ Galería
              </button>
            )}
            {contenido.codigoEjemplo && (
              <button
                onClick={() => setSeccionActiva("codigo")}
                style={{
                  ...styles.tab,
                  ...(seccionActiva === "codigo" ? styles.tabActiva : {})
                }}
              >
                💻 Código
              </button>
            )}
          </div>
        )}

        {/* Contenido scrolleable */}
        <div style={styles.contenidoScroll}>
          {/* SECCIÓN: INFO */}
          {seccionActiva === "info" && (
            <div style={styles.seccion}>
              {contenido.introduccion && (
                <div style={styles.bloque}>
                  <h2 style={styles.subtitulo}>Descripción</h2>
                  <p style={styles.texto}>{contenido.introduccion}</p>
                </div>
              )}

              {contenido.caracteristicas && contenido.caracteristicas.length > 0 && (
                <div style={styles.bloque}>
                  <h2 style={styles.subtitulo}>Características</h2>
                  <ul style={styles.lista}>
                    {contenido.caracteristicas.map((item, idx) => (
                      <li key={idx} style={styles.listaItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {contenido.tecnologias && contenido.tecnologias.length > 0 && (
                <div style={styles.bloque}>
                  <h2 style={styles.subtitulo}>Tecnologías</h2>
                  <div style={styles.tecnologiasGrid}>
                    {contenido.tecnologias.map((tech, idx) => (
                      <div key={idx} style={styles.tecnologiaCard}>
                        <div style={styles.tecnologiaNombre}>{tech.nombre}</div>
                        <div style={styles.tecnologiaUso}>{tech.uso}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN: GALERÍA */}
          {seccionActiva === "galeria" && contenido.imagenes && (
            <div style={styles.seccion}>
              <h2 style={styles.subtitulo}>Galería</h2>
              <div style={styles.galeria}>
                {contenido.imagenes.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={styles.imagenWrapper}
                    onClick={() => abrirLightbox(item, idx)}
                  >
                    {item.tipo === "video" ? (
                      <>
                        <video
                          src={item.url}
                          style={styles.imagen}
                          muted
                          loop
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div style={styles.imagenPlaceholder}>
                          <span>🎥</span>
                          <p style={{ margin: 0, fontSize: "12px" }}>Video no disponible</p>
                        </div>
                        <div style={styles.videoIcon}>▶️</div>
                      </>
                    ) : (
                      <>
                        <img
                          src={item.url}
                          alt={item.descripcion}
                          style={styles.imagen}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div style={styles.imagenPlaceholder}>
                          <span>🖼️</span>
                          <p style={{ margin: 0, fontSize: "12px" }}>Imagen no disponible</p>
                        </div>
                      </>
                    )}
                    <p style={styles.imagenDescripcion}>{item.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN: CÓDIGO */}
          {seccionActiva === "codigo" && contenido.codigoEjemplo && (
            <div style={styles.seccion}>
              <h2 style={styles.subtitulo}>{contenido.codigoEjemplo.titulo}</h2>
              <div style={styles.codigoWrapper}>
                <div style={styles.codigoHeader}>
                  <span style={styles.codigoLenguaje}>{contenido.codigoEjemplo.lenguaje}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(contenido.codigoEjemplo.codigo);
                      alert("Código copiado al portapapeles");
                    }}
                    style={styles.btnCopiar}
                  >
                    📋 Copiar
                  </button>
                </div>
                <pre style={styles.codigoBloque}>
                  <code style={styles.codigo}>{contenido.codigoEjemplo.codigo}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Botones de acción (fijos abajo) */}
        <div style={styles.accionesFooter}>
          {proyecto.entorno && (
            <button onClick={() => navigate(proyecto.entorno)} style={styles.btnAccion}>
              🥽 Entrar al entorno VR
            </button>
          )}
          {proyecto.web && (
            <button onClick={() => window.open(proyecto.web, "_blank")} style={styles.btnAccionSecundario}>
              🌐 Ir a la web
            </button>
          )}
          {proyecto.code && (
            <button onClick={() => window.open(proyecto.code, "_blank")} style={styles.btnAccionSecundario}>
              📂 Ver código fuente
            </button>
          )}
        </div>
      </div>

      {/* ===== COLUMNA DERECHA: VISOR 3D ===== */}
      {tieneModelo && (
        <div ref={containerRef} style={styles.visor3D} />
      )}

      {/* ===== LIGHTBOX / VISOR DE GALERÍA ===== */}
      {lightboxAbierto && mediaActual && (
        <div style={styles.lightboxOverlay} onClick={cerrarLightbox}>
          <div style={styles.lightboxContenido} onClick={(e) => e.stopPropagation()}>
            {/* Botón cerrar */}
            <button style={styles.btnCerrarLightbox} onClick={cerrarLightbox}>
              ✕
            </button>

            {/* Navegación anterior */}
            {contenido.imagenes && contenido.imagenes.length > 1 && (
              <button 
                style={{...styles.btnNavLightbox, left: "20px"}} 
                onClick={() => navegarLightbox(-1)}
              >
                ◀
              </button>
            )}

            {/* Media (imagen o video) */}
            <div style={styles.lightboxMedia}>
              {mediaActual.tipo === "video" ? (
                <video
                  src={mediaActual.url}
                  style={styles.lightboxVideo}
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={mediaActual.url}
                  alt={mediaActual.descripcion}
                  style={styles.lightboxImagen}
                />
              )}
            </div>

            {/* Descripción */}
            {mediaActual.descripcion && (
              <div style={styles.lightboxDescripcion}>
                <p style={{ margin: 0 }}>{mediaActual.descripcion}</p>
                <span style={styles.lightboxContador}>
                  {indiceActual + 1} / {contenido.imagenes?.length || 1}
                </span>
              </div>
            )}

            {/* Navegación siguiente */}
            {contenido.imagenes && contenido.imagenes.length > 1 && (
              <button 
                style={{...styles.btnNavLightbox, right: "20px"}} 
                onClick={() => navegarLightbox(1)}
              >
                ▶
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== ESTILOS ==========
const styles = {
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "#0e0e0e",
    color: "white",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    overflow: "hidden",
  },

  columnaInfo: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%)",
    borderRight: "1px solid #333",
    position: "relative",
    zIndex: 10,
  },

  header: {
    padding: "30px 30px 20px",
    borderBottom: "1px solid #333",
  },

  btnVolver: {
    background: "transparent",
    color: "#888",
    border: "1px solid #333",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    marginBottom: "20px",
    transition: "all 0.3s",
  },

  titulo: {
    margin: "0 0 12px 0",
    fontSize: "28px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #fff 0%, #888 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  descripcionCorta: {
    margin: 0,
    fontSize: "14px",
    color: "#999",
    lineHeight: "1.6",
  },

  tabs: {
    display: "flex",
    gap: "8px",
    padding: "15px 30px",
    borderBottom: "1px solid #333",
    background: "#0a0a0a",
  },

  tab: {
    flex: 1,
    padding: "10px 16px",
    background: "transparent",
    border: "1px solid #333",
    borderRadius: "6px",
    color: "#888",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.3s",
  },

  tabActiva: {
    background: "#133a5f",
    borderColor: "#1e5a8f",
    color: "white",
  },

  contenidoScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "30px",
  },

  seccion: {
    animation: "fadeIn 0.3s ease-in",
  },

  bloque: {
    marginBottom: "30px",
  },

  subtitulo: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#fff",
    borderLeft: "3px solid #133a5f",
    paddingLeft: "12px",
  },

  texto: {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#ccc",
    margin: 0,
  },

  lista: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  listaItem: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#ccc",
    marginBottom: "10px",
    paddingLeft: "20px",
    position: "relative",
  },

  tecnologiasGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "12px",
  },

  tecnologiaCard: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "12px",
    transition: "all 0.3s",
  },

  tecnologiaNombre: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "4px",
  },

  tecnologiaUso: {
    fontSize: "12px",
    color: "#888",
  },

  galeria: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  imagenWrapper: {
    position: "relative",
    background: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #333",
    cursor: "pointer",
    transition: "all 0.3s",
  },

  imagen: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    display: "block",
  },

  imagenPlaceholder: {
    display: "none",
    width: "100%",
    height: "200px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#222",
    fontSize: "32px",
  },

  videoIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "48px",
    pointerEvents: "none",
    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
  },

  imagenDescripcion: {
    padding: "12px",
    fontSize: "13px",
    color: "#aaa",
    margin: 0,
  },

  // ===== LIGHTBOX STYLES =====
  lightboxOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.95)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    animation: "fadeIn 0.3s ease-in",
  },

  lightboxContenido: {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  lightboxMedia: {
    maxWidth: "100%",
    maxHeight: "calc(90vh - 100px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  lightboxImagen: {
    maxWidth: "100%",
    maxHeight: "calc(90vh - 100px)",
    objectFit: "contain",
    borderRadius: "8px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
  },

  lightboxVideo: {
    maxWidth: "100%",
    maxHeight: "calc(90vh - 100px)",
    borderRadius: "8px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
  },

  lightboxDescripcion: {
    marginTop: "20px",
    padding: "15px 25px",
    background: "rgba(0, 0, 0, 0.7)",
    borderRadius: "8px",
    color: "#fff",
    textAlign: "center",
    maxWidth: "600px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  lightboxContador: {
    fontSize: "12px",
    color: "#888",
    whiteSpace: "nowrap",
  },

  btnCerrarLightbox: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    zIndex: 10,
  },

  btnNavLightbox: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    color: "white",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    zIndex: 10,
  },

  codigoWrapper: {
    background: "#0a0a0a",
    border: "1px solid #333",
    borderRadius: "8px",
    overflow: "hidden",
  },

  codigoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "#1a1a1a",
    borderBottom: "1px solid #333",
  },

  codigoLenguaje: {
    fontSize: "12px",
    color: "#888",
    textTransform: "uppercase",
    fontWeight: "600",
  },

  btnCopiar: {
    background: "#133a5f",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
  },

  codigoBloque: {
    margin: 0,
    padding: "20px",
    overflow: "auto",
    maxHeight: "400px",
  },

  codigo: {
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#e6e6e6",
  },

  accionesFooter: {
    padding: "20px 30px",
    borderTop: "1px solid #333",
    background: "#0a0a0a",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
  },

  btnAccion: {
    padding: "10px 18px",
    background: "#133a5f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    flex: "0 0 auto",
    whiteSpace: "nowrap",
  },

  btnAccionSecundario: {
    padding: "10px 18px",
    background: "#1a1a1a",
    color: "#ccc",
    border: "1px solid #333",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.3s",
    flex: "0 0 auto",
    whiteSpace: "nowrap",
  },

  visor3D: {
    width: "60%",
    height: "100vh",
    position: "relative",
    pointerEvents: "auto", // Permite interacción con el canvas 3D
  },
};

const btnStyle = {
  display: "block",
  marginTop: "15px",
  padding: "12px 20px",
  background: "#133a5f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.3s",
};
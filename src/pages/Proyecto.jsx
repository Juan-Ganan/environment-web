import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { proyectos } from "../data/proyectos";
import "aframe";

export default function Proyecto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const proyecto = proyectos[id];
  const containerRef = useRef(null);
  const sceneCreatedRef = useRef(false);

  // ✅ CORRECCIÓN: validación completa con operador AND (&&)
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

        <!-- MODELO -->
        <a-entity
          obj-model="obj: #obj; mtl: #mtl"
          position="${proyecto.modelo3D.position}"
          rotation="${proyecto.modelo3D.rotation}"
          scale="${proyecto.modelo3D.scale}"
          animation="${proyecto.modelo3D.animation}">
        </a-entity>

        <!-- LUCES -->
        <a-light type="ambient" intensity="1"></a-light>
        <a-light type="directional" position="1 3 2" intensity="0.8"></a-light>
        <a-light type="directional" position="-1 2 -2" intensity="0.5"></a-light>

        <!-- SUELO -->
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

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "#0e0e0e",
        color: "white",
        fontFamily: "Arial",
        overflow: "hidden",
      }}
    >
      {/* ===== INFO (Columna Izquierda) ===== */}
      <div 
        style={{ 
          width: tieneModelo ? "40%" : "100%",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "auto",
          zIndex: 10,
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "32px" }}>{proyecto.titulo}</h1>
        <p style={{ lineHeight: "1.6", marginBottom: "30px", fontSize: "16px" }}>
          {proyecto.descripcion}
        </p>

        {proyecto.entorno && (
          <button
            onClick={() => navigate(proyecto.entorno)}
            style={btnStyle}
          >
            Entrar al entorno VR
          </button>
        )}

        {proyecto.web && (
          <button
            onClick={() => window.open(proyecto.web, "_blank")}
            style={{ ...btnStyle, background: "#444" }}
          >
            Ir a la web
          </button>
        )}

        {proyecto.code && (
          <button
            onClick={() => window.open(proyecto.code, "_blank")}
            style={{ ...btnStyle, background: "#444" }}
          >
            Ver código
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          style={{ ...btnStyle, background: "#222" }}
        >
          ← Volver
        </button>
      </div>

      {/* ===== VISOR 3D (Columna Derecha) ===== */}
      {tieneModelo && (
        <div 
          ref={containerRef}
          style={{ 
            width: "60%", 
            height: "100vh",
            position: "relative"
          }}
        />
      )}
    </div>
  );
}

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
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { proyectos } from "../data/proyectos";
import "aframe";

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sceneCreatedRef = useRef(false);

  useEffect(() => {
    if (sceneCreatedRef.current) return;
    sceneCreatedRef.current = true;

    if (!containerRef.current) return;

    const sceneHTML = `
      <a-scene 
        embedded 
        background="color: #0e0e0e"
        renderer="antialias: true; colorManagement: true"
        vr-mode-ui="enabled: false"
      >
        <a-assets timeout="30000">
          <a-asset-item id="kukaObj" src="/models/KUKA.obj"></a-asset-item>
        </a-assets>

        <a-entity position="-1 1.2 -2">
          <a-camera 
            look-controls="pointerLockEnabled: false"
            wasd-controls="acceleration: 20">
          </a-camera>
        </a-entity>

        <a-entity
          id="kuka-model"
          obj-model="obj: #kukaObj"
          position="0 1 -5"
          scale="0.01 0.01 0.01"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear">
        </a-entity>

        <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" color="#1a1a1a"></a-plane>
        <a-plane position="0 0.01 0" rotation="-90 0 0" width="20" height="20"
          material="color: #333; opacity: 0.3; wireframe: true">
        </a-plane>

        <a-light type="ambient" intensity="0.5"></a-light>
        <a-light type="directional" position="5 8 5" intensity="0.8"></a-light>
        <a-light type="directional" position="-5 5 -5" intensity="0.4" color="#6699ff"></a-light>
        <a-light type="point" position="0 3 -5" intensity="0.6" color="#ff9933"></a-light>

        <a-sky color="#050505"></a-sky>
      </a-scene>
    `;

    containerRef.current.innerHTML = sceneHTML;

    return () => {
      if (containerRef.current) {
        const scene = containerRef.current.querySelector("a-scene");
        if (scene && scene.renderer) scene.renderer.dispose();
        containerRef.current.innerHTML = "";
      }
      sceneCreatedRef.current = false;
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: "24px",
          zIndex: 10,
          color: "white",
          fontFamily: "Arial, sans-serif",
          pointerEvents: "none",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>Portafolio XR</h1>
        <p style={{ opacity: 0.75 }}>
          Proyectos en realidad virtual y gemelos digitales
        </p>

        {/* FLASHCARDS DINÁMICAS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
            pointerEvents: "auto",
          }}
        >
          {Object.entries(proyectos).map(([id, proyecto]) => (
            <ProjectCard
              key={id}
              title={proyecto.titulo}
              description={proyecto.descripcion}
              onClick={() => navigate(`/proyecto/${id}`)}


            />
          ))}
        </div>
      </div>

      {/* CONTENEDOR A-FRAME */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

/* ===================== */
/* FLASHCARD COMPONENT   */
/* ===================== */

function ProjectCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "260px",
        padding: "18px",
        borderRadius: "14px",
        background: "rgba(19, 58, 95, 0.85)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 35px rgba(0,0,0,0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "14px", opacity: 0.85 }}>{description}</p>
      <div style={{ marginTop: "10px", fontSize: "12px", opacity: 0.6 }}>
        Click para ver más →
      </div>
    </div>
  );
}

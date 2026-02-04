import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "aframe";

export default function Entorno() {
  const containerRef = useRef(null);
  const sceneCreatedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sceneCreatedRef.current) return;
    sceneCreatedRef.current = true;

    if (!containerRef.current) return;

    const sceneHTML = `
            <a-scene
            background="color: #ECECEC"
            renderer="antialias: true"
            vr-mode-ui="enabled: true"
            >
            <a-assets>
                <a-asset-item id="obj" src="/models/abb_trafo.obj"></a-asset-item>
                <a-asset-item id="mtl" src="/models/abb_trafo.mtl"></a-asset-item>
            </a-assets>

            <!-- MODELO -->
            <a-entity
                obj-model="obj: #obj; mtl: #mtl"
                position="0 0 -3"
                scale="0.01 0.01 0.01"
                rotation="-90 180 0">
            </a-entity>

            <!-- LUCES -->
            <a-light type="ambient" intensity="1"></a-light>
            <a-light type="directional" position="1 3 2" intensity="0.8"></a-light>

            </a-scene>
    `;

    containerRef.current.innerHTML = sceneHTML;

    const setupEvents = () => {
      const model = containerRef.current?.querySelector("#trafo-model");

      if (model) {
        model.addEventListener("model-loaded", () => {
          console.log("✅ Modelo ABB cargado correctamente");
        });

        model.addEventListener("model-error", (e) => {
          console.error("❌ Error cargando modelo ABB:", e);
        });
      }
    };

    setTimeout(setupEvents, 500);

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
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      
      {/* 🔙 BOTÓN DE RETORNO */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 20,
          padding: "10px 16px",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          cursor: "pointer",
          backdropFilter: "blur(6px)"
        }}
      >
        ← Volver
      </button>

      {/* CONTENEDOR A-FRAME */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
          <a-camera look-controls="pointerLockEnabled: false" wasd-controls="acceleration: 20">
          </a-camera>
        </a-entity>

        <a-entity
          id="kuka-model"
          obj-model="obj: #kukaObj; mtl: #kukaMtl"
          position="0 1 -5"
          scale="0.01 0.01 0.01"
          rotation="0 0 0"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear"
        ></a-entity>

        <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" color="#1a1a1a"></a-plane>
        <a-plane position="0 0.01 0" rotation="-90 0 0" width="20" height="20" material="color: #333; opacity: 0.3; wireframe: true"></a-plane>

        <a-light type="ambient" intensity="0.5"></a-light>
        <a-light type="directional" position="5 8 5" intensity="0.8"></a-light>
        <a-light type="directional" position="-5 5 -5" intensity="0.4" color="#6699ff"></a-light>
        <a-light type="point" position="0 3 -5" intensity="0.6" color="#ff9933"></a-light>

        <a-sky color="#050505"></a-sky>
      </a-scene>
    `;

    containerRef.current.innerHTML = sceneHTML;

    const setupEvents = () => {
      const model = containerRef.current?.querySelector("#kuka-model");

      if (model) {
        model.addEventListener("model-loaded", () => {
          console.log("✅ Modelo KUKA cargado correctamente");
        });

        model.addEventListener("model-error", (e) => {
          console.error("❌ Error cargando modelo KUKA:", e);
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
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* OVERLAY INFO */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: "20px",
          zIndex: 10,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Entorno VR – KUKA</h1>
        <p>Visualización del robot industrial KUKA en realidad virtual</p>
        <button
          onClick={() => navigate("/entorno")}
          style={{
            background: "#133a5fb2",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Entrar al entorno VR
        </button>
      </div>

      {/* Contenedor A-Frame */}
      <div 
        ref={containerRef} 
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
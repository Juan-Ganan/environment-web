import { useEffect, useRef } from "react";
import "aframe";

export default function Entorno() {
  const containerRef = useRef(null);
  const sceneCreatedRef = useRef(false);

  useEffect(() => {
    if (sceneCreatedRef.current) return;
    sceneCreatedRef.current = true;

    if (!containerRef.current) return;

    const sceneHTML = `
      <a-scene 
        embedded 
        background="color: #ECECEC"
        renderer="antialias: true; colorManagement: true"
        vr-mode-ui="enabled: false"
      >
        <a-assets timeout="30000">
          <a-asset-item id="abbObj" src="/models/abb_trafo.obj"></a-asset-item>
          <a-asset-item id="abbMtl" src="/models/abb_trafo.mtl"></a-asset-item>
        </a-assets>

        <a-entity position="0 1.6 3">
          <a-camera look-controls="pointerLockEnabled: false" wasd-controls="acceleration: 15">
          </a-camera>
        </a-entity>

        <a-entity
          id="trafo-model"
          obj-model="obj: #abbObj; mtl: #abbMtl"
          position="0 0 -3"
          scale="0.01 0.01 0.01"
          rotation="-90 180 0"
        ></a-entity>

        <a-light type="ambient" intensity="1"></a-light>
        <a-light type="directional" position="1 3 2" intensity="0.8" castShadow="true"></a-light>

        <a-sky color="#87CEEB"></a-sky>
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
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <div 
        ref={containerRef} 
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
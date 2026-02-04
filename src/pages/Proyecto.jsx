import { useParams, useNavigate } from "react-router-dom";
import { proyectos } from "../data/proyectos";

export default function Proyecto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const proyecto = proyectos[id];

  if (!proyecto) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h2>Proyecto no encontrado</h2>
        <button onClick={() => navigate("/")}>Volver al Home</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        minHeight: "100vh",
        background: "#0e0e0e",
        color: "white",
      }}
    >
      <h1>{proyecto.titulo}</h1>
      <p style={{ maxWidth: "600px" }}>{proyecto.descripcion}</p>

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
          Ir a la web del proyecto
        </button>
      )}

      {proyecto.code && (
        <button
          onClick={() => window.open(proyecto.code, "_blank")}
          style={{ ...btnStyle, background: "#444" }}
        >
          Ver código fuente
        </button>
      )}

      <br /><br />

      <button
        onClick={() => navigate("/")}
        style={{ ...btnStyle, background: "#222" }}
      >
        ← Volver al Home
      </button>
    </div>
  );
}

const btnStyle = {
  display: "block",
  marginTop: "20px",
  padding: "12px 20px",
  background: "#133a5f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

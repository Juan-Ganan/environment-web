import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proyecto from "./pages/Proyecto";
import Entorno from "./pages/Entorno";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/:id" element={<Proyecto />} />
        <Route path="/entorno" element={<Entorno />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Entorno from "./pages/Entorno";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entorno" element={<Entorno />} />
      </Routes>
    </BrowserRouter>
  );
}

// Punto de entrada de la app. Monta el componente <App /> en el div #root.
// Acá también importamos Bootstrap y nuestro CSS global.

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

// Estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Nuestro CSS personalizado (colores rositas y ajustes)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

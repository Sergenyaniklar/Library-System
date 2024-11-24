import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM artık client'dan alınmalı
import App from "./App";
import "./index.css";

// createRoot ile yeni API kullanılıyor
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

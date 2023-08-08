import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const root = document.getElementById("root");

// Use createRoot instead of ReactDOM.render
const rootComponent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = ReactDOM.createRoot(root);
rootElement.render(rootComponent);

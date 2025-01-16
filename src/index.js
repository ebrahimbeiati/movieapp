import React from "react";
import ReactDOM from "react-dom/client"; // Correct import
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Using createRoot from react-dom/client

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { RecipeProvider } from "./store/RecipeProvider";
import { Root } from "./Root";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecipeProvider>
      <Router>
        <Root />
      </Router>
    </RecipeProvider>
  </React.StrictMode>
);

reportWebVitals();

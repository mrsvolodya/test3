import "./index.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { RecipeProvider } from "./store/RecipeProvider";
import { Root } from "./Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecipeProvider>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </Router>
  </RecipeProvider>
);

reportWebVitals();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
// import AuthContextProvider from "./Context/AppContext";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Context/AppContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
  <AuthContextProvider>
    
      <App />
    {/* </BrowserRouter> */}
  </AuthContextProvider>
  </BrowserRouter>
);

reportWebVitals();

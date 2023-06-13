import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store/store.js";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
);

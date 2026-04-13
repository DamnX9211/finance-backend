import ReactDOM from "react-dom/client";
import AppRouter from "./app/router";
import Providers from "./app/provider";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <AppRouter />
    <Toaster />
  </Providers>
);
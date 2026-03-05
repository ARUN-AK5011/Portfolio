import { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { AllProjectsPage } from "./components/AllProjectsPage";

function getPage(pathname: string): "home" | "projects" {
  return pathname.includes("projects") ? "projects" : "home";
}

// Global navigate - lets any component push a route without React Router
export function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function App() {
  const [page, setPage] = useState<"home" | "projects">(() =>
    getPage(window.location.pathname)
  );

  useEffect(() => {
    const handler = () => setPage(getPage(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  if (page === "projects") return <AllProjectsPage />;
  return <HomePage />;
}
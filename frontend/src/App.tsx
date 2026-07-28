import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { PromptLibrary } from "./pages/PromptLibrary";

/**
 * Application route table. Layout and page content are added in the next
 * frontend milestones, while these stable paths keep navigation decoupled
 * from individual components.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prompts" element={<PromptLibrary />} />
        <Route path="/favorites" element={<PromptLibrary favoritesOnly />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

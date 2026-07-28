import { useEffect } from "react";
import { usePrompt } from "./hooks/usePrompt";

function App() {
  const { prompts, fetchPrompts, loading } = usePrompt();

  useEffect(() => {
    fetchPrompts();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Total Prompts: {prompts.length}</h1>
    </div>
  );
}

export default App;
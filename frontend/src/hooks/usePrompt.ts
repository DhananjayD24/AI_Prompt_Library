import { useContext } from "react";
import { PromptContext } from "../context/promptContext";

export const usePrompt = () => {
  const context = useContext(PromptContext);

  if (!context) {
    throw new Error(
      "usePrompt must be used within PromptProvider"
    );
  }

  return context;
};

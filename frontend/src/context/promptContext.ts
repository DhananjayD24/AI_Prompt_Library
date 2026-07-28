import { createContext } from "react";
import type { Prompt } from "../types/prompt";
import type { PromptFormData } from "../schemas/prompt.schema";

export interface PromptContextType {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
  fetchPrompts: (params?: { search?: string; category?: string; favorite?: boolean; sort?: string }) => Promise<void>;
  createNewPrompt: (data: PromptFormData) => Promise<void>;
  editPrompt: (id: string, data: PromptFormData) => Promise<void>;
  removePrompt: (id: string) => Promise<void>;
  duplicateExistingPrompt: (id: string) => Promise<void>;
}

export const PromptContext = createContext<PromptContextType | null>(null);

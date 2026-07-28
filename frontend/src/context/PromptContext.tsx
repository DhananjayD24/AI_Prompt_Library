import { createContext, useState } from "react";
import type { Prompt } from "../types/prompt";
import type { PromptFormData } from "../schemas/prompt.schema";
import {
    getPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    duplicatePrompt,
  } from "../services/prompt.service";

export interface PromptContextType {
  prompts: Prompt[];
  loading: boolean;

  fetchPrompts: (params?: {
    search?: string;
    category?: string;
    favorite?: boolean;
    sort?: string;
  }) => Promise<void>;

  createNewPrompt: (data: PromptFormData) => Promise<void>;

  editPrompt: (id: string, data: PromptFormData) => Promise<void>;

  removePrompt: (id: string) => Promise<void>;

  duplicateExistingPrompt: (id: string) => Promise<void>;
}

export const PromptContext = createContext<PromptContextType | null>(null);

interface PromptProviderProps {
  children: React.ReactNode;
}

export const PromptProvider = ({ children }: PromptProviderProps) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPrompts = async (params?: {
    search?: string;
    category?: string;
    favorite?: boolean;
    sort?: string;
  }) => {
    try {
      setLoading(true);
  
      const data = await getPrompts(params);
  
      setPrompts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const createNewPrompt = async (data: PromptFormData) => {
    try {
      await createPrompt(data);
  
      await fetchPrompts();
    } catch (error) {
      console.error(error);
    }
  };
  const editPrompt = async (
    id: string,
    data: PromptFormData
  ) => {
    try {
      await updatePrompt(id, data);
  
      await fetchPrompts();
    } catch (error) {
      console.error(error);
    }
  };
  const removePrompt = async (id: string) => {
    try {
      await deletePrompt(id);
  
      await fetchPrompts();
    } catch (error) {
      console.error(error);
    }
  };
  const duplicateExistingPrompt = async (id: string) => {
    try {
      await duplicatePrompt(id);
  
      await fetchPrompts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PromptContext.Provider
      value={
        {prompts,
        loading,
        fetchPrompts,
        createNewPrompt,
        editPrompt,
        removePrompt,
        duplicateExistingPrompt}
      }
    >
      {children}
    </PromptContext.Provider>
  );
};
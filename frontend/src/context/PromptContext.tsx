import { useCallback, useMemo, useState } from "react";
import type { Prompt } from "../types/prompt";
import type { PromptFormData } from "../schemas/prompt.schema";
import { createPrompt, deletePrompt, duplicatePrompt, getPrompts, updatePrompt } from "../services/prompt.service";
import { PromptContext } from "./promptContext";
import toast from "react-hot-toast";

interface PromptProviderProps {
  children: React.ReactNode;
}

export const PromptProvider = ({ children }: PromptProviderProps) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrompts = useCallback(async (params?: { search?: string; category?: string; favorite?: boolean; sort?: string }) => {
    try {
      setLoading(true);
      setError(null);
      setPrompts(await getPrompts(params));
    } catch (error) {
      console.error(error);
      setError("We couldn't load your prompts. Check that the backend is running and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewPrompt = useCallback(async (data: PromptFormData) => {
    try { await createPrompt(data); await fetchPrompts(); toast.success("Prompt created"); } catch (error) { console.error(error); toast.error("Couldn’t create the prompt"); throw error; }
  }, [fetchPrompts]);

  const editPrompt = useCallback(async (id: string, data: PromptFormData) => {
    try { await updatePrompt(id, data); await fetchPrompts(); toast.success("Prompt updated"); } catch (error) { console.error(error); toast.error("Couldn’t update the prompt"); throw error; }
  }, [fetchPrompts]);

  const removePrompt = useCallback(async (id: string) => {
    try { await deletePrompt(id); await fetchPrompts(); toast.success("Prompt deleted"); } catch (error) { console.error(error); toast.error("Couldn’t delete the prompt"); throw error; }
  }, [fetchPrompts]);

  const duplicateExistingPrompt = useCallback(async (id: string) => {
    try { await duplicatePrompt(id); await fetchPrompts(); toast.success("Prompt duplicated"); } catch (error) { console.error(error); toast.error("Couldn’t duplicate the prompt"); throw error; }
  }, [fetchPrompts]);

  const value = useMemo(
    () => ({ prompts, loading, error, fetchPrompts, createNewPrompt, editPrompt, removePrompt, duplicateExistingPrompt }),
    [prompts, loading, error, fetchPrompts, createNewPrompt, editPrompt, removePrompt, duplicateExistingPrompt],
  );

  return <PromptContext.Provider value={value}>{children}</PromptContext.Provider>;
};

import { useEffect } from "react";
import { X } from "lucide-react";
import { usePrompt } from "../../hooks/usePrompt";
import type { Prompt } from "../../types/prompt";
import type { PromptFormData } from "../../schemas/prompt.schema";
import { PromptForm } from "../prompts/PromptForm";

interface PromptModalProps { prompt: Prompt | null; onClose: () => void; }

export function PromptModal({ prompt, onClose }: PromptModalProps) {
  const { createNewPrompt, editPrompt } = usePrompt();
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, [onClose]);
  const save = async (data: PromptFormData) => { try { if (prompt) await editPrompt(prompt._id, data); else await createNewPrompt(data); onClose(); } catch { /* context displays the failure toast */ } };
  return <div className="modal-backdrop" role="presentation"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="prompt-modal-title"><div className="modal-header"><div><h2 id="prompt-modal-title">{prompt ? "Edit prompt" : "New prompt"}</h2><p>{prompt ? "Update the details of your saved prompt." : "Save a reusable prompt to your library."}</p></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close modal"><X size={20} /></button></div><PromptForm prompt={prompt ?? undefined} onSubmit={save} onCancel={onClose} /></div></div>;
}

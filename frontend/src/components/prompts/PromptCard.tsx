import { Check, Copy, Heart, Pencil, Pin, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Prompt } from "../../types/prompt";

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
}

export function PromptCard({ prompt, onEdit, onDelete }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast.success("Prompt copied to clipboard");
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error(error);
      toast.error("Couldn’t copy the prompt");
    }
  };

  return (
    <article className="prompt-card">
      <div className="prompt-card-topline">
        <span className="category-badge">{prompt.category}</span>
        <div className="prompt-statuses">
          {prompt.pinned && <Pin size={16} aria-label="Pinned" />}
          {prompt.favorite && <Heart size={16} fill="currentColor" aria-label="Favorite" />}
        </div>
      </div>
      <h3>{prompt.title}</h3>
      <p className="prompt-description">{prompt.description || "No description provided."}</p>
      <p className="prompt-preview">{prompt.prompt}</p>
      {prompt.tags.length > 0 && <div className="tag-list">{prompt.tags.slice(0, 4).map((tag) => <span key={tag}>#{tag}</span>)}</div>}
      <div className="prompt-card-footer">
        <time dateTime={prompt.updatedAt}>Updated {new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(prompt.updatedAt))}</time>
        <div className="card-actions">
          <button className="card-action" type="button" onClick={() => void copyPrompt()} aria-label={`Copy ${prompt.title}`} title="Copy prompt">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
          <button className="card-action" type="button" onClick={() => onEdit(prompt)} aria-label={`Edit ${prompt.title}`} title="Edit prompt"><Pencil size={16} /></button>
          <button className="card-action card-action-danger" type="button" onClick={() => onDelete(prompt)} aria-label={`Delete ${prompt.title}`} title="Delete prompt"><Trash2 size={16} /></button>
        </div>
      </div>
    </article>
  );
}

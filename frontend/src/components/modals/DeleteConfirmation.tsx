import { AlertTriangle, X } from "lucide-react";
import type { Prompt } from "../../types/prompt";
import { usePrompt } from "../../hooks/usePrompt";

interface DeleteConfirmationProps {
  prompt: Prompt;
  onClose: () => void;
}

export function DeleteConfirmation({
  prompt,
  onClose,
}: DeleteConfirmationProps) {
  const { removePrompt } = usePrompt();
  const deletePrompt = async () => {
    try {
      await removePrompt(prompt._id);
      onClose();
    } catch {
      /* context displays the failure toast */
    }
  };
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <button
          className="modal-close icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
        >
          <X size={20} />
        </button>
        <div className="confirmation-icon">
          <AlertTriangle size={24} />
        </div>
        <h2 id="delete-title">Delete prompt?</h2>
        <p>
          <strong>{prompt.title}</strong> will be permanently removed from your
          library. This cannot be undone.
        </p>
        <div className="modal-actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="button button-danger"
            type="button"
            onClick={() => void deletePrompt()}
          >
            Delete prompt
          </button>
        </div>
      </div>
    </div>
  );
}

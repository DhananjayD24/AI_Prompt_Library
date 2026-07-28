import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { CATEGORIES, type Category, type Prompt } from "../../types/prompt";
import { promptSchema, type PromptFormData } from "../../schemas/prompt.schema";

interface PromptFormProps {
  prompt?: Prompt;
  onSubmit: (data: PromptFormData) => Promise<void>;
  onCancel: () => void;
}

interface PromptFormFields {
  title: string;
  prompt: string;
  description: string;
  category: Category;
  tags: string[];
  favorite: boolean;
  pinned: boolean;
}

const emptyValues: PromptFormFields = { title: "", prompt: "", description: "", category: "Coding", tags: [], favorite: false, pinned: false };

export function PromptForm({ prompt, onSubmit, onCancel }: PromptFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PromptFormFields>({ resolver: zodResolver(promptSchema) as Resolver<PromptFormFields>, defaultValues: emptyValues });

  useEffect(() => {
    reset(prompt ? { title: prompt.title, prompt: prompt.prompt, description: prompt.description, category: prompt.category, tags: prompt.tags, favorite: prompt.favorite, pinned: prompt.pinned } : emptyValues);
  }, [prompt, reset]);

  const submit = async (data: PromptFormFields) => { await onSubmit(data); };

  return (
    <form className="prompt-form" onSubmit={handleSubmit(submit)} noValidate>
      <label>Title<input {...register("title")} autoFocus placeholder="e.g. Review pull request" />{errors.title && <small>{errors.title.message}</small>}</label>
      <label>Description <span className="optional-label">optional</span><input {...register("description")} placeholder="A short note about this prompt" />{errors.description && <small>{errors.description.message}</small>}</label>
      <label>Prompt<textarea {...register("prompt")} rows={7} placeholder="Write your prompt here..." />{errors.prompt && <small>{errors.prompt.message}</small>}</label>
      <div className="form-two-columns">
        <label>Category<select {...register("category")}>{CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select>{errors.category && <small>{errors.category.message}</small>}</label>
        <label>Tags <span className="optional-label">comma-separated</span><input {...register("tags", { setValueAs: (value: string) => value.split(",").map((tag) => tag.trim()).filter(Boolean) })} placeholder="writing, work" /></label>
      </div>
      <div className="checkbox-row"><label><input type="checkbox" {...register("favorite")} /> Favorite</label><label><input type="checkbox" {...register("pinned")} /> Pin this prompt</label></div>
      <div className="modal-actions"><button className="button button-secondary" type="button" onClick={onCancel}>Cancel</button><button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : prompt ? "Save changes" : "Create prompt"}</button></div>
    </form>
  );
}

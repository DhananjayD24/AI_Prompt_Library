import { Download, FileUp, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { promptSchema, type PromptFormData } from "../../schemas/prompt.schema";
import { exportPrompts, importPrompts } from "../../services/prompt.service";
import { usePrompt } from "../../hooks/usePrompt";

export function ImportExportActions() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"import" | "export" | null>(null);
  const { fetchPrompts } = usePrompt();

  const downloadExport = async () => {
    try {
      setBusy("export");
      const prompts = await exportPrompts();
      const blob = new Blob([JSON.stringify(prompts, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prompt-library-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success(`${prompts.length} prompts exported`);
    } catch (error) {
      console.error(error);
      toast.error("Couldn’t export prompts");
    } finally { setBusy(null); }
  };

  const importFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!file) return;
    try {
      setBusy("import");
      const parsed: unknown = JSON.parse(await file.text());
      if (!Array.isArray(parsed)) throw new Error("The JSON must contain an array of prompts.");
      const validation = parsed.map((item) => promptSchema.safeParse(item));
      const invalidCount = validation.filter((result) => !result.success).length;
      if (invalidCount > 0) throw new Error(`${invalidCount} prompt${invalidCount === 1 ? " is" : "s are"} invalid.`);
      await importPrompts(validation.map((result) => result.data as PromptFormData));
      await fetchPrompts();
      toast.success(`${validation.length} prompt${validation.length === 1 ? "" : "s"} imported`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Couldn’t import prompts");
    } finally { setBusy(null); }
  };

  const isBusy = busy !== null;
  return <div className="import-export-actions">
    <input ref={inputRef} className="sr-only" type="file" accept="application/json,.json" onChange={(event) => void importFile(event)} />
    <button className="button button-secondary import-export-button" type="button" onClick={() => inputRef.current?.click()} disabled={isBusy}>{busy === "import" ? <LoaderCircle className="spin" size={17} /> : <FileUp size={17} />} Import</button>
    <button className="button button-secondary import-export-button" type="button" onClick={() => void downloadExport()} disabled={isBusy}>{busy === "export" ? <LoaderCircle className="spin" size={17} /> : <Download size={17} />} Export</button>
  </div>;
}

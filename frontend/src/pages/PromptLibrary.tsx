import { useEffect, useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { CategoryFilter } from "../components/prompts/CategoryFilter";
import { ImportExportActions } from "../components/prompts/ImportExportActions";
import { PromptGrid } from "../components/prompts/PromptGrid";
import { SearchBar } from "../components/prompts/SearchBar";
import { SortDropdown } from "../components/prompts/SortDropdown";
import { DeleteConfirmation } from "../components/modals/DeleteConfirmation";
import { usePrompt } from "../hooks/usePrompt";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import type { Prompt } from "../types/prompt";

interface LayoutContext {
  openCreateModal: () => void;
  openEditModal: (prompt: Prompt) => void;
}
interface PromptLibraryProps {
  favoritesOnly?: boolean;
}

const getStoredOrder = (): string[] => {
  try {
    const storedOrder: unknown = JSON.parse(
      localStorage.getItem("prompt-library-order") ?? "[]",
    );
    return Array.isArray(storedOrder) &&
      storedOrder.every((id) => typeof id === "string")
      ? storedOrder
      : [];
  } catch {
    return [];
  }
};

export function PromptLibrary({ favoritesOnly = false }: PromptLibraryProps) {
  const { openCreateModal, openEditModal } = useOutletContext<LayoutContext>();
  const { prompts, loading, error, fetchPrompts } = usePrompt();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [manualOrder, setManualOrder] = useState<string[]>(getStoredOrder);
  const [promptToDelete, setPromptToDelete] = useState<Prompt | null>(null);

  useEffect(() => {
    void fetchPrompts({
      search: debouncedSearch || undefined,
      category: category || undefined,
      favorite: favoritesOnly || undefined,
      sort: sort === "custom" ? undefined : sort,
    });
  }, [debouncedSearch, category, sort, favoritesOnly, fetchPrompts]);

  useEffect(() => {
    localStorage.setItem("prompt-library-order", JSON.stringify(manualOrder));
  }, [manualOrder]);

  const heading = favoritesOnly ? "Favorites" : "All prompts";
  const subtitle = favoritesOnly
    ? "The prompts you’ve marked for quick access."
    : "Search, organize, and reuse your prompt collection.";
  const visiblePrompts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();
    return prompts
      .filter((prompt) => !favoritesOnly || prompt.favorite)
      .filter((prompt) => !category || prompt.category === category)
      .filter(
        (prompt) =>
          !normalizedSearch ||
          [
            prompt.title,
            prompt.prompt,
            prompt.description,
            ...prompt.tags,
          ].some((value) => value.toLowerCase().includes(normalizedSearch)),
      )
      .sort((first, second) => {
        if (sort === "custom") {
          const firstOrder = manualOrder.indexOf(first._id);
          const secondOrder = manualOrder.indexOf(second._id);
          return (
            (firstOrder === -1 ? Number.MAX_SAFE_INTEGER : firstOrder) -
            (secondOrder === -1 ? Number.MAX_SAFE_INTEGER : secondOrder)
          );
        }
        if (sort === "oldest")
          return (
            new Date(first.createdAt).getTime() -
            new Date(second.createdAt).getTime()
          );
        if (sort === "az") return first.title.localeCompare(second.title);
        if (sort === "za") return second.title.localeCompare(first.title);
        return (
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime()
        );
      });
  }, [prompts, debouncedSearch, category, sort, favoritesOnly, manualOrder]);

  const reorderPrompts = (activeId: string, overId: string) => {
    setSort("custom");
    setManualOrder((currentOrder) => {
      const visibleIds = visiblePrompts.map((prompt) => prompt._id);
      const completeOrder = [
        ...currentOrder,
        ...visibleIds.filter((id) => !currentOrder.includes(id)),
      ];
      const reorderedIds = [...visibleIds];
      const fromIndex = reorderedIds.indexOf(activeId);
      const toIndex = reorderedIds.indexOf(overId);
      reorderedIds.splice(fromIndex, 1);
      reorderedIds.splice(toIndex, 0, activeId);
      return [
        ...reorderedIds,
        ...completeOrder.filter((id) => !visibleIds.includes(id)),
      ];
    });
  };

  return (
    <section className="prompt-library-page">
      <div className="library-heading">
        <div>
          <p className="eyebrow">Prompt collection</p>
          <h1>{heading}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        <div className="library-heading-actions">
          <ImportExportActions />
          <button
            className="button button-primary library-add-button"
            type="button"
            onClick={openCreateModal}
          >
            <FilePlus2 size={18} /> New prompt
          </button>
        </div>
      </div>
      <div className="prompt-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <div className="toolbar-selects">
          <CategoryFilter value={category} onChange={setCategory} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>
      <p className="result-count">
        {loading
          ? "Updating…"
          : `${visiblePrompts.length} prompt${visiblePrompts.length === 1 ? "" : "s"}`}
      </p>
      {error ? (
        <div className="library-state" role="alert">
          <h2>Couldn’t load prompts</h2>
          <p>{error}</p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => void fetchPrompts()}
          >
            Try again
          </button>
        </div>
      ) : loading ? (
        <div className="library-state" role="status">
          Loading prompts…
        </div>
      ) : visiblePrompts.length === 0 ? (
        <div className="library-state">
          <FilePlus2 size={30} aria-hidden="true" />
          <h2>{favoritesOnly ? "No favorites yet" : "No prompts found"}</h2>
          <p>
            {favoritesOnly
              ? "Mark a prompt as a favorite when you create or edit it."
              : "Create a prompt or adjust your search and filters."}
          </p>
          {!favoritesOnly && (
            <button
              className="button button-primary"
              type="button"
              onClick={openCreateModal}
            >
              Create your first prompt
            </button>
          )}
        </div>
      ) : (
        <PromptGrid
          prompts={visiblePrompts}
          onEdit={openEditModal}
          onDelete={setPromptToDelete}
          onReorder={reorderPrompts}
        />
      )}
      {promptToDelete && (
        <DeleteConfirmation
          prompt={promptToDelete}
          onClose={() => setPromptToDelete(null)}
        />
      )}
    </section>
  );
}

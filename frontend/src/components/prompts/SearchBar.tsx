import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <Search size={19} aria-hidden="true" />
      <span className="sr-only">Search prompts</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search prompts..."
        type="search"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </label>
  );
}

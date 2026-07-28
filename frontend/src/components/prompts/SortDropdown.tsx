interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="filter-select">
      <span className="sr-only">Sort prompts</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="custom">Custom order</option>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="az">Name: A–Z</option>
        <option value="za">Name: Z–A</option>
      </select>
    </label>
  );
}

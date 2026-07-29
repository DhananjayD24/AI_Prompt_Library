import { CATEGORIES } from "../../types/prompt";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <label className="filter-select">
      <span className="sr-only">Filter by category</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search item",
}: SearchInputProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:border-gray-500">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

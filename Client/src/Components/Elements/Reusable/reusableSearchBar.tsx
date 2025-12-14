// components/Reusable/SearchBar.tsx
import { useState, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceTime?: number; // delay for search
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  debounceTime = 300,
  initialValue = "",
}) => {
  const [query, setQuery] = useState(initialValue);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch, debounceTime]);

  // Handle button click
  const handleButtonClick = () => {
    onSearch(query); // trigger search immediately
  };

  return (
    <div className="flex w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-600 bg-[#141518] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

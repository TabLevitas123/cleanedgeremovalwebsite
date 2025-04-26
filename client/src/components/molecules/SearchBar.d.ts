import React from 'react';
interface SearchBarProps {
    className?: string;
    placeholder?: string;
    compact?: boolean;
    onSearch?: (query: string) => void;
    searchEndpoint?: string;
}
/**
 * SearchBar Component
 *
 * A search input with expandable functionality for desktop and mobile.
 * Can be used for global search or specific section searches.
 */
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
//# sourceMappingURL=SearchBar.d.ts.map
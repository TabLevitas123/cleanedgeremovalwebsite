"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const notificationSlice_1 = require("../../features/notifications/notificationSlice");
const Button_1 = __importDefault(require("../atoms/Button"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * SearchBar Component
 *
 * A search input with expandable functionality for desktop and mobile.
 * Can be used for global search or specific section searches.
 */
const SearchBar = ({ className = '', placeholder = 'Search...', compact = false, onSearch, searchEndpoint = '/search', }) => {
    const [query, setQuery] = (0, react_1.useState)('');
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(!compact);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    // Focus input when expanded
    (0, react_1.useEffect)(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);
    // Handle expand toggle
    const handleExpandToggle = () => {
        setIsExpanded(!isExpanded);
    };
    // Handle input change
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    // Handle search submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate query
        if (!query.trim()) {
            return;
        }
        // If custom search handler is provided, use it
        if (onSearch) {
            onSearch(query.trim());
            return;
        }
        // Otherwise, perform default search behavior
        try {
            setIsLoading(true);
            // In a real application, this would be an API call
            // For now, we'll simulate a search by navigating to the search page
            await new Promise(resolve => setTimeout(resolve, 500));
            // Navigate to search results page
            navigate(`${searchEndpoint}?q=${encodeURIComponent(query.trim())}`);
        }
        catch (error) {
            // Show error notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'error',
                title: 'Search Failed',
                message: 'There was an error processing your search. Please try again later.',
                duration: 5000,
            }));
        }
        finally {
            setIsLoading(false);
        }
    };
    // Render compact search button only
    if (compact && !isExpanded) {
        return (<Button_1.default variant="text" icon="search" aria-label="Open search" onClick={handleExpandToggle} className={className}/>);
    }
    return (<form onSubmit={handleSubmit} className={`relative ${className}`} role="search">
      <div className="relative">
        <input ref={inputRef} type="text" value={query} onChange={handleInputChange} placeholder={placeholder} className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200" aria-label="Search" disabled={isLoading}/>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon_1.default name="search" size="small" className="text-neutral-500 dark:text-neutral-400"/>
        </div>
        
        {query && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isLoading ? (<Icon_1.default name="loader" size="small" className="text-neutral-500 dark:text-neutral-400 animate-spin"/>) : (<button type="button" onClick={() => setQuery('')} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200" aria-label="Clear search">
                <Icon_1.default name="x" size="small"/>
              </button>)}
          </div>)}
      </div>
      
      {compact && (<button type="button" onClick={handleExpandToggle} className="absolute right-0 -mr-10 inset-y-0 flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200" aria-label="Close search">
          <Icon_1.default name="x" size="small"/>
        </button>)}
    </form>);
};
exports.default = SearchBar;
//# sourceMappingURL=SearchBar.jsx.map
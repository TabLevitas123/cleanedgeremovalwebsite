"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * Breadcrumbs Component
 *
 * Displays a breadcrumb navigation trail based on the current route.
 * Uses the breadcrumbs state from the UI slice.
 */
const Breadcrumbs = ({ className = '', separator = <Icon_1.default name="chevron-right" size="small" className="mx-2 text-neutral-400"/>, maxItems = 0, }) => {
    const { breadcrumbs } = (0, react_redux_1.useSelector)((state) => state.ui);
    // If no breadcrumbs or only home, don't render
    if (!breadcrumbs || breadcrumbs.length <= 1) {
        return null;
    }
    // Handle max items (if specified)
    let displayedBreadcrumbs = breadcrumbs;
    if (maxItems > 0 && breadcrumbs.length > maxItems) {
        const firstItem = breadcrumbs[0];
        const lastItems = breadcrumbs.slice(breadcrumbs.length - (maxItems - 1));
        displayedBreadcrumbs = [
            firstItem,
            { path: '', label: '...' },
            ...lastItems,
        ];
    }
    return (<nav aria-label="Breadcrumb" className={`py-2 ${className}`}>
      <ol className="flex flex-wrap items-center text-sm">
        {displayedBreadcrumbs.map((breadcrumb, index) => {
            const isLast = index === displayedBreadcrumbs.length - 1;
            return (<li key={breadcrumb.path || index} className="flex items-center">
              {index > 0 && (<span className="flex-shrink-0">{separator}</span>)}
              
              {isLast ? (<span className="font-medium text-neutral-800 dark:text-neutral-200" aria-current="page">
                  {breadcrumb.label}
                </span>) : (breadcrumb.path ? (<react_router_dom_1.Link to={breadcrumb.path} className="text-primary-color hover:text-primary-light hover:underline transition-colors">
                    {breadcrumb.label}
                  </react_router_dom_1.Link>) : (<span className="text-neutral-500 dark:text-neutral-400">
                    {breadcrumb.label}
                  </span>))}
            </li>);
        })}
      </ol>
    </nav>);
};
exports.default = Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.jsx.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const react_helmet_async_1 = require("react-helmet-async");
const store_1 = require("./store");
const App_1 = __importDefault(require("./App"));
require("./styles/index.css");
require("react-toastify/dist/ReactToastify.css");
// Get the root element
const rootElement = document.getElementById('root');
// Ensure the root element exists
if (!rootElement) {
    throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML.');
}
// Create a root
const root = (0, client_1.createRoot)(rootElement);
// Render the app
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store_1.store}>
      <react_helmet_async_1.HelmetProvider>
        <react_router_dom_1.BrowserRouter>
          <App_1.default />
          <react_toastify_1.ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        </react_router_dom_1.BrowserRouter>
      </react_helmet_async_1.HelmetProvider>
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
//# sourceMappingURL=index.js.map
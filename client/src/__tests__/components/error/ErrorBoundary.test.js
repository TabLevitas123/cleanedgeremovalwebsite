"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_router_dom_1 = require("react-router-dom");
const ErrorBoundary_1 = __importDefault(require("../../../components/error/ErrorBoundary"));
const logger_1 = require("../../../utils/logger");
// Mock logger to prevent actual logging during tests
jest.mock('../../../utils/logger', () => ({
    logger: {
        error: jest.fn(),
    },
}));
// Component that throws an error for testing
const ErrorThrowingComponent = ({ shouldThrow = true }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>No error thrown</div>;
};
// Save original console.error
const originalConsoleError = console.error;
// Save original window.location reference
const originalWindowLocation = window.location;
describe('ErrorBoundary', () => {
    // Suppress React's error logging in tests and mock window.location
    beforeAll(() => {
        console.error = jest.fn();
        // Use Object.defineProperty for more control over mocking location
        Object.defineProperty(window, 'location', {
            configurable: true, // Allow redefining/deleting later
            value: { ...originalWindowLocation, reload: jest.fn() }, // Spread original properties and add mock reload
        });
    });
    // Restore original console.error and window.location after tests
    afterAll(() => {
        console.error = originalConsoleError;
        // Restore original window.location
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalWindowLocation,
        });
    });
    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
        window.location.reload.mockClear();
    });
    it('should render children when no error occurs', () => {
        (0, react_2.render)(<ErrorBoundary_1.default>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary_1.default>);
        expect(react_2.screen.getByTestId('child')).toBeInTheDocument();
        expect(react_2.screen.getByText('Child Component')).toBeInTheDocument();
    });
    it('should render fallback UI when an error occurs', () => {
        // Suppress React's error boundary warning in this test
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });
        (0, react_2.render)(<react_router_dom_1.MemoryRouter>
        <ErrorBoundary_1.default>
          <ErrorThrowingComponent />
        </ErrorBoundary_1.default>
      </react_router_dom_1.MemoryRouter>);
        // Check that fallback UI is rendered
        expect(react_2.screen.getByText('Something Went Wrong')).toBeInTheDocument();
        expect(react_2.screen.getByText(/We're sorry, but an error occurred/)).toBeInTheDocument();
        // Check for action buttons
        expect(react_2.screen.getByText('Reload Page')).toBeInTheDocument();
        expect(react_2.screen.getByText('Go to Home')).toBeInTheDocument();
        // Restore console.error for other tests
        spy.mockRestore();
    });
    it('should render custom fallback when provided', () => {
        // Suppress React's error boundary warning in this test
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });
        const customFallback = <div data-testid="custom-fallback">Custom Error UI</div>;
        (0, react_2.render)(<ErrorBoundary_1.default fallback={customFallback}>
        <ErrorThrowingComponent />
      </ErrorBoundary_1.default>);
        expect(react_2.screen.getByTestId('custom-fallback')).toBeInTheDocument();
        expect(react_2.screen.getByText('Custom Error UI')).toBeInTheDocument();
        // Restore console.error for other tests
        spy.mockRestore();
    });
    it('should call onError callback when an error occurs', () => {
        // Suppress React's error boundary warning in this test
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });
        const handleError = jest.fn();
        (0, react_2.render)(<react_router_dom_1.MemoryRouter>
        <ErrorBoundary_1.default onError={handleError}>
          <ErrorThrowingComponent />
        </ErrorBoundary_1.default>
      </react_router_dom_1.MemoryRouter>);
        // Check that onError was called with the error
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(handleError).toHaveBeenCalledWith(expect.any(Error), expect.objectContaining({ componentStack: expect.any(String) }));
        // Restore console.error for other tests
        spy.mockRestore();
    });
    it('should log the error when an error occurs', () => {
        // Suppress React's error boundary warning in this test
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });
        (0, react_2.render)(<react_router_dom_1.MemoryRouter>
        <ErrorBoundary_1.default>
          <ErrorThrowingComponent />
        </ErrorBoundary_1.default>
      </react_router_dom_1.MemoryRouter>);
        // Check that logger.error was called
        expect(logger_1.logger.error).toHaveBeenCalledTimes(1);
        // Corrected assertion: Check the structure based on previous test output
        expect(logger_1.logger.error).toHaveBeenCalledWith('Error caught by ErrorBoundary:', expect.objectContaining({
            error: "Error: Test error", // Expect the error message string directly
            componentStack: expect.any(String), // Verify componentStack is a string
        }));
        // Restore console.error for other tests
        spy.mockRestore();
    });
    it('should handle reload page button click', async () => {
        // Suppress React's error boundary warning in this test
        const consoleErrorSpy = jest.spyOn(console, 'error');
        consoleErrorSpy.mockImplementation(() => { });
        // Mock is handled in beforeAll/afterAll
        (0, react_2.render)(<react_router_dom_1.MemoryRouter>
        <ErrorBoundary_1.default>
          <ErrorThrowingComponent />
        </ErrorBoundary_1.default>
      </react_router_dom_1.MemoryRouter>);
        // Click the reload button using userEvent for more realistic interaction
        await user_event_1.default.click(react_2.screen.getByText('Reload Page'));
        // Check that window.location.reload was called
        expect(window.location.reload).toHaveBeenCalledTimes(1);
        // Restore mocks
        consoleErrorSpy.mockRestore();
    });
    it('should not show error details in production', () => {
        // Suppress React's error boundary warning in this test
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });
        // Save original NODE_ENV
        const originalNodeEnv = process.env.NODE_ENV;
        // Set NODE_ENV to production
        process.env.NODE_ENV = 'production';
        (0, react_2.render)(<react_router_dom_1.MemoryRouter>
        <ErrorBoundary_1.default>
          <ErrorThrowingComponent />
        </ErrorBoundary_1.default>
      </react_router_dom_1.MemoryRouter>);
        // Check that error details are not shown
        expect(react_2.screen.queryByText('Error Details:')).not.toBeInTheDocument();
        // Restore NODE_ENV
        process.env.NODE_ENV = originalNodeEnv;
        // Restore console.error for other tests
        spy.mockRestore();
    });
    it('should show error details in development', () => {
        // Suppress React's error boundary warning in this test
        const spy = jest.spyOn(console, 'error');
        spy.mockImplementation(() => { });
        // Save original NODE_ENV
        const originalNodeEnv = process.env.NODE_ENV;
        // Set NODE_ENV to development (Jest default is 'test', explicitly set for clarity)
        process.env.NODE_ENV = 'development';
        (0, react_2.render)(<react_router_dom_1.MemoryRouter>
        <ErrorBoundary_1.default>
          <ErrorThrowingComponent />
        </ErrorBoundary_1.default>
      </react_router_dom_1.MemoryRouter>);
        // Check that error details are shown
        expect(react_2.screen.getByText('Error Details:')).toBeInTheDocument();
        expect(react_2.screen.getByText(/Test error/)).toBeInTheDocument();
        // Restore NODE_ENV
        process.env.NODE_ENV = originalNodeEnv;
        // Restore console.error for other tests
        spy.mockRestore();
    });
});
//# sourceMappingURL=ErrorBoundary.test.js.map
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../../../components/error/ErrorBoundary';
import { logger } from '../../../utils/logger';

// Mock logger to prevent actual logging during tests
jest.mock('../../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

// Component that throws an error for testing
const ErrorThrowingComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
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
    (window.location.reload as jest.Mock).mockClear(); 
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should render fallback UI when an error occurs', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Check that fallback UI is rendered
    expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
    expect(screen.getByText(/We're sorry, but an error occurred/)).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();

    // Restore console.error for other tests
    spy.mockRestore();
  });

  it('should render custom fallback when provided', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const customFallback = <div data-testid="custom-fallback">Custom Error UI</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();

    // Restore console.error for other tests
    spy.mockRestore();
  });

  it('should call onError callback when an error occurs', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const handleError = jest.fn();

    render(
      <MemoryRouter>
        <ErrorBoundary onError={handleError}>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Check that onError was called with the error
    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(handleError).toHaveBeenCalledWith(
        expect.any(Error), 
        expect.objectContaining({ componentStack: expect.any(String) }) 
    );

    // Restore console.error for other tests
    spy.mockRestore();
  });

  it('should log the error when an error occurs', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Check that logger.error was called
    expect(logger.error).toHaveBeenCalledTimes(1);
    // Corrected assertion: Check the structure based on previous test output
    expect(logger.error).toHaveBeenCalledWith(
      'Error caught by ErrorBoundary:',
      expect.objectContaining({ // Check the outer object structure
        error: "Error: Test error", // Expect the error message string directly
        componentStack: expect.any(String), // Verify componentStack is a string
      })
    );

    // Restore console.error for other tests
    spy.mockRestore();
  });

  it('should handle reload page button click', async () => { 
    // Suppress React's error boundary warning in this test
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    // Mock is handled in beforeAll/afterAll

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Click the reload button using userEvent for more realistic interaction
    await userEvent.click(screen.getByText('Reload Page'));

    // Check that window.location.reload was called
    expect(window.location.reload).toHaveBeenCalledTimes(1);

    // Restore mocks
    consoleErrorSpy.mockRestore();
  });

  it('should not show error details in production', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Save original NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    
    // Set NODE_ENV to production
    process.env.NODE_ENV = 'production';

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Check that error details are not shown
    expect(screen.queryByText('Error Details:')).not.toBeInTheDocument();

    // Restore NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;

    // Restore console.error for other tests
    spy.mockRestore();
  });

  it('should show error details in development', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Save original NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    
    // Set NODE_ENV to development (Jest default is 'test', explicitly set for clarity)
    process.env.NODE_ENV = 'development';

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Check that error details are shown
    expect(screen.getByText('Error Details:')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument(); 

    // Restore NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;

    // Restore console.error for other tests
    spy.mockRestore();
  });
});
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

describe('ErrorBoundary', () => {
  // Suppress React's error logging in tests
  beforeAll(() => {
    console.error = jest.fn();
  });

  // Restore original console.error after tests
  afterAll(() => {
    console.error = originalConsoleError;
  });

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(handleError.mock.calls[0][0].message).toBe('Test error');

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
    expect(logger.error).toHaveBeenCalledWith(
      'Error caught by ErrorBoundary:',
      expect.objectContaining({
        error: expect.stringContaining('Test error'),
        componentStack: expect.any(String),
      })
    );

    // Restore console.error for other tests
    spy.mockRestore();
  });

  it('should handle reload page button click', () => {
    // Suppress React's error boundary warning in this test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Mock window.location.reload
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // Click the reload button
    userEvent.click(screen.getByText('Reload Page'));

    // Check that window.location.reload was called
    expect(mockReload).toHaveBeenCalledTimes(1);

    // Restore console.error for other tests
    spy.mockRestore();
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
    
    // Set NODE_ENV to development
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
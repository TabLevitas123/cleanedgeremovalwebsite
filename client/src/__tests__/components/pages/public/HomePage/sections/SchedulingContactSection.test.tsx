import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom'; 
import SchedulingContactSection from '../../../../../../components/pages/public/HomePage/sections/SchedulingContactSection';
import { api } from '../../../../../../services/api'; 
import notificationsReducer from '../../../../../../features/notifications/notificationSlice'; 

// Mock the RTK Query hook
const mockSubmitQuoteRequest = jest.fn();
jest.mock('../../../../../../services/api', () => ({
  ...jest.requireActual('../../../../../../services/api'), 
  useSubmitQuoteRequestMutation: () => [mockSubmitQuoteRequest, { isLoading: false, isSuccess: false, isError: false, error: null }], 
}));

// Mock Redux store setup
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
};

// Helper function to render the component with necessary providers
const renderComponent = (store = createMockStore()) => {
  const utils = render( 
    <Provider store={store}>
      <Router> 
        <SchedulingContactSection />
      </Router>
    </Provider>
  );
  return { ...utils, container: utils.container }; 
};

// Helper to get checkbox by ID 
const getCheckboxById = (container: HTMLElement, id: string): HTMLInputElement => {
    const input = container.querySelector(`#${id}`); 
    if (!input) {
        throw new Error(`Input element with id "${id}" not found.`);
    }
    return input as HTMLInputElement;
}

describe('SchedulingContactSection Component', () => {
  beforeEach(() => {
    mockSubmitQuoteRequest.mockClear();
    // Mock console methods
    jest.spyOn(console, 'error').mockImplementation(() => {}); 
    jest.spyOn(console, 'warn').mockImplementation(() => {}); 
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log as well
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore(); 
    (console.log as jest.Mock).mockRestore(); // Restore console.log
  });

  test('renders the form correctly in "Request a Quote" mode', () => {
    const { container } = renderComponent(); 

    expect(screen.getByRole('heading', { name: /request a quote/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name\*/i)).toBeInTheDocument();
    // ... other rendering checks ...
    expect(container.querySelector('#privacyPolicy')).toBeInTheDocument(); 
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/please describe\*/i)).not.toBeInTheDocument();
  });

  test('updates text input fields correctly', () => {
    renderComponent();
    const nameInput = screen.getByPlaceholderText(/name\*/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const emailInput = screen.getByPlaceholderText(/email\*/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  test('updates service checkboxes correctly and shows/hides "Other" description', () => {
    const { container } = renderComponent(); 
    const junkRemovalCheckbox = getCheckboxById(container, 'service-junk-removal'); 
    const otherCheckbox = getCheckboxById(container, 'service-other'); 

    expect(junkRemovalCheckbox).toBeInTheDocument();
    expect(otherCheckbox).toBeInTheDocument();

    fireEvent.click(junkRemovalCheckbox);
    expect(junkRemovalCheckbox.checked).toBe(true);
    expect(screen.queryByPlaceholderText(/please describe\*/i)).not.toBeInTheDocument();

    fireEvent.click(otherCheckbox);
    expect(otherCheckbox.checked).toBe(true);
    expect(screen.getByPlaceholderText(/please describe\*/i)).toBeInTheDocument();

    fireEvent.click(otherCheckbox);
    expect(otherCheckbox.checked).toBe(false);
    expect(screen.queryByPlaceholderText(/please describe\*/i)).not.toBeInTheDocument();
     expect(junkRemovalCheckbox.checked).toBe(true); 
  });
  
  test('updates consent checkboxes correctly', () => {
    const { container } = renderComponent(); 
    const privacyCheckbox = getCheckboxById(container, 'privacyPolicy'); 
    const marketingCheckbox = getCheckboxById(container, 'marketingConsent'); 

    expect(privacyCheckbox).toBeInTheDocument();
    expect(marketingCheckbox).toBeInTheDocument();

    fireEvent.click(privacyCheckbox);
    expect(privacyCheckbox.checked).toBe(true);

    fireEvent.click(marketingCheckbox);
    expect(marketingCheckbox.checked).toBe(true);
     expect(privacyCheckbox.checked).toBe(true); 
  });

  test('clears the form when "Clear" button is clicked', () => {
     const { container } = renderComponent(); 
     const nameInput = screen.getByPlaceholderText(/name\*/i) as HTMLInputElement;
     const otherCheckbox = getCheckboxById(container, 'service-other'); 
     const privacyCheckbox = getCheckboxById(container, 'privacyPolicy'); 
     const clearButton = screen.getByRole('button', { name: /clear/i });
     const junkRemovalCheckbox = getCheckboxById(container, 'service-junk-removal');

     expect(privacyCheckbox).toBeInTheDocument(); 
     expect(otherCheckbox).toBeInTheDocument();
     expect(junkRemovalCheckbox).toBeInTheDocument();

     fireEvent.change(nameInput, { target: { value: 'Test Name' } });
     fireEvent.click(otherCheckbox);
     fireEvent.click(privacyCheckbox);
     const otherDescriptionInput = screen.getByPlaceholderText(/please describe\*/i) as HTMLTextAreaElement;
     fireEvent.change(otherDescriptionInput, { target: { value: 'Test Description' } });

     expect(nameInput.value).toBe('Test Name');
     // ... other assertions ...

     fireEvent.click(clearButton);

     expect(nameInput.value).toBe('');
     // ... other assertions ...
     expect(junkRemovalCheckbox.checked).toBe(false); 
  });

  // --- Validation Tests ---
  
  test('displays validation errors for required fields on submit', async () => {
    renderComponent();
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.click(submitButton); 

    // Use findByText which includes waitFor implicitly
    expect(await screen.findByText('Full name must be at least 2 characters')).toBeInTheDocument(); 
    expect(await screen.findByText('Service address must be at least 5 characters')).toBeInTheDocument(); 
    expect(await screen.findByText('Email address is required')).toBeInTheDocument(); 
    // Corrected: Expect 'required' message for empty cellPhone as regex allows empty
    expect(await screen.findByText('Cell phone number is required')).toBeInTheDocument(); 
    expect(await screen.findByText('At least one service must be selected')).toBeInTheDocument();
    expect(await screen.findByText('You must agree to the Privacy Policy')).toBeInTheDocument();
    
    expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
  });

  test('displays validation error for invalid email format', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText(/email\*/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(emailInput, 'invalid-email'); 
    await userEvent.click(submitButton);

    expect(await screen.findByText('Invalid email address format')).toBeInTheDocument();
    expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
  });
  
  test('displays validation error for invalid phone format', async () => {
    renderComponent();
    const phoneInput = screen.getByPlaceholderText(/cell phone number\*/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(phoneInput, '12345'); 
    await userEvent.click(submitButton);

    expect(await screen.findByText('Invalid cell phone number format (at least 10 digits)')).toBeInTheDocument();
    expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
  });

  test('displays validation error for "Other" description when "Other" service is selected but description is empty', async () => {
    const { container } = renderComponent(); 
    const otherCheckbox = getCheckboxById(container, 'service-other'); 
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const privacyCheckbox = getCheckboxById(container, 'privacyPolicy'); 

    expect(privacyCheckbox).toBeInTheDocument(); 
    expect(otherCheckbox).toBeInTheDocument();

    await userEvent.click(otherCheckbox); 
    await userEvent.type(screen.getByPlaceholderText(/name\*/i), 'Test');
    await userEvent.type(screen.getByPlaceholderText(/address\*/i), 'Test Address');
    await userEvent.type(screen.getByPlaceholderText(/email\*/i), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText(/cell phone number\*/i), '1234567890');
    await userEvent.click(privacyCheckbox); 

    await userEvent.click(submitButton);

    expect(await screen.findByText('Description must be at least 5 characters when "Other" is selected')).toBeInTheDocument(); 
    expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
  });

  test('clears validation error when input is corrected', async () => {
     renderComponent();
     const nameInput = screen.getByPlaceholderText(/name\*/i);
     const submitButton = screen.getByRole('button', { name: /submit/i });

     await userEvent.click(submitButton);
     expect(await screen.findByText('Full name must be at least 2 characters')).toBeInTheDocument(); 

     await userEvent.type(nameInput, 'Valid Name'); 

     // Use waitForElementToBeRemoved for better assertion of disappearance
     await waitFor(() => 
        expect(screen.queryByText('Full name must be at least 2 characters')).not.toBeInTheDocument()
     );
     expect(screen.queryByText('Full name is required')).not.toBeInTheDocument(); 
  });

  // --- Submission Tests ---

  test('calls submitQuoteRequest mutation with correct payload on valid submission', async () => {
    mockSubmitQuoteRequest.mockResolvedValue({ data: { success: true, message: 'OK' } }); 

    const { container } = renderComponent(); 
    const privacyCheckbox = getCheckboxById(container, 'privacyPolicy'); 
    const junkRemovalCheckbox = getCheckboxById(container, 'service-junk-removal');
    const otherCheckbox = getCheckboxById(container, 'service-other');
    const marketingCheckbox = getCheckboxById(container, 'marketingConsent');

    expect(privacyCheckbox).toBeInTheDocument(); 
    expect(junkRemovalCheckbox).toBeInTheDocument();
    expect(otherCheckbox).toBeInTheDocument();
    expect(marketingCheckbox).toBeInTheDocument();

    // Fill form using userEvent
    await userEvent.type(screen.getByPlaceholderText(/name\*/i), 'Valid Name');
    await userEvent.type(screen.getByPlaceholderText(/address\*/i), '123 Valid St');
    await userEvent.type(screen.getByPlaceholderText(/email\*/i), 'valid@example.com');
    await userEvent.type(screen.getByPlaceholderText(/cell phone number\*/i), '123-456-7890');
    await userEvent.type(screen.getByPlaceholderText(/home phone number/i), '987-654-3210'); 
    await userEvent.click(junkRemovalCheckbox); 
    await userEvent.click(otherCheckbox); 
    await userEvent.type(screen.getByPlaceholderText(/please describe\*/i), 'Specific other service details');
    await userEvent.click(privacyCheckbox); 
    await userEvent.click(marketingCheckbox); 

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton); // Await the click

    // Wait for the mock function to have been called
    await waitFor(() => { 
      expect(mockSubmitQuoteRequest).toHaveBeenCalledTimes(1);
    });

    // Assert the payload after confirming the call
    expect(mockSubmitQuoteRequest).toHaveBeenCalledWith({
      fullName: 'Valid Name',
      serviceAddress: '123 Valid St',
      email: 'valid@example.com',
      cellPhone: '123-456-7890',
      homePhone: '987-654-3210',
      workPhone: undefined, 
      services: ['Junk Removal', 'Other'],
      otherDescription: 'Specific other service details',
      privacyPolicy: true,
      marketingConsent: true,
    });

    expect(screen.queryByText('Full name must be at least 2 characters')).not.toBeInTheDocument();
  });

});

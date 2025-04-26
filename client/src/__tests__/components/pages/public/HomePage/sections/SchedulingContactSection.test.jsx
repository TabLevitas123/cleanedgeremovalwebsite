"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom");
const react_redux_1 = require("react-redux");
const toolkit_1 = require("@reduxjs/toolkit");
const react_router_dom_1 = require("react-router-dom");
const SchedulingContactSection_1 = __importDefault(require("../../../../../../components/pages/public/HomePage/sections/SchedulingContactSection"));
const api_1 = require("../../../../../../services/api");
const notificationSlice_1 = __importDefault(require("../../../../../../features/notifications/notificationSlice"));
// Mock the RTK Query hook
const mockSubmitQuoteRequest = jest.fn();
jest.mock('../../../../../../services/api', () => ({
    ...jest.requireActual('../../../../../../services/api'),
    useSubmitQuoteRequestMutation: () => [mockSubmitQuoteRequest, { isLoading: false, isSuccess: false, isError: false, error: null }],
}));
// Mock Redux store setup
const createMockStore = (preloadedState = {}) => {
    return (0, toolkit_1.configureStore)({
        reducer: {
            [api_1.api.reducerPath]: api_1.api.reducer,
            notifications: notificationSlice_1.default,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api_1.api.middleware),
        preloadedState,
    });
};
// Helper function to render the component with necessary providers
const renderComponent = (store = createMockStore()) => {
    const utils = (0, react_2.render)(<react_redux_1.Provider store={store}>
      <react_router_dom_1.BrowserRouter> 
        <SchedulingContactSection_1.default />
      </react_router_dom_1.BrowserRouter>
    </react_redux_1.Provider>);
    return { ...utils, container: utils.container };
};
// Helper to get checkbox by ID 
const getCheckboxById = (container, id) => {
    const input = container.querySelector(`#${id}`);
    if (!input) {
        throw new Error(`Input element with id "${id}" not found.`);
    }
    return input;
};
describe('SchedulingContactSection Component', () => {
    beforeEach(() => {
        mockSubmitQuoteRequest.mockClear();
        // Mock console methods
        jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Mock console.log as well
    });
    afterEach(() => {
        console.error.mockRestore();
        console.warn.mockRestore();
        console.log.mockRestore(); // Restore console.log
    });
    test('renders the form correctly in "Request a Quote" mode', () => {
        const { container } = renderComponent();
        expect(react_2.screen.getByRole('heading', { name: /request a quote/i })).toBeInTheDocument();
        expect(react_2.screen.getByPlaceholderText(/name\*/i)).toBeInTheDocument();
        // ... other rendering checks ...
        expect(container.querySelector('#privacyPolicy')).toBeInTheDocument();
        expect(react_2.screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(react_2.screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
        expect(react_2.screen.queryByPlaceholderText(/please describe\*/i)).not.toBeInTheDocument();
    });
    test('updates text input fields correctly', () => {
        renderComponent();
        const nameInput = react_2.screen.getByPlaceholderText(/name\*/i);
        react_2.fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        expect(nameInput.value).toBe('John Doe');
        const emailInput = react_2.screen.getByPlaceholderText(/email\*/i);
        react_2.fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        expect(emailInput.value).toBe('john.doe@example.com');
    });
    test('updates service checkboxes correctly and shows/hides "Other" description', () => {
        const { container } = renderComponent();
        const junkRemovalCheckbox = getCheckboxById(container, 'service-junk-removal');
        const otherCheckbox = getCheckboxById(container, 'service-other');
        expect(junkRemovalCheckbox).toBeInTheDocument();
        expect(otherCheckbox).toBeInTheDocument();
        react_2.fireEvent.click(junkRemovalCheckbox);
        expect(junkRemovalCheckbox.checked).toBe(true);
        expect(react_2.screen.queryByPlaceholderText(/please describe\*/i)).not.toBeInTheDocument();
        react_2.fireEvent.click(otherCheckbox);
        expect(otherCheckbox.checked).toBe(true);
        expect(react_2.screen.getByPlaceholderText(/please describe\*/i)).toBeInTheDocument();
        react_2.fireEvent.click(otherCheckbox);
        expect(otherCheckbox.checked).toBe(false);
        expect(react_2.screen.queryByPlaceholderText(/please describe\*/i)).not.toBeInTheDocument();
        expect(junkRemovalCheckbox.checked).toBe(true);
    });
    test('updates consent checkboxes correctly', () => {
        const { container } = renderComponent();
        const privacyCheckbox = getCheckboxById(container, 'privacyPolicy');
        const marketingCheckbox = getCheckboxById(container, 'marketingConsent');
        expect(privacyCheckbox).toBeInTheDocument();
        expect(marketingCheckbox).toBeInTheDocument();
        react_2.fireEvent.click(privacyCheckbox);
        expect(privacyCheckbox.checked).toBe(true);
        react_2.fireEvent.click(marketingCheckbox);
        expect(marketingCheckbox.checked).toBe(true);
        expect(privacyCheckbox.checked).toBe(true);
    });
    test('clears the form when "Clear" button is clicked', () => {
        const { container } = renderComponent();
        const nameInput = react_2.screen.getByPlaceholderText(/name\*/i);
        const otherCheckbox = getCheckboxById(container, 'service-other');
        const privacyCheckbox = getCheckboxById(container, 'privacyPolicy');
        const clearButton = react_2.screen.getByRole('button', { name: /clear/i });
        const junkRemovalCheckbox = getCheckboxById(container, 'service-junk-removal');
        expect(privacyCheckbox).toBeInTheDocument();
        expect(otherCheckbox).toBeInTheDocument();
        expect(junkRemovalCheckbox).toBeInTheDocument();
        react_2.fireEvent.change(nameInput, { target: { value: 'Test Name' } });
        react_2.fireEvent.click(otherCheckbox);
        react_2.fireEvent.click(privacyCheckbox);
        const otherDescriptionInput = react_2.screen.getByPlaceholderText(/please describe\*/i);
        react_2.fireEvent.change(otherDescriptionInput, { target: { value: 'Test Description' } });
        expect(nameInput.value).toBe('Test Name');
        // ... other assertions ...
        react_2.fireEvent.click(clearButton);
        expect(nameInput.value).toBe('');
        // ... other assertions ...
        expect(junkRemovalCheckbox.checked).toBe(false);
    });
    // --- Validation Tests ---
    test('displays validation errors for required fields on submit', async () => {
        renderComponent();
        const submitButton = react_2.screen.getByRole('button', { name: /submit/i });
        await user_event_1.default.click(submitButton);
        // Use findByText which includes waitFor implicitly
        expect(await react_2.screen.findByText('Full name must be at least 2 characters')).toBeInTheDocument();
        expect(await react_2.screen.findByText('Service address must be at least 5 characters')).toBeInTheDocument();
        expect(await react_2.screen.findByText('Email address is required')).toBeInTheDocument();
        // Corrected: Expect 'required' message for empty cellPhone as regex allows empty
        expect(await react_2.screen.findByText('Cell phone number is required')).toBeInTheDocument();
        expect(await react_2.screen.findByText('At least one service must be selected')).toBeInTheDocument();
        expect(await react_2.screen.findByText('You must agree to the Privacy Policy')).toBeInTheDocument();
        expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
    });
    test('displays validation error for invalid email format', async () => {
        renderComponent();
        const emailInput = react_2.screen.getByPlaceholderText(/email\*/i);
        const submitButton = react_2.screen.getByRole('button', { name: /submit/i });
        await user_event_1.default.type(emailInput, 'invalid-email');
        await user_event_1.default.click(submitButton);
        expect(await react_2.screen.findByText('Invalid email address format')).toBeInTheDocument();
        expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
    });
    test('displays validation error for invalid phone format', async () => {
        renderComponent();
        const phoneInput = react_2.screen.getByPlaceholderText(/cell phone number\*/i);
        const submitButton = react_2.screen.getByRole('button', { name: /submit/i });
        await user_event_1.default.type(phoneInput, '12345');
        await user_event_1.default.click(submitButton);
        expect(await react_2.screen.findByText('Invalid cell phone number format (at least 10 digits)')).toBeInTheDocument();
        expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
    });
    test('displays validation error for "Other" description when "Other" service is selected but description is empty', async () => {
        const { container } = renderComponent();
        const otherCheckbox = getCheckboxById(container, 'service-other');
        const submitButton = react_2.screen.getByRole('button', { name: /submit/i });
        const privacyCheckbox = getCheckboxById(container, 'privacyPolicy');
        expect(privacyCheckbox).toBeInTheDocument();
        expect(otherCheckbox).toBeInTheDocument();
        await user_event_1.default.click(otherCheckbox);
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/name\*/i), 'Test');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/address\*/i), 'Test Address');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/email\*/i), 'test@test.com');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/cell phone number\*/i), '1234567890');
        await user_event_1.default.click(privacyCheckbox);
        await user_event_1.default.click(submitButton);
        expect(await react_2.screen.findByText('Description must be at least 5 characters when "Other" is selected')).toBeInTheDocument();
        expect(mockSubmitQuoteRequest).not.toHaveBeenCalled();
    });
    test('clears validation error when input is corrected', async () => {
        renderComponent();
        const nameInput = react_2.screen.getByPlaceholderText(/name\*/i);
        const submitButton = react_2.screen.getByRole('button', { name: /submit/i });
        await user_event_1.default.click(submitButton);
        expect(await react_2.screen.findByText('Full name must be at least 2 characters')).toBeInTheDocument();
        await user_event_1.default.type(nameInput, 'Valid Name');
        // Use waitForElementToBeRemoved for better assertion of disappearance
        await (0, react_2.waitFor)(() => expect(react_2.screen.queryByText('Full name must be at least 2 characters')).not.toBeInTheDocument());
        expect(react_2.screen.queryByText('Full name is required')).not.toBeInTheDocument();
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
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/name\*/i), 'Valid Name');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/address\*/i), '123 Valid St');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/email\*/i), 'valid@example.com');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/cell phone number\*/i), '123-456-7890');
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/home phone number/i), '987-654-3210');
        await user_event_1.default.click(junkRemovalCheckbox);
        await user_event_1.default.click(otherCheckbox);
        await user_event_1.default.type(react_2.screen.getByPlaceholderText(/please describe\*/i), 'Specific other service details');
        await user_event_1.default.click(privacyCheckbox);
        await user_event_1.default.click(marketingCheckbox);
        const submitButton = react_2.screen.getByRole('button', { name: /submit/i });
        await user_event_1.default.click(submitButton); // Await the click
        // Wait for the mock function to have been called
        await (0, react_2.waitFor)(() => {
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
        expect(react_2.screen.queryByText('Full name must be at least 2 characters')).not.toBeInTheDocument();
    });
});
//# sourceMappingURL=SchedulingContactSection.test.jsx.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require("@testing-library/jest-dom");
// Polyfill the fetch API for Jest tests (Node.js environment)
// This is necessary for RTK Query's fetchBaseQuery to work in tests.
require("whatwg-fetch");
// You can add other global test setup here if needed, for example:
// - Mocking global objects (localStorage, matchMedia)
// - Setting up server mocks (e.g., using MSW - Mock Service Worker)
// Example: Mock matchMedia (often needed for responsive components)
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });
//# sourceMappingURL=setupTests.js.map
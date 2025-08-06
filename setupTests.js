// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Spy on localStorage methods
jest.spyOn(Storage.prototype, 'setItem');
jest.spyOn(Storage.prototype, 'getItem');

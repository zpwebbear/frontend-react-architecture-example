// Mock any browser APIs that might not be available in Jest
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Set up global test timeouts
jest.setTimeout(10000); // 10 seconds

// Any global test configurations can go here

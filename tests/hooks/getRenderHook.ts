function getRenderHook() {
  try {
    // Attempt to import the module
    const testingLibraryHooks = require('@testing-library/react-hooks');
    return testingLibraryHooks.renderHook;
  } catch (error) {
    // Handle the case where the module is not available
    console.error('Unable to import @testing-library/react-hooks:', error);
    // Fallback to using require
    return require('@testing-library/react').renderHook;
  }
}
  
export const renderHook = getRenderHook();

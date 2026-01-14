function getRenderHook() {
  try {
    // Attempt to import testing-library/react-hooks
    const testingLibraryHooks = require('@testing-library/react-hooks');
    return testingLibraryHooks.renderHook;
  } catch (error) {
    // Fallback to using testing-library/react
    return require('@testing-library/react').renderHook;
  }
}

export const renderHook = getRenderHook();

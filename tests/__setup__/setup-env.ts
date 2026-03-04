import '@testing-library/jest-dom';
import { server } from './server';
import { TextEncoder } from 'util';
import { MessageChannel } from 'worker_threads';

global.TextEncoder = TextEncoder;
// React 19's scheduler expects MessageChannel to exist in the test environment.
const globalWithMessageChannel = globalThis as typeof globalThis & { MessageChannel?: typeof MessageChannel };
globalWithMessageChannel.MessageChannel = globalWithMessageChannel.MessageChannel ?? MessageChannel;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const SUPPRESSED_TEST_WARNINGS = [
  /An update to .* inside a test was not wrapped in act\(\.\.\.\)/,
  /Error occured executing generative direct answer\./,
];

const SUPPRESSED_TEST_LOGS = [
  /react-i18next:: useTranslation: You will need to pass in an i18next instance/
];

const originalConsoleError = console.error.bind(console);
const originalConsoleWarn = console.warn.bind(console);

console.error = (...args) => {
  const firstArg = args[0];
  if (typeof firstArg === 'string' && SUPPRESSED_TEST_WARNINGS.some(pattern => pattern.test(firstArg))) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  const firstArg = args[0];
  if (typeof firstArg === 'string' && SUPPRESSED_TEST_LOGS.some(pattern => pattern.test(firstArg))) {
    return;
  }
  originalConsoleWarn(...args);
};

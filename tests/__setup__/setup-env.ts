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

import '@testing-library/jest-dom';
import { server } from './server';

require('jest-localstorage-mock');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
import '@testing-library/jest-dom';
import {server} from './server';
import {TextEncoder} from 'util';

Object.assign(global, {TextEncoder});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

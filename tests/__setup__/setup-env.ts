import '@testing-library/jest-dom';
import { server } from './server';
import { TextEncoder} from 'util';

global.TextEncoder = TextEncoder;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
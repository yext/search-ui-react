import '@testing-library/jest-dom';
import { server } from './server';
import { TextEncoder} from 'util';

//due to react-dom not having TextEncoder, we need to mock it
//before importing testSSR
global.TextEncoder = TextEncoder;


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
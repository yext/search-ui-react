import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { server } from './server';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
import { setupServer } from 'msw/node';

import { handlers } from './handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

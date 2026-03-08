import type { NextRequest } from 'next/server';
import type {
  GetCurrentUserResponse,
  HealthCheckResponse,
} from '@generated/api';

type MainApiMockId = 'healthCheck' | 'getCurrentUser';

type MainApiMockContext = {
  req: NextRequest;
  url: URL;
  path: string;
};

type MainApiMockDefinition = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: RegExp;
  handle: (context: MainApiMockContext) => Response | Promise<Response>;
};

// Add mock IDs here to enable them. Mocks present in the registry stay inactive
// until their IDs are listed in this array.
const enabledMainApiMockIds: MainApiMockId[] = [];

function normalizeMainApiPath(path: string) {
  if (path === '' || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function createJsonResponse<T>(body: T, status: number) {
  return Response.json(body, { status });
}

const mainApiMocks: Record<MainApiMockId, MainApiMockDefinition> = {
  healthCheck: {
    method: 'GET',
    path: /^\/$/,
    handle: () =>
      createJsonResponse<HealthCheckResponse>(
        {
          status: 'ok',
          message: 'Mocked API is healthy',
        },
        200
      ),
  },
  getCurrentUser: {
    method: 'GET',
    path: /^\/users\/me$/,
    handle: () =>
      createJsonResponse<GetCurrentUserResponse>(
        {
          id: 1,
          username: 'mock-user',
          message: 'Mocked current user',
        },
        200
      ),
  },
};

export async function resolveMainApiMock(
  req: NextRequest
): Promise<Response | null> {
  const url = new URL(req.url);
  const path = normalizeMainApiPath(
    url.pathname.replace('/api/proxy/main-api', '')
  );

  for (const mockId of enabledMainApiMockIds) {
    const mock = mainApiMocks[mockId];

    if (mock.method !== req.method || !mock.path.test(path)) {
      continue;
    }

    return mock.handle({
      req,
      url,
      path,
    });
  }

  return null;
}

export { enabledMainApiMockIds };

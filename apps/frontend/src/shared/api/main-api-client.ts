import { client } from '@generated/api/client.gen';

const API_PROXY_BASE_URL = '/api/proxy/main-api';

client.setConfig({
  baseUrl: API_PROXY_BASE_URL,
});

export { client as mainApiClient };

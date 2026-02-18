export default {
  input: '../../openapi/spec.yaml',
  output: {
    path: './generated/api',
  },
  plugins: [
    {
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      responseStyle: 'data',
      operations: {
        strategy: 'flat',
        nesting: 'operationId',
        methodName: {
          name: '{{name}}GenReq',
          case: 'camelCase',
        },
      },
    },
    {
      name: '@hey-api/client-fetch',
    },
  ],
};

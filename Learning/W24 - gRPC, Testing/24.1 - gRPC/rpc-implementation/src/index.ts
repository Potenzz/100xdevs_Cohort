import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// JSON-RPC 2.0 Interfaces
interface JsonRpcRequest {
  jsonrpc: '2.0';
  method: string;
  params?: any;
  id: number | string | null;
}

interface JsonRpcSuccessResponse {
  jsonrpc: '2.0';
  result: any;
  id: number | string | null;
}

interface JsonRpcError {
  code: number;
  message: string;
}

interface JsonRpcErrorResponse {
  jsonrpc: '2.0';
  error: JsonRpcError;
  id: number | string | null;
}

const app = express();
app.use(bodyParser.json());

// Example method implementations
const methods: Record<string, (params: any) => any> = {
  add: ({ a, b }: { a: number; b: number }) => a + b,
  subtract: ({ a, b }: { a: number; b: number }) => a - b,
};

app.post('/rpc', (req: Request, res: any) => {
  const body: JsonRpcRequest = req.body;

  if (body.jsonrpc !== '2.0' || typeof body.method !== 'string' || !('id' in body)) {
    const errorResponse: JsonRpcErrorResponse = {
      jsonrpc: '2.0',
      error: { code: -32600, message: 'Invalid Request' },
      id: null,
    };
    return res.json(errorResponse);
  }

  const handler = methods[body.method];

  if (!handler) {
    const errorResponse: JsonRpcErrorResponse = {
      jsonrpc: '2.0',
      error: { code: -32601, message: 'Method not found' },
      id: body.id,
    };
    return res.json(errorResponse);
  }

  try {
    const result = handler(body.params);
    const successResponse: JsonRpcSuccessResponse = {
      jsonrpc: '2.0',
      result,
      id: body.id,
    };
    return res.json(successResponse);
  } catch (err: any) {
    const errorResponse: JsonRpcErrorResponse = {
      jsonrpc: '2.0',
      error: { code: -32603, message: err.message || 'Internal error' },
      id: body.id,
    };
    return res.json(errorResponse);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 JSON-RPC server running on http://localhost:${PORT}/rpc`);
});

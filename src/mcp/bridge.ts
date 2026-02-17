import { WebSocketServer, WebSocket } from 'ws';

import type { WsMessage, WsResponse } from '../core/types.js';

type CommandHandler = (msg: WsMessage) => Promise<unknown>;

let wss: WebSocketServer | null = null;
let browserClient: WebSocket | null = null;
let pendingRequests = new Map<string, {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
}>();
let requestCounter = 0;

export function startBridge(port: number): WebSocketServer {
  wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    browserClient = ws;

    ws.on('message', (data) => {
      try {
        const msg: WsResponse = JSON.parse(data.toString());
        if (msg.type === 'response' && msg.id) {
          const pending = pendingRequests.get(msg.id);
          if (pending) {
            pendingRequests.delete(msg.id);
            if (msg.error) {
              pending.reject(new Error(msg.error));
            } else {
              pending.resolve(msg.result);
            }
          }
        }
      } catch {
        // malformed message
      }
    });

    ws.on('close', () => {
      if (browserClient === ws) browserClient = null;
      // reject all pending
      for (const [id, pending] of pendingRequests) {
        pending.reject(new Error('browser disconnected'));
        pendingRequests.delete(id);
      }
    });
  });

  return wss;
}

export function isBrowserConnected(): boolean {
  return browserClient !== null && browserClient.readyState === WebSocket.OPEN;
}

export async function sendToBrowser(type: string, payload?: unknown): Promise<unknown> {
  if (!browserClient || browserClient.readyState !== WebSocket.OPEN) {
    throw new Error('no browser connected');
  }

  const id = `mcp-${++requestCounter}`;
  const msg: WsMessage = { type, id, payload };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error('browser request timed out'));
    }, 10000);

    pendingRequests.set(id, {
      resolve: (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      reject: (reason) => {
        clearTimeout(timeout);
        reject(reason);
      },
    });

    browserClient!.send(JSON.stringify(msg));
  });
}

export function stopBridge(): void {
  if (wss) {
    wss.close();
    wss = null;
  }
  browserClient = null;
  pendingRequests.clear();
}

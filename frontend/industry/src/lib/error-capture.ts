let lastError: unknown;
export function captureError(error: unknown) { lastError = error; }
export function consumeLastCapturedError() { const e = lastError; lastError = undefined; return e instanceof Error ? e : undefined; }

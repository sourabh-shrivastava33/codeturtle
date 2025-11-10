// utils/errors.ts
export function throwNewError(err: unknown, contextMessage?: string): never {
  let message = "Unknown error occurred";
  let stack: string | undefined;

  if (err instanceof Error) {
    message = err.message;
    stack = err.stack;
  } else if (typeof err === "string") {
    message = err;
  } else if (err && typeof err === "object") {
    message = JSON.stringify(err);
  }

  if (contextMessage) {
    message = `${contextMessage}: ${message}`;
  }

  // optional: log to console in development
  if (process.env.NODE_ENV !== "production") {
    console.error("[ServerActionError]", message);
    if (stack) console.error(stack);
  }

  const error = new Error(message);
  if (stack) error.stack = stack;

  throw error;
}

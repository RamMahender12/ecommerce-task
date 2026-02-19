/** Simulated network delay (ms) */
const MOCK_DELAY_MS = 600;

/** Chance (0–1) to simulate a network error */
const ERROR_RATE = 0.05;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wraps a service call with artificial delay and optional random error.
 * Use for all "async" data fetching in the app.
 */
export async function withMockNetwork<T>(fn: () => T | Promise<T>): Promise<T> {
  await delay(MOCK_DELAY_MS);
  if (Math.random() < ERROR_RATE) {
    throw new Error('Network error (simulated)');
  }
  return fn();
}

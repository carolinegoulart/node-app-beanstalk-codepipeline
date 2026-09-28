const DEFAULT_SERVICE = "codepipeline-test-app";

/**
 * @param {{ uptimeSeconds: number; serviceName?: string }} options
 * @returns {{ status: 'ok'; uptimeSeconds: number; service: string }}
 */
export function buildHealthPayload({ uptimeSeconds, serviceName = DEFAULT_SERVICE }) {
  if (!Number.isFinite(uptimeSeconds) || uptimeSeconds < 0) {
    throw new Error("uptimeSeconds must be a non-negative number");
  }

  return {
    status: "ok",
    uptimeSeconds: Math.floor(uptimeSeconds),
    service: serviceName,
  };
}

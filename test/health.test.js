import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildHealthPayload } from "../src/health.js";

describe("buildHealthPayload", () => {
  it("returns ok status with floored uptime", () => {
    const payload = buildHealthPayload({ uptimeSeconds: 12.7 });

    assert.deepEqual(payload, {
      status: "ok",
      uptimeSeconds: 12,
      service: "codepipeline-test-app",
    });
  });
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildGreeting } from "../src/greeting.js";

describe("buildGreeting", () => {
  it("uses World when no name is given", () => {
    assert.equal(buildGreeting(), "Hello, World!");
  });

  it("trims and personalizes the greeting", () => {
    assert.equal(buildGreeting("  CodePipeline  "), "Hello, CodePipeline!");
  });
});

"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { quantile } = require("../src/stats");

describe("stats.quantile", () => {
  it("mediana com interpolação", () => {
    assert.equal(quantile([1, 2, 3, 4], 0.5), 2.5);
  });

  it("bordas q=0 e q=1", () => {
    assert.equal(quantile([10, 20, 30], 0), 10);
    assert.equal(quantile([10, 20, 30], 1), 30);
  });

  it("lista vazia => 0", () => {
    assert.equal(quantile([], 0.5), 0);
  });
});

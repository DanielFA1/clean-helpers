"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { isFresh } = require("../src/cache");

describe("cache.isFresh", () => {
  it("true dentro do ttl", () => {
    const now = Date.now();
    assert.equal(isFresh({ ts: now - 500 }, 1000, now), true);
  });

  it("false fora do ttl", () => {
    const now = Date.now();
    assert.equal(isFresh({ ts: now - 1500 }, 1000, now), false);
  });

  it("aceita timestamp number direto", () => {
    const now = Date.now();
    assert.equal(isFresh(now - 100, 1000, now), true);
  });
});

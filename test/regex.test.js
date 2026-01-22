"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const rx = require("../src/regex");

describe("regex.escapeRegex", () => {
  it("escapa caracteres especiais", () => {
    const s = rx.escapeRegex("a.b?c+d");
    assert.equal(s, "a\\.b\\?c\\+d");
  });
});

describe("regex.safeRegex", () => {
  it("cria regex segura e case-insensitive por padrão", () => {
    const r = rx.safeRegex("Coca-Cola");
    assert.equal(r.test("coca-cola"), true);
  });

  it("string vazia => não match por padrão", () => {
    const r = rx.safeRegex("");
    assert.equal(r.test("qualquer"), false);
  });
});

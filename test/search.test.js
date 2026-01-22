"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const search = require("../src/search");

describe("search.normalizeSearchText", () => {
  it("remove acentos/pontuação e colapsa espaços", () => {
    const s = search.normalizeSearchText("Coca-Cola! 2L  Retornável");
    assert.equal(s, "coca cola 2l retornavel");
  });
});

describe("search.makeSearchTokens", () => {
  it("remove stopwords e gera tokens únicos", () => {
    const t = search.makeSearchTokens("Pão de Trigo");
    assert.ok(Array.isArray(t));
    assert.ok(t.includes("pao"));
    assert.ok(t.includes("trigo"));
    // "de" deve cair por stopword
    assert.ok(!t.includes("de"));
  });

  it("une número + unidade", () => {
    const t = search.makeSearchTokens("Coca Cola 2 l retornável");
    assert.ok(t.includes("2l"));
  });
});

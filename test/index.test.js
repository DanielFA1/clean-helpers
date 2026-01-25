"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const h = require("../src"); // src/index.js

describe("index exports", () => {
  it("exporta namespaces principais", () => {
    assert.ok(h.money && typeof h.money === "object");
    assert.ok(h.string && typeof h.string === "object");
    assert.ok(h.number && typeof h.number === "object");
    assert.ok(h.date && typeof h.date === "object");
    assert.ok(h.async && typeof h.async === "object");
    assert.ok(h.validation && typeof h.validation === "object");
  });

  it("exporta helpers flat essenciais", () => {
    assert.equal(typeof h.parseMoney, "function");
    assert.equal(typeof h.formatBRL, "function");
    assert.equal(typeof h.parseMoneyStrict, "function");
    assert.equal(typeof h.moneyToCents, "function");
    assert.equal(typeof h.centsToMoney, "function");
    assert.equal(typeof h.formatBRLPlain, "function");

    assert.equal(typeof h.cleanDigits, "function");
    assert.equal(typeof h.titleCasePTBR, "function");

    assert.equal(typeof h.toNumberSafe, "function");
    assert.equal(typeof h.clamp, "function");

    assert.equal(typeof h.parseDateBR, "function");
    assert.equal(typeof h.formatBRDatetime, "function");

    assert.equal(typeof h.sleep, "function");
    assert.equal(typeof h.retry, "function");

    assert.equal(typeof h.isCPF, "function");
    assert.equal(typeof h.isCNPJ, "function");
    assert.equal(typeof h.isNCM, "function");
    assert.equal(typeof h.isCEST, "function");
  });

  it("funciona um smoke-test rápido", () => {
    // money
    const m = h.parseMoneyStrict("1.234,56");
    assert.equal(m.ok, true);
    assert.equal(m.cents, 123456);
    assert.equal(h.formatBRLPlain(1234.56), "1.234,56");

    // string/search
    const norm = h.normalizeSearchText("Coca-Cola 2L Retornável");
    assert.equal(norm, "coca cola 2l retornavel");
    const toks = h.makeSearchTokens("Coca Cola 2 l retornável");
    assert.ok(toks.includes("2l"));

    // validation
    assert.equal(h.isCEP("01001-000"), true);


    // stats
    assert.equal(h.quantile([1, 2, 3, 4], 0.5), 2.5);
  });
});

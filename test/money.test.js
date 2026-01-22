"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const money = require("../src/money");

describe("money.parseMoneyStrict", () => {
  it("parse pt-BR e en-US", () => {
    const a = money.parseMoneyStrict("R$ 1.234,56");
    assert.equal(a.ok, true);
    assert.equal(a.cents, 123456);
    assert.equal(a.value, 1234.56);

    const b = money.parseMoneyStrict("1234.56");
    assert.equal(b.ok, true);
    assert.equal(b.cents, 123456);
  });

  it("negativos: sinal e parênteses", () => {
    const a = money.parseMoneyStrict("-1.234,56");
    assert.equal(a.ok, true);
    assert.equal(a.cents, -123456);

    const b = money.parseMoneyStrict("(1.234,56)");
    assert.equal(b.ok, true);
    assert.equal(b.cents, -123456);
  });

  it("bloqueia negativo quando allowNegative=false", () => {
    const r = money.parseMoneyStrict("-10,00", { allowNegative: false });
    assert.equal(r.ok, false);
    assert.equal(r.reason, "negative_not_allowed");
  });

  it("estrito: rejeita mais casas que o permitido", () => {
    const r = money.parseMoneyStrict("1,234", { decimals: 2 });
    assert.equal(r.ok, false);
    assert.equal(r.reason, "too_many_decimals");
  });
});

describe("money.moneyToCents / centsToMoney", () => {
  it("converte ida e volta", () => {
    const cents = money.moneyToCents("1.234,56");
    assert.equal(cents, 123456);

    const v = money.centsToMoney(cents);
    assert.equal(v, 1234.56);
  });

  it("fallback=null retorna null quando inválido", () => {
    const cents = money.moneyToCents("nada", { fallback: null });
    assert.equal(cents, null);
  });
});

describe("money.formatBRLPlain", () => {
  it("formata decimal pt-BR sem símbolo", () => {
    const s = money.formatBRLPlain(1234.56);
    // costuma ser "1.234,56" em pt-BR
    assert.ok(s.includes(","));
    assert.ok(s.replace(/\D/g, "").length >= 4);
  });
});

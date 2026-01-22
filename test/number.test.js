"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const num = require("../src/number");

describe("number.toNumberSafe", () => {
  it("converte e aplica fallback", () => {
    assert.equal(num.toNumberSafe("10"), 10);
    assert.equal(num.toNumberSafe("abc", 7), 7);
    assert.equal(num.toNumberSafe(undefined), 0);
  });
});

describe("number.clamp", () => {
  it("limita dentro de min/max", () => {
    assert.equal(num.clamp(5, 0, 10), 5);
    assert.equal(num.clamp(-1, 0, 10), 0);
    assert.equal(num.clamp(999, 0, 10), 10);
  });

  it("funciona mesmo com min/max invertidos", () => {
    assert.equal(num.clamp(5, 10, 0), 5);
    assert.equal(num.clamp(-1, 10, 0), 0);
    assert.equal(num.clamp(999, 10, 0), 10);
  });
});

describe("number.roundTo", () => {
  it("arredonda com decimais", () => {
    assert.equal(num.roundTo(1.2345, 2), 1.23);
    assert.equal(num.roundTo(1.2355, 2), 1.24);
  });

  it("arredonda para inteiro por padrão", () => {
    assert.equal(num.roundTo(1.5), 2);
  });
});

describe("number.pct", () => {
  it("calcula percentual", () => {
    assert.equal(num.pct(1, 2), 50);
    assert.equal(num.pct(1, 3, 2), 33.33);
  });

  it("total=0 retorna fallback", () => {
    assert.equal(num.pct(10, 0), 0);
    assert.equal(num.pct(10, 0, 2, 99), 99);
  });
});

describe("number.sum", () => {
  it("soma lista simples", () => {
    assert.equal(num.sum([1, 2, 3]), 6);
  });

  it("soma com mapper", () => {
    assert.equal(num.sum([{ a: 2 }, { a: 5 }], (x) => x.a), 7);
  });

  it("ignora inválidos via fallback 0", () => {
    assert.equal(num.sum([1, "x", 2]), 3);
  });
});

describe("number.avg", () => {
  it("média simples", () => {
    assert.equal(num.avg([2, 4, 6]), 4);
  });

  it("lista vazia retorna 0", () => {
    assert.equal(num.avg([]), 0);
  });
});

describe("number.range", () => {
  it("range crescente inclusivo", () => {
    assert.deepEqual(num.range(1, 5), [1, 2, 3, 4, 5]);
  });

  it("range decrescente com step negativo", () => {
    assert.deepEqual(num.range(5, 1, -2), [5, 3, 1]);
  });

  it("corrige step quando direção está errada", () => {
    assert.deepEqual(num.range(5, 1, 2), [5, 3, 1]);
    assert.deepEqual(num.range(1, 5, -2), [1, 3, 5]);
  });

  it("start==end", () => {
    assert.deepEqual(num.range(3, 3), [3]);
  });
});

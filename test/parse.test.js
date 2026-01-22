"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const parse = require("../src/parse");

describe("parse.flagEnabled", () => {
  it("interpreta valores comuns", () => {
    assert.equal(parse.flagEnabled("sim"), true);
    assert.equal(parse.flagEnabled("true"), true);
    assert.equal(parse.flagEnabled("1"), true);

    assert.equal(parse.flagEnabled("não"), false);
    assert.equal(parse.flagEnabled("0"), false);
    assert.equal(parse.flagEnabled("false"), false);
  });

  it("fallback", () => {
    assert.equal(parse.flagEnabled("talvez", true), true);
    assert.equal(parse.flagEnabled("talvez", false), false);
  });
});

describe("parse.parseWeekdays", () => {
  it("parse nomes e números", () => {
    assert.deepEqual(parse.parseWeekdays("seg, qua, 6"), [1, 3, 6]);
  });

  it("remove duplicados e ordena", () => {
    assert.deepEqual(parse.parseWeekdays(["seg", "seg", "dom"]), [0, 1]);
  });
});

describe("parse.parseBlackouts", () => {
  it("parse dia único", () => {
    const r = parse.parseBlackouts("2026-01-21");
    assert.equal(r.length, 1);
    assert.ok(r[0].startMs <= r[0].endMs);
  });

  it("parse range e merge overlaps", () => {
    const r = parse.parseBlackouts("2026-01-01..2026-01-03,2026-01-03");
    assert.equal(r.length, 1);
    assert.ok(r[0].startMs < r[0].endMs);
  });
});

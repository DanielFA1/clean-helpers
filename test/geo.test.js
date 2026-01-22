"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { distanceInMeters } = require("../src/geo");

describe("geo.distanceInMeters", () => {
  it("distância aproximada de 1 grau de longitude no equador ~111km", () => {
    const d = distanceInMeters(0, 0, 0, 1);
    assert.ok(d > 110000 && d < 112500);
  });

  it("inválido retorna 0", () => {
    assert.equal(distanceInMeters("x", 0, 0, 1), 0);
  });
});

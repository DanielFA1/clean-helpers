"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { normId } = require("../src/id");

describe("id.normId", () => {
  it("string simples", () => {
    assert.equal(normId(" abc "), "abc");
  });

  it("objeto com _id", () => {
    assert.equal(normId({ _id: " 123 " }), "123");
  });

  it("objeto com $oid", () => {
    assert.equal(normId({ $oid: "507f1f77bcf86cd799439011" }), "507f1f77bcf86cd799439011");
  });

  it("Buffer vira hex", () => {
    const b = Buffer.from([1, 2, 255]);
    assert.equal(normId(b), "0102ff");
  });

  it("Uint8Array vira hex", () => {
    const u = new Uint8Array([10, 11, 12]);
    assert.equal(normId(u), "0a0b0c");
  });
});

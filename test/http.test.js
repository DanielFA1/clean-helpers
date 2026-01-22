"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { wantsJson } = require("../src/http");

describe("http.wantsJson", () => {
  it("path /api => json", () => {
    assert.equal(wantsJson({ path: "/api/test", headers: {} }), true);
  });

  it("Accept application/json => json", () => {
    assert.equal(wantsJson({ path: "/x", headers: { accept: "application/json" } }), true);
  });

  it("Accept text/html => não json", () => {
    assert.equal(wantsJson({ path: "/x", headers: { accept: "text/html" } }), false);
  });

  it("xhr => json", () => {
    assert.equal(
      wantsJson({ path: "/x", headers: { "x-requested-with": "XMLHttpRequest" } }),
      true
    );
  });
});

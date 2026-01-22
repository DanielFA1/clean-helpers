// test/00_trackHandles.test.js
"use strict";

const { after } = require("node:test");
const assert = require("node:assert/strict");

// --- rastreia setInterval / clearInterval ---
const _setInterval = global.setInterval;
const _clearInterval = global.clearInterval;

const intervals = new Map(); // handle -> stack

global.setInterval = function (fn, ms, ...args) {
  const err = new Error("setInterval criado aqui");
  const h = _setInterval(fn, ms, ...args);
  intervals.set(h, err.stack);
  return h;
};

global.clearInterval = function (h) {
  intervals.delete(h);
  return _clearInterval(h);
};

// --- rastreia fs.watch (muito comum em “helpers” que tentam hot-reload de dicionário etc) ---
const fs = require("node:fs");
const _watch = fs.watch;

const watches = new Map(); // watcher -> stack
fs.watch = function (...args) {
  const err = new Error("fs.watch criado aqui");
  const w = _watch.apply(fs, args);
  watches.set(w, err.stack);

  // tenta remover do mapa quando fechar
  const _close = w.close?.bind(w);
  if (_close) {
    w.close = () => {
      watches.delete(w);
      return _close();
    };
  }
  return w;
};

after(() => {
  // filtra pra reduzir ruído: mostra só stacks que envolvem /src/string ou /src/validation
  const onlyInteresting = (stack = "") =>
    stack.includes("\\src\\string") || stack.includes("/src/string") ||
    stack.includes("\\src\\validation") || stack.includes("/src/validation");

  const liveIntervals = [...intervals.values()].filter(onlyInteresting);
  const liveWatches = [...watches.values()].filter(onlyInteresting);

  if (liveIntervals.length || liveWatches.length) {
    console.log("\n=== HANDLES VIVOS (provável causa do travamento) ===");
    if (liveIntervals.length) {
      console.log("\n[setInterval] ainda vivos:", liveIntervals.length);
      console.log(liveIntervals.join("\n---\n"));
    }
    if (liveWatches.length) {
      console.log("\n[fs.watch] ainda vivos:", liveWatches.length);
      console.log(liveWatches.join("\n---\n"));
    }
  }

  assert.equal(liveIntervals.length, 0, "Existe setInterval aberto em src/string ou src/validation.");
  assert.equal(liveWatches.length, 0, "Existe fs.watch aberto em src/string ou src/validation.");
});

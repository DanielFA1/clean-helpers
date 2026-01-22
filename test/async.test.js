"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const asyncH = require("../src/async");

describe("async.sleep", () => {
  it("resolve após um tempo", async () => {
    const t0 = Date.now();
    await asyncH.sleep(20);
    const dt = Date.now() - t0;
    assert.ok(dt >= 15); // tolerância
  });
});

describe("async.withTimeout", () => {
  it("resolve quando termina antes do timeout", async () => {
    const res = await asyncH.withTimeout(async () => {
      await asyncH.sleep(10);
      return 123;
    }, 200);
    assert.equal(res, 123);
  });

  it("rejeita quando estoura", async () => {
    await assert.rejects(
      () => asyncH.withTimeout(asyncH.sleep(60), 10),
      (e) => e && e.name === "TimeoutError"
    );
  });
});

describe("async.retry", () => {
  it("tenta novamente até dar certo", async () => {
    let calls = 0;

    const res = await asyncH.retry(async () => {
      calls++;
      if (calls < 3) throw new Error("fail");
      return "ok";
    }, { retries: 5, minDelayMs: 1, maxDelayMs: 10, jitter: 0 });

    assert.equal(res, "ok");
    assert.equal(calls, 3);
  });

  it("para quando shouldRetry retornar false", async () => {
    let calls = 0;

    await assert.rejects(
      () =>
        asyncH.retry(async () => {
          calls++;
          throw new Error("stop");
        }, {
          retries: 10,
          minDelayMs: 1,
          maxDelayMs: 2,
          jitter: 0,
          shouldRetry: () => false,
        }),
      (e) => e && e.message === "stop"
    );

    assert.equal(calls, 1);
  });
});

describe("async.pLimit", () => {
  it("limita concorrência", async () => {
    const limit = asyncH.pLimit(2);

    let active = 0;
    let maxActive = 0;

    const jobs = Array.from({ length: 8 }, (_, i) =>
      limit(async () => {
        active++;
        maxActive = Math.max(maxActive, active);
        await asyncH.sleep(10);
        active--;
        return i;
      })
    );

    const res = await Promise.all(jobs);
    assert.equal(res.length, 8);
    assert.ok(maxActive <= 2);
  });
});

describe("async.pMap", () => {
  it("mapeia com concorrência", async () => {
    const res = await asyncH.pMap([1, 2, 3, 4], async (x) => {
      await asyncH.sleep(5);
      return x * 2;
    }, { concurrency: 2 });

    assert.deepEqual(res, [2, 4, 6, 8]);
  });
});

describe("async.createQueue", () => {
  it("processa e fica idle", async () => {
    const q = asyncH.createQueue({ concurrency: 2 });

    const out = [];
    q.add(async () => { await asyncH.sleep(10); out.push(1); });
    q.add(async () => { await asyncH.sleep(10); out.push(2); });
    q.add(async () => { await asyncH.sleep(10); out.push(3); });

    await q.onIdle();

    assert.equal(out.length, 3);
    assert.equal(q.size(), 0);
  });
});

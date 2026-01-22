"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const date = require("../src/date");

describe("date.parseDateBR / formatDateBR", () => {
    it("parse dd/mm/yyyy válido", () => {
        const d = date.parseDateBR("21/01/2026");
        assert.ok(d instanceof Date);
        assert.equal(date.formatDateBR(d), "21/01/2026");
    });

    it("parse inválido retorna null", () => {
        assert.equal(date.parseDateBR("32/01/2026"), null);
        assert.equal(date.parseDateBR("aa/bb/cccc"), null);
    });

    it("aceita yy (interpreta 2000+)", () => {
        const d = date.parseDateBR("01/02/26");
        assert.ok(d instanceof Date);
        assert.equal(date.formatDateBR(d), "01/02/2026");
    });
});

describe("date.toDateSafe", () => {
    it("converte ms e segundos", () => {
        const ms = Date.UTC(2026, 0, 21);
        const d1 = date.toDateSafe(ms);
        assert.ok(date.isValidDate(d1));

        const seconds = Math.floor(ms / 1000);
        const d2 = date.toDateSafe(seconds);
        assert.ok(date.isValidDate(d2));
    });

    it("tenta dd/mm/yyyy se string", () => {
        const d = date.toDateSafe("21/01/2026");
        assert.ok(date.isValidDate(d));
        assert.equal(date.formatDateBR(d), "21/01/2026");
    });

    it("fallback quando inválido", () => {
        const fb = new Date(0);
        const d = date.toDateSafe("nada", fb);
        assert.equal(d.getTime(), fb.getTime());
    });
});

describe("date.startOfDay / endOfDay", () => {
    it("zera horário", () => {
        const d = new Date(2026, 0, 21, 13, 5, 9, 500);
        const s = date.startOfDay(d);
        const e = date.endOfDay(d);

        assert.equal(s.getHours(), 0);
        assert.equal(s.getMinutes(), 0);
        assert.equal(s.getSeconds(), 0);
        assert.equal(s.getMilliseconds(), 0);

        assert.equal(e.getHours(), 23);
        assert.equal(e.getMinutes(), 59);
        assert.equal(e.getSeconds(), 59);
        assert.equal(e.getMilliseconds(), 999);
    });
});

describe("date.addDays / daysBetween", () => {
    it("addDays soma dias", () => {
        const d = new Date(2026, 0, 21);
        const d2 = date.addDays(d, 10);
        assert.equal(date.formatDateBR(d2), "31/01/2026");
    });

    it("daysBetween ignora horas", () => {
        const a = new Date(2026, 0, 1, 23, 59);
        const b = new Date(2026, 0, 2, 0, 1);
        assert.equal(date.daysBetween(a, b), 1);
    });
});

describe("date.inRange", () => {
    it("inclusive por padrão", () => {
        const d = new Date(2026, 0, 21);
        const a = new Date(2026, 0, 21);
        const b = new Date(2026, 0, 22);

        assert.equal(date.inRange(d, a, b), true);
        assert.equal(date.inRange(a, a, b), true);
        assert.equal(date.inRange(b, a, b), true);
    });

    it("exclusive quando inclusive=false", () => {
        const a = new Date(2026, 0, 21);
        const b = new Date(2026, 0, 22);

        assert.equal(date.inRange(a, a, b, { inclusive: false }), false);
        assert.equal(date.inRange(b, a, b, { inclusive: false }), false);

        const mid = new Date(2026, 0, 21, 12, 0);
        assert.equal(date.inRange(mid, a, b, { inclusive: false }), true);
    });

    describe("date.formatBRDatetime / parseBRDatetime", () => {
        it("formata dd/mm/yyyy HH:mm", () => {
            const d = new Date(2026, 0, 21, 14, 30, 5);
            assert.equal(date.formatBRDatetime(d), "21/01/2026 14:30");
        });

        it("formata com segundos quando pedido", () => {
            const d = new Date(2026, 0, 21, 14, 30, 5);
            assert.equal(date.formatBRDatetime(d, { withSeconds: true }), "21/01/2026 14:30:05");
        });

        it("parse dd/mm/yyyy HH:mm", () => {
            const d = date.parseBRDatetime("21/01/2026 14:30");
            assert.ok(d instanceof Date);
            assert.equal(date.formatBRDatetime(d), "21/01/2026 14:30");
        });

        it("parse dd/mm/yy HH:mm:ss", () => {
            const d = date.parseBRDatetime("01/02/26 03:04:05");
            assert.ok(d instanceof Date);
            assert.equal(date.formatBRDatetime(d, { withSeconds: true }), "01/02/2026 03:04:05");
        });

        it("parse inválido retorna null", () => {
            assert.equal(date.parseBRDatetime("32/01/2026 10:00"), null);
            assert.equal(date.parseBRDatetime("21/01/2026 99:00"), null);
        });
    });

    describe("date.formatTimeBR / parseTimeBR", () => {
        it("formata HH:mm", () => {
            const d = new Date(2026, 0, 21, 9, 7, 2);
            assert.equal(date.formatTimeBR(d), "09:07");
        });

        it("parse HH:mm e HH:mm:ss", () => {
            assert.deepEqual(date.parseTimeBR("09:07"), { hours: 9, minutes: 7, seconds: 0 });
            assert.deepEqual(date.parseTimeBR("09:07:02"), { hours: 9, minutes: 7, seconds: 2 });
        });

        it("parse inválido retorna null", () => {
            assert.equal(date.parseTimeBR("24:00"), null);
            assert.equal(date.parseTimeBR("aa:bb"), null);
        });
    });

    describe("date.ensureTimezoneOffset", () => {
        it("ajusta para offset fixo sem quebrar", () => {
            const d = new Date(2026, 0, 21, 0, 0, 0);
            const adjusted = date.ensureTimezoneOffset(d, -180);
            assert.ok(adjusted instanceof Date);
            assert.ok(Number.isFinite(adjusted.getTime()));
        });
    });

    describe("date.parseISODateOrBR", () => {
        it("parse ISO date", () => {
            const d = date.parseISODateOrBR("2026-01-21");
            assert.ok(d instanceof Date);
            assert.equal(d.getFullYear(), 2026);
            assert.equal(d.getMonth(), 0);
            assert.equal(d.getDate(), 21);
        });

        it("parse ISO datetime", () => {
            const d = date.parseISODateOrBR("2026-01-21T10:00:00Z");
            assert.ok(d instanceof Date);
        });

        it("parse BR date and datetime", () => {
            const d1 = date.parseISODateOrBR("21/01/2026");
            assert.ok(d1 instanceof Date);

            const d2 = date.parseISODateOrBR("21/01/2026 10:00");
            assert.ok(d2 instanceof Date);
            assert.equal(date.formatBRDatetime(d2), "21/01/2026 10:00");
        });

        it("inválido retorna null", () => {
            assert.equal(date.parseISODateOrBR("nada"), null);
        });
    });

    describe("date.diffHumanBR", () => {
        it("agora quando muito perto", () => {
            const base = new Date(2026, 0, 21, 10, 0, 0);
            const near = new Date(2026, 0, 21, 10, 0, 10);
            assert.equal(date.diffHumanBR(near, base), "agora");
        });

        it("passado e futuro", () => {
            const base = new Date(2026, 0, 21, 10, 0, 0);
            const past = new Date(2026, 0, 21, 9, 0, 0);
            const future = new Date(2026, 0, 21, 11, 0, 0);

            assert.ok(date.diffHumanBR(past, base).startsWith("há "));
            assert.ok(date.diffHumanBR(future, base).startsWith("em "));
        });
    });

    describe("date.monthKey", () => {
        it("gera YYYY-MM", () => {
            const d = new Date(2026, 0, 21);
            assert.equal(date.monthKey(d), "2026-01");
        });
    });

    describe("date.weekKeyISO", () => {
        it("gera YYYY-Www", () => {
            const d = new Date(2026, 0, 21);
            const key = date.weekKeyISO(d);
            assert.ok(/^2026-W\d{2}$/.test(key));
        });

        it("datas diferentes retornam chaves coerentes", () => {
            const a = date.weekKeyISO(new Date(2026, 0, 1));
            const b = date.weekKeyISO(new Date(2026, 0, 2));
            assert.ok(typeof a === "string" && a.length > 0);
            assert.ok(typeof b === "string" && b.length > 0);
        });
    });
});
